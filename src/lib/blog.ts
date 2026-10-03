import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  ogImage: string;
  content: string;
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(contentDir)) return [];
  
  const files = fs.readdirSync(contentDir);
  const posts = files
    .filter(file => file.endsWith('.mdx') && file !== 'home.mdx')
    .map(file => {
      const fullPath = path.join(contentDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: data.slug?.replace(/^\//, '').replace(/\/$/, '') || file.replace(/\.mdx$/, ''),
        title: data.title || '',
        description: data.description || '',
        ogImage: data.ogImage || '',
        content,
      };
    });
    
  return posts;
}

export function getLatestPosts(count = 3): BlogPost[] {
  return getBlogPosts().slice(0, count);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug || post.slug === `${slug}/`);
}
