"use client";
import "./spaces.css";
import { services } from "@/data/services-data";
import { useRef, useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(ScrollTrigger);

const page = () => {
  const spacesRef = useRef(null);
  const scrollTriggerInstances = useRef([]);
  const { navigateWithTransition } = useViewTransition();

  const cleanupScrollTriggers = () => {
    scrollTriggerInstances.current.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances.current = [];
  };

  const setupAnimations = () => {
    cleanupScrollTriggers();

    if (!spacesRef.current) return;

    const spaces = spacesRef.current.querySelectorAll(".space");
    if (spaces.length === 0) return;

    spaces.forEach((space, index) => {
      gsap.set(space, {
        opacity: 0,
        scale: 0.75,
        y: 150,
      });

      if (index === 0) {
        gsap.to(space, {
          duration: 0.75,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          delay: 1.4,
        });
      } else {
        const trigger = ScrollTrigger.create({
          trigger: space,
          start: "top 100%",
          onEnter: () => {
            gsap.to(space, {
              duration: 0.75,
              y: 0,
              scale: 1,
              opacity: 1,
              ease: "power3.out",
            });
          },
        });

        scrollTriggerInstances.current.push(trigger);
      }
    });

    ScrollTrigger.refresh();
  };

  useEffect(() => {
    setupAnimations();

    const handleResize = () => {
      setupAnimations();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanupScrollTriggers();
    };
  }, []);

  return (
    <>
      <Nav />
      <div className="page spaces">
        <section className="spaces-header">
          <div className="container">
            <div className="prop-col"></div>
            <div className="prop-col">
              <Copy delay={1}>
                <h1>Our Services</h1>
              </Copy>
              <Copy delay={1.1}>
                <p className="lg">Comprehensive construction and remodeling services for your home</p>
              </Copy>
            </div>
          </div>
        </section>
        <section className="spaces-list">
          <div className="container" ref={spacesRef}>
            {services.map((service, index) => (
              <a
                key={service.id}
                href={`/services/${service.slug}`}
                className="space"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition(`/services/${service.slug}`);
                }}
              >
                <div className="space-img">
                  <img src={service.image} alt={service.name} />
                </div>
                <div className="space-info">
                  <div className="prop-info-col">
                    <div className="prop-info-sub-col">
                      <div className="prop-name">
                        <h3>{service.name}</h3>
                        <p className="lg">{service.tagline}</p>
                      </div>
                    </div>
                    <div className="prop-info-sub-col">
                      <div className="prop-client">
                        <p className="lg">{service.shortDescription}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
