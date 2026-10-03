# Winford Properties Application

This repository contains the rebuilt web application for Winford Properties, built with Next.js (App Router), Tailwind CSS, and TypeScript.

## Environment Variables

Create a `.env.local` file in the root of the project with the following:

```env
# Required if you want the contact form to actually send emails via Resend
RESEND_API_KEY=your_resend_api_key_here
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push this repository to GitHub/GitLab.
2. Go to Vercel and import the project.
3. Ensure the Framework Preset is set to "Next.js".
4. Add the `RESEND_API_KEY` to the Environment Variables section if needed.
5. Deploy.

## Content Management

- Blog posts are managed via MDX files located in the `/content` directory.
- To add a new post, simply create a new `.mdx` file with the appropriate frontmatter.

## Project Structure

- `/content` - Markdown content files extracted from the old site.
- `/public/images` - All deduped images used across the site.
- `/src/app` - Next.js App Router structure, including API routes, sitemap, and robots.
- `/src/components` - Reusable UI and Layout components.
- `/src/lib` - Utility functions (e.g., parsing MDX).
