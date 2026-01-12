"use client";
import "./projects.css";
import { projects } from "@/data/projects-data";
import { useRef, useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(ScrollTrigger);

const page = () => {
  const projectsRef = useRef(null);
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

    if (!projectsRef.current) return;

    const projectCards = projectsRef.current.querySelectorAll(".project-card");
    if (projectCards.length === 0) return;

    projectCards.forEach((card, index) => {
      gsap.set(card, {
        opacity: 0,
        scale: 0.75,
        y: 150,
      });

      if (index === 0) {
        gsap.to(card, {
          duration: 0.75,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          delay: 1.4,
        });
      } else {
        const trigger = ScrollTrigger.create({
          trigger: card,
          start: "top 100%",
          onEnter: () => {
            gsap.to(card, {
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
      <div className="page projects-page">
        <section className="projects-header">
          <div className="container">
            <div className="prop-col"></div>
            <div className="prop-col">
              <Copy delay={1}>
                <h1>Our Projects</h1>
              </Copy>
              <Copy delay={1.1}>
                <p className="lg">Explore our portfolio of completed renovations and construction projects</p>
              </Copy>
            </div>
          </div>
        </section>
        <section className="projects-list">
          <div className="container" ref={projectsRef}>
            {projects.map((project, index) => (
              <a
                key={project.id}
                href={`/projects/${project.slug}`}
                className="project-card"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition(`/projects/${project.slug}`);
                }}
              >
                <div className="project-card-img">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-card-info">
                  <div className="prop-info-col">
                    <div className="prop-info-sub-col">
                      <div className="prop-name">
                        <h3>{project.title}</h3>
                        <p className="lg">{project.location}</p>
                      </div>
                    </div>
                    <div className="prop-info-sub-col">
                      <div className="prop-client">
                        <p className="lg">{project.category}</p>
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
