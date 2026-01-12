"use client";
import "./CTAWindow.css";

import Copy from "../Copy/Copy";
import { useViewTransition } from "@/hooks/useViewTransition";

const CTAWindow = ({ img, header, callout, description, href = "/consultation", ctaLabel = "Click to Schedule" }) => {
  const { navigateWithTransition } = useViewTransition();

  const handleClick = (e) => {
    e.preventDefault();
    navigateWithTransition(href);
  };

  return (
    <section className="cta-window">
      <div className="container">
        <a
          href={href}
          onClick={handleClick}
          className="cta-window-clickable-area"
          aria-label={ctaLabel}
        >
          <div className="cta-window-img-wrapper">
            <img src={img} alt="" />
          </div>
          <div className="cta-window-img-overlay"></div>
          <div className="cta-window-hover-hint">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 16 16 12 12 8"></polyline>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <p>{ctaLabel}</p>
          </div>
        </a>
        <div className="cta-window-header">
          <Copy delay={0.1}>
            <h1>{header}</h1>
          </Copy>
        </div>
        <div className="cta-window-footer">
          <div className="cta-window-callout">
            <Copy delay={0.1}>
              <h3>{callout}</h3>
            </Copy>
          </div>
          <div className="cta-window-description">
            <Copy delay={0.1}>
              <p>{description}</p>
            </Copy>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAWindow;
