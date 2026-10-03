"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const houseRef = useRef<HTMLImageElement>(null);
  const cloudsRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial animation timeline when page loads
    const tl = gsap.timeline();
    
    tl.fromTo(logoRef.current, { y: 150, opacity: 0 }, { y: 0, opacity: 0.1, duration: 1.5, ease: "power3.out" })
      .fromTo(houseRef.current, { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=1")
      .fromTo(cloudsRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 0.9, duration: 1.5, ease: "power2.out" }, "-=1")
      .fromTo(textRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=1");

    // Scroll parallax setup
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Logo moves down heavily as we scroll down
      gsap.to(logoRef.current, {
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // House moves slightly down to create depth
      gsap.to(houseRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      
      // Clouds move at a different speed (faster upwards) to overlap the house
      gsap.to(cloudsRef.current, {
        yPercent: -15,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Text moves up slightly and fades
      gsap.to(textRef.current, {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] w-full overflow-hidden bg-sky-50 flex flex-col items-center justify-start pt-[15vh]">
      
      {/* 1. Background Logo (Huge and animating) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none opacity-20">
        <img 
          ref={logoRef}
          src="/images/logo.svg" 
          alt=""
          className="w-[180%] md:w-[120%] lg:w-[100%] max-w-none object-contain opacity-0 scale-125 md:scale-150 transform-gpu"
        />
      </div>

      {/* 2. Text Content (Foreground, but will be overlapped by house/clouds visually depending on z-index) */}
      <div ref={textRef} className="relative z-10 mx-auto max-w-5xl px-4 text-center opacity-0 mt-8 md:mt-16">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-sans font-extrabold text-neutral-950 tracking-tighter leading-[0.9]">
          Find What <br className="hidden md:block" /> Moves You
        </h1>
        <p className="text-lg md:text-2xl text-neutral-800 max-w-3xl mx-auto font-medium mt-6 md:mt-8 tracking-tight">
          Expert agents. Real guidance. A clear path to find what's next.
        </p>
        <Button size="lg" asChild className="mt-8 md:mt-10 rounded-full px-8 py-6 text-lg bg-neutral-950 text-white hover:bg-neutral-800 transition-colors">
          <Link href="#contact" className="flex items-center gap-2">
            Find Properties
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </Button>
      </div>

      {/* 3. The House Layer */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <img
          ref={houseRef}
          src="/images/house.jpg"
          alt="Modern house"
          className="w-[120%] md:w-[90%] lg:w-[75%] max-w-[1200px] h-auto object-contain object-bottom opacity-0 origin-bottom transform-gpu"
        />
      </div>

      {/* 4. The Clouds Layer */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none opacity-90 mix-blend-screen mix-blend-mode-lighten md:mix-blend-normal">
        <img
          ref={cloudsRef}
          src="/images/clouds.jpg"
          alt="Clouds overlay"
          className="w-full h-auto object-cover object-bottom min-w-[100vw] opacity-0 transform-gpu translate-y-4 md:translate-y-12"
        />
      </div>
      
      {/* 5. Gradient overlay at very bottom to blend smoothly into the next section */}
      <div className="absolute -bottom-1 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-40 pointer-events-none" />
    </section>
  );
}
