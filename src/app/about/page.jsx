"use client";
import "./studio.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page studio">
        <section className="studio-hero">
          <div className="container">
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <h2>
                  BCP was established by Kabalane (Kaby) Jeneid with a goal to build a better life for his family by doing honest, high-quality work that people can rely on.
                </h2>
              </Copy>
              <div className="studio-hero-hero-img">
                <img src="/studio/about-hero.png" alt="Kaby Jeneid - BCP Owner" />
              </div>
            </div>
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <p>
                  Building quality homes isn't just our business—it's how we build a better life for our family and community. Every project reflects our commitment to honest work and lasting relationships.
                </p>
              </Copy>
            </div>
          </div>
        </section>
        <section className="more-facts">
          <div className="container">
            <div className="more-facts-items">
              <div className="fact">
                <Copy delay={0.1}>
                  <p>Years of Experience</p>
                  <h2>25+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.2}>
                  <p>Immigrated to US</p>
                  <h2>2001</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.3}>
                  <p>Family Members</p>
                  <h2>6</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.4}>
                  <p>Master's Degree</p>
                  <h2>Architecture</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.5}>
                  <p>Service Areas</p>
                  <h2>Greater Boston</h2>
                </Copy>
              </div>
            </div>
          </div>
        </section>
        <section className="how-we-work-container">
          <div className="container">
            <HowWeWork />
          </div>
        </section>
        <CTAWindow
          img="/studio/about-cta-window.jpg"
          header="Our Work"
          callout="Quality Craftsmanship in Every Project"
          description="Each project tells a story of dedication, expertise, and attention to detail. Explore how we transform houses into homes that families love for generations."
          href="/projects"
          ctaLabel="View Our Projects"
        />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
