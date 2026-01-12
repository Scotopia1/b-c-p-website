"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./MasonryGallery.css";

gsap.registerPlugin(ScrollTrigger);

const MasonryGallery = ({ images }) => {
  const containerRef = useRef(null);
  const animationsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current || images.length === 0) return;

    const items = containerRef.current.querySelectorAll(".masonry-item");

    gsap.set(items, { opacity: 0, y: 50 });

    animationsRef.current = ScrollTrigger.batch(items, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
      },
      start: "top 90%",
    });

    return () => {
      if (animationsRef.current) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="masonry-grid" ref={containerRef}>
      {images.map((img, index) => (
        <div key={index} className="masonry-item">
          <img src={img} alt={`Project image ${index + 1}`} loading="lazy" />
        </div>
      ))}
    </div>
  );
};

export default MasonryGallery;
