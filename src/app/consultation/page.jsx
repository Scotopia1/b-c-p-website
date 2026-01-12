"use client";
import "./consultation.css";
import { useRef } from "react";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";

export default function Consultation() {
  return (
    <>
      <Nav />
      <section className="consultation-hero">
        <div className="consultation-hero-bg">
          <div className="consultation-gradient"></div>
        </div>
        <div className="container">
          <div className="consultation-hero-content">
            <Copy animateOnScroll={false} delay={0.85}>
              <h1>Get Your Free Consultation</h1>
            </Copy>
            <Copy animateOnScroll={false} delay={1}>
              <p className="consultation-tagline">
                Start your construction or remodeling project with expert guidance. No obligation, just honest advice from 25+ years of experience.
              </p>
            </Copy>
          </div>
        </div>
      </section>

      <section className="consultation-benefits">
        <div className="container">
          <div className="consultation-benefits-header">
            <Copy delay={0.1}>
              <h2>What You'll Get</h2>
            </Copy>
          </div>
          <div className="consultation-benefits-grid">
            <div className="benefit-card">
              <Copy delay={0.15}>
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                </div>
                <h3>Project Assessment</h3>
                <p>We'll review your project goals, timeline, and budget to determine the best approach for your needs.</p>
              </Copy>
            </div>
            <div className="benefit-card">
              <Copy delay={0.2}>
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3>Expert Recommendations</h3>
                <p>Get professional advice on materials, design options, and construction methods based on 25+ years of experience.</p>
              </Copy>
            </div>
            <div className="benefit-card">
              <Copy delay={0.25}>
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                    <path d="M2 2l7.586 7.586"/>
                    <circle cx="11" cy="11" r="2"/>
                  </svg>
                </div>
                <h3>Preliminary Design Ideas</h3>
                <p>Discuss initial design concepts and layouts with our architect to visualize your project's potential.</p>
              </Copy>
            </div>
            <div className="benefit-card">
              <Copy delay={0.3}>
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                  </svg>
                </div>
                <h3>Budget Guidance</h3>
                <p>Receive honest pricing estimates and financing options to help you plan your investment wisely.</p>
              </Copy>
            </div>
            <div className="benefit-card">
              <Copy delay={0.35}>
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <h3>Timeline Planning</h3>
                <p>Understand realistic project timelines and scheduling to coordinate with your life and work commitments.</p>
              </Copy>
            </div>
            <div className="benefit-card">
              <Copy delay={0.4}>
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3>Next Steps Clarity</h3>
                <p>Leave with a clear action plan, whether you're ready to start now or planning for the future.</p>
              </Copy>
            </div>
          </div>
        </div>
      </section>

      <section className="consultation-process">
        <div className="container">
          <div className="consultation-process-header">
            <Copy delay={0.1}>
              <h2>How It Works</h2>
            </Copy>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <Copy delay={0.15}>
                <div className="step-number">1</div>
                <h3>Schedule Your Consultation</h3>
                <p>Fill out the form below or call us at (617) 462-0608 to set up a convenient time.</p>
              </Copy>
            </div>
            <div className="process-step">
              <Copy delay={0.2}>
                <div className="step-number">2</div>
                <h3>Meet with Kaby</h3>
                <p>Discuss your project in person or virtually. Bring photos, sketches, or ideas you've collected.</p>
              </Copy>
            </div>
            <div className="process-step">
              <Copy delay={0.25}>
                <div className="step-number">3</div>
                <h3>Receive Your Plan</h3>
                <p>Get a detailed proposal with design concepts, timeline, and pricing for your project.</p>
              </Copy>
            </div>
            <div className="process-step">
              <Copy delay={0.3}>
                <div className="step-number">4</div>
                <h3>Make Your Decision</h3>
                <p>Take your time to review. We're here to answer questions and adjust the plan as needed.</p>
              </Copy>
            </div>
          </div>
        </div>
      </section>

      <section className="consultation-form-section">
        <div className="container">
          <div className="consultation-form-wrapper">
            <div className="consultation-form-info">
              <Copy delay={0.1}>
                <h2>Ready to Start?</h2>
              </Copy>
              <Copy delay={0.15}>
                <p>Fill out the form and we'll contact you within 24 hours to schedule your free consultation.</p>
              </Copy>
              <div className="consultation-contact-info">
                <Copy delay={0.2}>
                  <div className="contact-item">
                    <h4>Call Us Directly</h4>
                    <p><a href="tel:6174620608">(617) 462-0608</a></p>
                  </div>
                </Copy>
                <Copy delay={0.25}>
                  <div className="contact-item">
                    <h4>Email Us</h4>
                    <p><a href="mailto:bcp411@hotmail.com">bcp411@hotmail.com</a></p>
                  </div>
                </Copy>
                <Copy delay={0.3}>
                  <div className="contact-item">
                    <h4>Service Areas</h4>
                    <p>Greater Boston, North Shore, South Shore</p>
                  </div>
                </Copy>
              </div>
            </div>
            <div className="consultation-form">
              <Copy delay={0.2}>
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input type="text" id="firstName" name="firstName" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input type="text" id="lastName" name="lastName" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input type="tel" id="phone" name="phone" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Project Description *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-button">
                    Request Free Consultation
                  </button>
                </form>
              </Copy>
            </div>
          </div>
        </div>
      </section>

      <section className="consultation-trust">
        <div className="container">
          <div className="stat">
            <div className="stat-count">
              <Copy delay={0.1}>
                <h2>25+</h2>
              </Copy>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-info">
              <Copy delay={0.15}>
                <p>Years of construction experience</p>
              </Copy>
            </div>
          </div>
          <div className="stat">
            <div className="stat-count">
              <Copy delay={0.2}>
                <h2>Master's</h2>
              </Copy>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-info">
              <Copy delay={0.25}>
                <p>Degree in Architecture</p>
              </Copy>
            </div>
          </div>
          <div className="stat">
            <div className="stat-count">
              <Copy delay={0.3}>
                <h2>100%</h2>
              </Copy>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-info">
              <Copy delay={0.35}>
                <p>Family owned & operated</p>
              </Copy>
            </div>
          </div>
          <div className="stat">
            <div className="stat-count">
              <Copy delay={0.4}>
                <h2>Licensed</h2>
              </Copy>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-info">
              <Copy delay={0.45}>
                <p>MA HIC & CSL certified</p>
              </Copy>
            </div>
          </div>
        </div>
      </section>

      <ConditionalFooter />
    </>
  );
}
