import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, '..');
const contentDir = path.join(basePath, 'content');
const publicDir = path.join(basePath, 'public');
const imagesDir = path.join(publicDir, 'images');

// Ensure directories exist
[contentDir, publicDir, imagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const BASE_URL = 'https://winfordproperties.com';
const downloadedImages = new Set();
const notes = [];

async function fetchHtml(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } catch (err) {
    console.error(`Failed to fetch ${url}:`, err.message);
    notes.push(`Failed to fetch ${url}: ${err.message}`);
    return null;
  }
}

async function downloadImage(imgUrl) {
  if (!imgUrl) return null;
  if (imgUrl.startsWith('data:')) return null;

  try {
    let urlObj;
    try {
      urlObj = new URL(imgUrl);
    } catch {
      urlObj = new URL(imgUrl, BASE_URL);
    }
    
    // Use pathname to generate filename to avoid query strings
    const fileName = path.basename(urlObj.pathname);
    if (!fileName) return null;
    
    // Deduplicate
    if (downloadedImages.has(fileName)) return `/images/${fileName}`;
    downloadedImages.add(fileName);

    const imgPath = path.join(imagesDir, fileName);
    
    console.log(`Downloading image: ${urlObj.href} -> ${fileName}`);
    const res = await fetch(urlObj.href);
    if (!res.ok) throw new Error(`Failed to download image ${urlObj.href}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(imgPath, buffer);
    return `/images/${fileName}`;
  } catch (err) {
    console.error(`Image download error: ${err.message}`);
    notes.push(`Failed to download image ${imgUrl}: ${err.message}`);
    return null;
  }
}

async function scrapePage(url, slug) {
  console.log(`Scraping page: ${url}`);
  const html = await fetchHtml(url);
  if (!html) return;
  const $ = cheerio.load(html);
  
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  const ogImage = $('meta[property="og:image"]').attr('content') || '';
  
  if (ogImage) await downloadImage(ogImage);

  // Extract content
  // Remove scripts, styles
  $('script, style, noscript, iframe').remove();
  
  // Download all images in the page
  const imgElements = $('img').toArray();
  for (const img of imgElements) {
    const src = $(img).attr('src');
    if (src) await downloadImage(src);
  }
  
  // Create MDX frontmatter
  let mdx = `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
ogImage: ${JSON.stringify(ogImage)}
slug: ${JSON.stringify(slug)}
url: ${JSON.stringify(url)}
---\n\n`;

  // We want to extract text verbatim. We'll just grab text from major elements for now,
  // or store the HTML for manual conversion. 
  // Let's store raw readable text block by block.
  $('h1, h2, h3, h4, h5, h6, p, li').each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, ' ');
    if (text) {
      if (el.tagName.startsWith('h')) {
        const level = el.tagName[1];
        mdx += `${'#'.repeat(level)} ${text}\n\n`;
      } else if (el.tagName === 'li') {
        mdx += `- ${text}\n`;
      } else {
        mdx += `${text}\n\n`;
      }
    }
  });

  const fileName = slug === '/' ? 'home' : slug.replace(/\//g, '-').replace(/^-|-$/g, '');
  const filePath = path.join(contentDir, `${fileName || 'index'}.mdx`);
  fs.writeFileSync(filePath, mdx);
  console.log(`Saved ${filePath}`);
}

async function getSitemapUrls() {
  // Common WordPress sitemap paths
  const urls = [];
  try {
    const sitemapIndexHtml = await fetchHtml(`${BASE_URL}/wp-sitemap.xml`);
    if (sitemapIndexHtml) {
      // Just regex for <loc>
      const matches = [...sitemapIndexHtml.matchAll(/<loc>(.*?)<\/loc>/g)];
      for (const match of matches) {
        const sitemapUrl = match[1];
        if (sitemapUrl.endsWith('.xml')) {
          const subSitemapHtml = await fetchHtml(sitemapUrl);
          if (subSitemapHtml) {
             const subMatches = [...subSitemapHtml.matchAll(/<loc>(.*?)<\/loc>/g)];
             subMatches.forEach(m => urls.push(m[1]));
          }
        } else {
          urls.push(sitemapUrl);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  return [...new Set(urls)];
}

async function run() {
  const urls = await getSitemapUrls();
  console.log(`Found ${urls.length} URLs in sitemap`);
  
  // Always include home and known posts if missing
  const allUrls = new Set([
    BASE_URL + '/',
    BASE_URL + '/blog/',
    BASE_URL + '/five-tips-to-help-you-become-a-smart-real-estate-investor-in-nigeria/',
    BASE_URL + '/how-to-prepare-for-making-a-home-purchase-offer/',
    BASE_URL + '/how-to-save-up-for-your-home-purchase-in-nigeria/',
    BASE_URL + '/buying-a-home-deciding-on-whether-to-go-below-or-above-the-propertys-asking-price/',
    BASE_URL + '/3-steps-to-achieving-your-real-estate-goals-in-nigeria/',
    ...urls
  ]);

  for (const url of allUrls) {
    let slug = url.replace(BASE_URL, '');
    if (!slug) slug = '/';
    await scrapePage(url, slug);
  }

  // Save notes
  fs.writeFileSync(path.join(basePath, 'NOTES.md'), `# Scraping Notes\n\n${notes.join('\n')}\n`);
  console.log('Scraping complete.');
}

run();
