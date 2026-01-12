"use client";
import "./Footer.css";

import { useRef } from "react";
import Image from "next/image";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useViewTransition } from "@/hooks/useViewTransition";
import Copy from "../Copy/Copy";

import { RiFacebookBoxLine } from "react-icons/ri";
import { RiPhoneLine } from "react-icons/ri";
import { RiMailLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { navigateWithTransition } = useViewTransition();
  const socialIconsRef = useRef(null);

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;

      const icons = socialIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: -0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: socialIconsRef }
  );

  return (
    <div className="footer">
      <div className="footer-meta">
        <div className="container footer-meta-header">
          <div className="footer-meta-col">
            <div className="footer-meta-block">
              <div className="footer-meta-logo">
                <Copy delay={0.1}>
                  <Image
                    src="/Logo/BCP-New-Logo.png"
                    alt="BCP Logo"
                    width={150}
                    height={60}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </Copy>
              </div>
              <Copy delay={0.2}>
                <h2>Building Quality Homes with Trust & Expertise</h2>
              </Copy>
            </div>
          </div>
          <div className="footer-meta-col">
            <div className="footer-nav-links">
              <Copy delay={0.1}>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/");
                  }}
                >
                  <h3>Home</h3>
                </a>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/about");
                  }}
                >
                  <h3>About</h3>
                </a>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/services");
                  }}
                >
                  <h3>Services</h3>
                </a>
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/projects");
                  }}
                >
                  <h3>Projects</h3>
                </a>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/contact");
                  }}
                >
                  <h3>Contact</h3>
                </a>
                <a
                  href="/consultation"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/consultation");
                  }}
                >
                  <h3>Free Consultation</h3>
                </a>
              </Copy>
            </div>
          </div>
        </div>
        <div className="container footer-socials">
          <div className="footer-meta-col">
            <div className="footer-socials-wrapper" ref={socialIconsRef}>
              <a href="https://facebook.com/callbcp" target="_blank" rel="noopener noreferrer">
                <div className="icon">
                  <RiFacebookBoxLine />
                </div>
              </a>
              <a href="tel:6174620608">
                <div className="icon">
                  <RiPhoneLine />
                </div>
              </a>
              <a href="mailto:bcp411@hotmail.com">
                <div className="icon">
                  <RiMailLine />
                </div>
              </a>
            </div>
          </div>
          <div className="footer-meta-col">
            <Copy delay={0.1}>
              <p>
                Building quality homes with integrity and craftsmanship. Serving Greater Boston, North Shore, and South Shore with over 25 years of experience.
              </p>
            </Copy>
          </div>
        </div>
      </div>
      <div className="footer-outro">
        <div className="container">
          <div className="footer-header">
            <div className="footer-company-name">
              <Copy delay={0.2}>
                <h3>Building Construction Professionals</h3>
              </Copy>
              <Copy delay={0.3}>
                <p>
                  Developed by — <span>The Elites Solutions</span>
                </p>
              </Copy>
            </div>
          </div>
          <div className="footer-copyright">
            <p>
              MA HIC #183522 | MA CSL #CS-096174
            </p>
            <p>All rights reserved &copy; 2026 BCP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
