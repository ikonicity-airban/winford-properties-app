import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-200 pt-20 pb-6 overflow-hidden">
      <div className="mx-auto max-w-[90rem] px-6 md:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Left Column (Newsletter & Contact) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-sans font-medium text-white mb-8">Subscribe to our Newsletter!</h2>
              <form className="relative border-b border-neutral-700 pb-2 mb-16 flex items-center" action="#" method="POST">
                <input 
                  type="email" 
                  placeholder="Enter address" 
                  required 
                  className="bg-transparent border-none outline-none text-neutral-300 placeholder:text-neutral-500 w-full text-lg"
                />
                <button type="submit" className="text-white hover:text-neutral-300 transition-colors p-2" aria-label="Subscribe">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-neutral-500 text-sm font-medium mb-3">Head Office</h3>
                <address className="not-italic text-sm text-neutral-100 font-medium leading-relaxed">
                  123 Winford Street, Victoria Island,<br />
                  Lagos, Nigeria
                </address>
              </div>
              <div>
                <h3 className="text-neutral-500 text-sm font-medium mb-3">Email Us</h3>
                <a href="mailto:info@winfordproperties.com" className="text-sm text-neutral-100 font-medium hover:text-white transition-colors block">
                  info@winfordproperties.com
                </a>
              </div>
              <div>
                <h3 className="text-neutral-500 text-sm font-medium mb-3">Call Us</h3>
                <a href="tel:+2348000000000" className="text-sm text-neutral-100 font-medium hover:text-white transition-colors block">
                  +234 800 000 0000
                </a>
              </div>
            </div>
            
          </div>

          {/* Right Column (Links & Socials) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:justify-items-end">
            <ul className="flex flex-col gap-5">
              <li>
                <Link href="/" className="text-xl text-neutral-100 font-medium hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/blog" className="text-xl text-neutral-100 font-medium hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/#contact" className="text-xl text-neutral-100 font-medium hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="#" className="text-xl text-neutral-100 font-medium hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="#" className="text-xl text-neutral-100 font-medium hover:text-white transition-colors">Portal</Link>
              </li>
            </ul>
            <ul className="flex flex-col gap-5">
              <li>
                <a href="#" className="text-sm text-neutral-100 font-medium hover:text-white transition-colors">Facebook</a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-100 font-medium hover:text-white transition-colors">Instagram</a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-100 font-medium hover:text-white transition-colors">Youtube</a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-100 font-medium hover:text-white transition-colors">Linkedin</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Massive Logo Section */}
        <div className="w-full flex justify-between items-end border-b border-neutral-800 pb-2 mb-6">
          <h1 className="text-[12vw] leading-none font-sans font-black text-white tracking-tighter select-none" style={{ letterSpacing: "-0.08em" }}>
            WINFORD
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] text-neutral-500 font-medium">
          <div className="flex flex-wrap gap-4 md:gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Fair Housing</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Reasonable Accommodation</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Operating</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Press</a>
          </div>
          <div>
            &copy; {currentYear} Winford Properties.
          </div>
        </div>
      </div>
    </footer>
  );
}
