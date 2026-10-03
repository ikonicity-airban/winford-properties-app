"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const pathname = usePathname();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      // Always show navbar near top of the page
      if (currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        // Scrolling DOWN -> slide out of view
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // Scrolling UP -> slide back into view
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", dropdown: false },
    { href: "/blog", label: "Blog", dropdown: false },
    { href: "/#gallery", label: "Gallery", dropdown: false },
    { href: "/#services", label: "Services", dropdown: true },
    { href: "/#about", label: "About", dropdown: true },
  ];

  const activeIndex =
    pathname === "/"
      ? -1
      : navLinks.findIndex(
          (link) => link.href !== "/" && pathname.startsWith(link.href)
        );

  const displayedIndex =
    hoveredIndex !== null ? hoveredIndex : activeIndex !== -1 ? activeIndex : null;

  const showHeader = isVisible || isMobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-[90rem] px-6 md:px-8 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center z-50 relative">
          <Image
            src="/images/logo.svg"
            alt="Winford Properties Logo"
            width={150}
            height={44}
            className="object-contain h-20 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav — centered with Motion tracking pill */}
        <nav
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative hidden md:flex items-center gap-1 flex-1 justify-center"
        >
          {navLinks.map((link, index) => {
            const isCurrentPage =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href) && link.href !== "/#";

            const isTargeted = displayedIndex === index;

            return (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`relative z-10 inline-flex items-center gap-0.5 px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200 ${
                  isCurrentPage
                    ? "text-neutral-950 font-bold"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                {/* Motion tracking pill background */}
                <AnimatePresence>
                  {isTargeted && (
                    <motion.span
                      layoutId="navbar-tracking-pill"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-neutral-100 -z-10"
                    />
                  )}
                </AnimatePresence>

                <span>{link.label}</span>
                {link.dropdown && (
                  <ChevronDown size={14} className="text-neutral-500 mt-px" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex flex-shrink-0 items-center">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 relative p-2 rounded-md text-neutral-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Slide-in */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 w-full px-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-3xl font-sans font-medium text-neutral-950 hover:text-neutral-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="w-full h-px bg-neutral-100 my-2" />
          <Link
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-neutral-950 text-white text-base font-semibold hover:bg-neutral-800 transition-colors"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
