"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/images/5-bdrm-2a-scaled.jpg", alt: "5 Bedroom House exterior" },
  { src: "/images/5-bdrm-1-scaled.jpg", alt: "5 Bedroom House view 2" },
  { src: "/images/5-bdrm-3a-scaled.jpg", alt: "5 Bedroom House interior" },
  { src: "/images/2-2-scaled.jpg", alt: "House details" },
  { src: "/images/1-1-scaled.jpg", alt: "House interior details" },
  { src: "/images/IMG-20221129-WA0000.jpg", alt: "Property view" },
  { src: "/images/IMG-20221125-WA0007.jpg", alt: "Site view 1" },
  { src: "/images/IMG-20221125-WA0006.jpg", alt: "Site view 2" },
  { src: "/images/IMG-20221125-WA0004.jpg", alt: "Site view 3" },
];

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => openLightbox(index)}
            aria-label={`View full image of ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/10 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-neutral-950/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-6 right-6 text-neutral-50 hover:text-primary transition-colors z-50 p-2"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          
          <button
            className="absolute left-4 md:left-8 text-neutral-50 hover:text-primary transition-colors z-50 p-2"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={48} />
          </button>

          <div className="relative w-full max-w-5xl aspect-video md:aspect-auto md:h-[80vh]">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button
            className="absolute right-4 md:right-8 text-neutral-50 hover:text-primary transition-colors z-50 p-2"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight size={48} />
          </button>
          
          <div className="absolute bottom-6 left-0 right-0 text-center text-neutral-50 font-medium z-50">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
