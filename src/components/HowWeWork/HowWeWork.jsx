"use client";
import "./HowWeWork.css";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Copy from "../Copy/Copy";

gsap.registerPlugin(ScrollTrigger);

const HowWeWork = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const stepsRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggersRef = useRef([]);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useGSAP(
    () => {
      if (!stepsRef.current) return;

      const steps = stepsRef.current.querySelectorAll(".how-we-work-step");
      gsap.set(steps, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: "top 75%",
        once: true,
        animation: gsap.to(steps, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: -0.1,
          ease: "none",
        }),
      });
    },
    { scope: stepsRef }
  );

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!container || !header || !cards) return;

    if (!isMobile) {
      const mainTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        endTrigger: cards,
        end: "bottom bottom",
        pin: header,
        pinSpacing: false,
      });
      scrollTriggersRef.current.push(mainTrigger);

      const cardElements = cards.querySelectorAll(".how-we-work-card");

      cardElements.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
          onLeave: () => {
            if (index < cardElements.length - 1) {
              setActiveStep(index + 1);
            }
          },
          onLeaveBack: () => {
            if (index > 0) {
              setActiveStep(index - 1);
            }
          },
        });
        scrollTriggersRef.current.push(cardTrigger);
      });
    }

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [isMobile]);

  return (
    <div className="how-we-work" ref={containerRef}>
      <div className="how-we-work-col how-we-work-header" ref={headerRef}>
        <div className="container">
          <div className="how-we-work-header-content">
            <div className="how-we-work-header-callout">
              <Copy delay={0.1}>
                <p>Our Core Values</p>
              </Copy>
            </div>
            <Copy delay={0.15}>
              <h3>
                From consultation to completion, our approach is built on transparency, quality craftsmanship, and treating every home as our own
              </h3>
            </Copy>
            <div className="how-we-work-steps" ref={stepsRef}>
              <div
                className={`how-we-work-step ${
                  activeStep === 0 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-label">Step</p>
                <p className="how-we-work-step-index">1</p>
              </div>
              <div
                className={`how-we-work-step ${
                  activeStep === 1 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-label">Step</p>
                <p className="how-we-work-step-index">2</p>
              </div>
              <div
                className={`how-we-work-step ${
                  activeStep === 2 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-label">Step</p>
                <p className="how-we-work-step-index">3</p>
              </div>
              <div
                className={`how-we-work-step ${
                  activeStep === 3 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-label">Step</p>
                <p className="how-we-work-step-index">4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="how-we-work-col how-we-work-cards" ref={cardsRef}>
        <div className="how-we-work-card">
          <div className="how-we-work-card-img">
            <img src="/how-we-work/process-1.jpg" alt="" />
          </div>
          <div className="how-we-work-card-copy">
            <div className="how-we-work-card-index-label">
              <h3>Clear Communication</h3>
            </div>
            <p className="md">
              We believe in honest, transparent communication from day one. Every project starts with listening to your vision and ends with regular updates so you're never left wondering about progress or costs.
            </p>
          </div>
        </div>
        <div className="how-we-work-card">
          <div className="how-we-work-card-img">
            <img src="/how-we-work/process-2.jpg" alt="" />
          </div>
          <div className="how-we-work-card-copy">
            <div className="how-we-work-card-index-label">
              <h3>Treat Every Home Like Our Own</h3>
            </div>
            <p className="md">
              Your home is your sanctuary. We approach every project with the same care and attention to detail we'd expect for our own family. Quality isn't negotiable—it's built into every decision we make.
            </p>
          </div>
        </div>
        <div className="how-we-work-card">
          <div className="how-we-work-card-img">
            <img src="/how-we-work/process-3.jpg" alt="" />
          </div>
          <div className="how-we-work-card-copy">
            <div className="how-we-work-card-index-label">
              <h3>Quality Work That Lasts</h3>
            </div>
            <p className="md">
              With 25+ years of experience and a Master's degree in Architecture, we don't just build—we craft spaces that stand the test of time. Every detail matters, from materials to craftsmanship.
            </p>
          </div>
        </div>
        <div className="how-we-work-card">
          <div className="how-we-work-card-img">
            <img src="/how-we-work/process-4.jpg" alt="" />
          </div>
          <div className="how-we-work-card-copy">
            <div className="how-we-work-card-index-label">
              <h3>Trust is Earned, Not Assumed</h3>
            </div>
            <p className="md">
              We know that inviting contractors into your home requires trust. We earn that trust through transparency, fair pricing, proper licensing, and delivering on our promises—every single time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
