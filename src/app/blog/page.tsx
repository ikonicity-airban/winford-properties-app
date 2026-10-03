import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getBlogPosts } from "@/lib/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Winford Properties",
  description: "Read the latest news and insights from Winford Properties.",
};

export default function BlogIndex() {
  const posts = getBlogPosts();

  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">Blog</h1>
            <p className="text-lg text-muted mt-4 max-w-2xl">
              Insights, tips, and news on real estate investing and home ownership in Nigeria.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {post.ogImage && (
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={post.ogImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted line-clamp-3 mb-6 flex-1">
                      {post.description || 'Read more about this topic on our blog.'}
                    </p>
                    <span className="text-primary font-medium mt-auto">Read full article &rarr;</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-muted bg-surface rounded-2xl border border-dashed border-border">
                No blog posts found.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
