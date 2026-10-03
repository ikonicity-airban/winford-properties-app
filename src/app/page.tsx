import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Gallery } from "@/components/Gallery";
import { Button } from "@/components/ui/button";
import { getLatestPosts } from "@/lib/blog";
import { ShieldCheck, HeartHandshake, Phone, MapPin, Mail } from "lucide-react";
import { GsapParallax } from "@/components/effects/GsapParallax";
import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  const latestPosts = getLatestPosts(3);

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <GsapParallax />

        {/* HERO SECTION */}
        <HeroSection />

        {/* INTRO: Our Serviced Plots */}
        <section className="py-24 md:py-32 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <div data-parallax-img className="relative w-full h-[120%] -top-[10%]">
                  <Image
                    src="/images/IMG-20221125-WA0002.jpg"
                    alt="Serviced Plot"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Our Serviced Plots</h2>
                <p className="text-lg text-muted leading-relaxed">
                  We offer fully serviced plots of land in strategic and fast-developing locations.
                  Our plots come with essential infrastructure like road networks, drainage systems,
                  electricity, and security, ensuring you have the perfect foundation to build your dream home or next big investment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE PROPS */}
        <section className="py-20 bg-surface">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
              <div className="flex flex-col items-center text-center gap-4 p-8 bg-background rounded-2xl shadow-sm">
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
                  <HeartHandshake size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold">We care!</h3>
                <p className="text-muted leading-relaxed">
                  Your satisfaction is our priority. We take the time to understand your unique needs
                  and guide you through every step of your real estate journey with genuine care and dedication.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-4 p-8 bg-background rounded-2xl shadow-sm">
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold">We are reliable!</h3>
                <p className="text-muted leading-relaxed">
                  Trust is the foundation of our business. With years of experience and a proven track record,
                  we deliver on our promises, ensuring transparent and secure transactions every time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT US */}
        <section className="py-24 md:py-32 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="flex flex-col gap-6 order-2 lg:order-1">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                  About us / Dependable Housing Solution
                </h2>
                <h3 className="text-2xl font-medium text-primary">It's time for a revolution!</h3>
                <div className="prose prose-lg prose-neutral text-muted">
                  <p>
                    Winford Properties is a real estate development and management company dedicated to
                    transforming the housing landscape in Nigeria. We believe that everyone deserves a
                    safe, comfortable, and affordable place to call home.
                  </p>
                  <p>
                    Our mission is to provide dependable housing solutions through innovative design,
                    quality construction, and transparent dealings. We are not just building houses;
                    we are building communities and creating wealth for our clients.
                  </p>
                  <p>
                    With a team of experienced professionals, we are committed to excellence in every
                    project we undertake. From land acquisition to property development and facility
                    management, we ensure the highest standards are met.
                  </p>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
                <div data-parallax-img className="relative w-full h-[120%] -top-[10%]">
                  <Image
                    src="/images/5-bdrm-2a-scaled.jpg"
                    alt="5 Bedroom House"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="py-24 md:py-32 bg-surface">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">What we offer</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-background flex flex-col h-full">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                  <div data-parallax-img className="relative w-full h-[120%] -top-[10%]">
                    <Image
                      src="/images/IMG-20221125-WA0004.jpg"
                      alt="Serviced Plots"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display font-bold mb-4">Serviced Plots</h3>
                  <p className="text-muted leading-relaxed flex-1">
                    Secure your piece of the future with our strategically located serviced plots.
                    Perfect for residential or commercial development, these plots are free from government
                    acquisition and omo-onile issues, offering you peace of mind and excellent ROI.
                  </p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-background flex flex-col h-full">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                  <div data-parallax-img className="relative w-full h-[120%] -top-[10%]">
                    <Image
                      src="/images/5-bdrm-1-scaled.jpg"
                      alt="Built Homes"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display font-bold mb-4">Built Homes</h3>
                  <p className="text-muted leading-relaxed flex-1">
                    Experience luxury and comfort in our meticulously designed and expertly crafted homes.
                    From cozy apartments to spacious duplexes, our properties are built to the highest
                    standards, blending modern aesthetics with functional living spaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-24 md:py-32 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                The masterpieces we call houses
              </h2>
              <p className="text-lg text-muted">
                Take a visual tour of our completed projects and ongoing developments.
                Every image reflects our commitment to quality, elegance, and durability.
              </p>
            </div>
            <Gallery />
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="relative py-32 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div data-parallax-banner-bg className="relative w-full h-[130%] -top-[15%]">
              <Image
                src="/images/2-2-scaled.jpg"
                alt="Contact us background"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-neutral-900/80 mix-blend-multiply z-0" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center flex flex-col items-center gap-8">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-neutral-50 leading-tight">
              Call us for a meeting today and let's discuss your next big investment.
            </h2>
            <Button size="lg" variant="outline" asChild className="border-neutral-50 text-neutral-50 hover:bg-neutral-50 hover:text-foreground">
              <Link href="#contact">Contact Us Now</Link>
            </Button>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 md:py-32 bg-surface scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Get in touch</h2>
              <p className="text-lg text-muted mt-4">We'd love to hear from you. Send us a message.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
              <div className="lg:col-span-1 flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Our Office</h3>
                    <p className="text-muted">Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-muted">+234 800 000 0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-muted">info@winfordproperties.com</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-background rounded-2xl p-8 shadow-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* BLOG PREVIEW */}
        <section className="py-24 md:py-32 bg-background border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start mb-20 pb-16 border-b border-border">
              <h2 className="text-6xl md:text-8xl font-sans font-medium text-neutral-950 tracking-tighter leading-none">
                Blog <span className="text-neutral-400">&</span> <br /> Resources
              </h2>
              <div className="flex flex-col items-start gap-8">
                <p className="text-2xl md:text-3xl text-neutral-900 font-medium leading-tight">
                  Stay updated with the latest real estate trends, investment tips, and company news in Nigeria.
                </p>
                <Button variant="default" asChild className="rounded-full px-6 py-6 bg-neutral-950 text-white hover:bg-neutral-800">
                  <Link href="/blog" className="flex items-center gap-2">
                    Visit Our Blog
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex flex-col">
              {latestPosts.length > 0 ? (
                latestPosts.map((post) => (
                  <article key={post.slug} className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-border hover:bg-surface/50 transition-colors -mx-4 px-4 rounded-xl">
                    <div className="md:col-span-2 text-neutral-500 font-medium pt-2">
                      2026-10-02 {/* Placeholder date since we don't have frontmatter dates */}
                    </div>
                    <div className="md:col-span-10 flex flex-col items-start gap-4">
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-3xl md:text-5xl font-sans font-medium text-neutral-950 tracking-tight leading-tight group-hover:text-primary transition-colors max-w-4xl">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-neutral-600 text-lg max-w-3xl leading-relaxed mt-2">
                        {post.description || 'Read more about this topic on our blog.'}
                      </p>
                      <Button variant="outline" asChild className="mt-4 rounded-full px-6">
                        <Link href={`/blog/${post.slug}`} className="flex items-center gap-2">
                          Read More
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </Link>
                      </Button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="text-center py-24 text-muted bg-surface rounded-xl border border-dashed border-border">
                  No blog posts found. They will appear here once published.
                </div>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
