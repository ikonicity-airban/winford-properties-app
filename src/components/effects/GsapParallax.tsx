"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GsapParallax() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero background parallax
      const heroBg = document.querySelector("[data-parallax-hero-bg]");
      if (heroBg) {
        gsap.fromTo(
          heroBg,
          { yPercent: 0, scale: 1 },
          {
            yPercent: 25,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: heroBg.closest("section"),
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // 2. Hero content fade & float parallax
      const heroContent = document.querySelector("[data-parallax-hero-content]");
      if (heroContent) {
        gsap.to(heroContent, {
          yPercent: -25,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: heroContent.closest("section"),
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 3. CTA Banner background parallax
      const bannerBg = document.querySelector("[data-parallax-banner-bg]");
      if (bannerBg) {
        gsap.fromTo(
          bannerBg,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: bannerBg.closest("section"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // 4. Parallax on featured card images
      const parallaxImages = document.querySelectorAll("[data-parallax-img]");
      parallaxImages.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest("div"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
