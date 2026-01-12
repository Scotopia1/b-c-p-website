"use client";
import "./service-detail.css";
import { notFound } from "next/navigation";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

import { services, getServiceBySlug } from "@/data/services-data";
import { getProjectsByService } from "@/data/projects-data";

export default function ServiceDetailPage({ params }) {
  const { slug } = params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = getProjectsByService(service.slug);

  return (
    <>
      <Nav />
      <div className="page service-detail">
        <section className="service-detail-hero">
          <div className="service-detail-hero-img">
            <img src={service.image} alt={service.name} />
          </div>
          <div className="service-detail-hero-overlay"></div>
          <div className="container">
            <div className="service-detail-hero-header">
              <Copy delay={1} animateOnScroll={false}>
                <h1>{service.name}</h1>
              </Copy>
            </div>
            <div className="service-detail-content">
              <div className="service-detail-col">
                <Copy delay={1.05} animateOnScroll={false}>
                  <p>{service.description}</p>
                </Copy>
              </div>
            </div>
          </div>
        </section>

        <section className="service-detail-info">
          <div className="container">
            <div className="service-detail-info-col">
              <Copy delay={0.1}>
                <p className="mono">What's Included</p>
                <div className="service-info-list">
                  {service.features.map((feature, index) => (
                    <p key={index}>{feature}</p>
                  ))}
                </div>
              </Copy>
            </div>
            <div className="service-detail-info-col">
              <Copy delay={0.15}>
                <p className="mono">Key Benefits</p>
                <div className="service-info-list">
                  {service.benefits.slice(0, 4).map((benefit, index) => (
                    <p key={index}>{benefit}</p>
                  ))}
                </div>
              </Copy>
            </div>
          </div>
        </section>

        <section className="service-detail-details service-detail-details-1">
          <div className="container">
            <div className="service-detail-col">
              <Copy delay={0.1}>
                <p>Our Process</p>
              </Copy>
            </div>
            <div className="service-detail-col">
              <Copy delay={0.1}>
                <h3>
                  At BCP, we follow a proven process to ensure your {service.name.toLowerCase()} project is completed on time, on budget, and to the highest quality standards.
                </h3>
              </Copy>
              <div className="service-process-steps">
                {service.process.map((step, index) => (
                  <div key={step.step} className="service-process-step">
                    <Copy delay={0.15 + index * 0.05}>
                      <div className="process-step-number">{step.step}</div>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </Copy>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {relatedProjects.length > 0 && (
          <section className="service-detail-details service-detail-details-2">
            <div className="container">
              <div className="service-detail-col">
                <Copy delay={0.1}>
                  <p>Recent Projects</p>
                </Copy>
              </div>
              <div className="service-detail-col">
                <Copy delay={0.1}>
                  <h3>
                    Take a look at some of our recent {service.name.toLowerCase()} projects. Each one showcases our commitment to quality craftsmanship and attention to detail.
                  </h3>
                </Copy>
                <div className="service-detail-gallery">
                  {relatedProjects.slice(0, 6).map((project, index) => (
                    <div key={project.id} className="service-detail-gallery-item">
                      <Copy delay={0.15 + index * 0.05}>
                        <div className="service-detail-details-img">
                          <img src={project.image} alt={project.title} />
                        </div>
                        <div className="project-info">
                          <h4>{project.title}</h4>
                          <p>{project.location}</p>
                        </div>
                      </Copy>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <CTAWindow
          img={service.image}
          header="Ready to Get Started?"
          callout="Schedule Your Free Consultation"
          description="Let's discuss your project goals and create a plan that brings your vision to life. No obligation, just honest advice from 25+ years of experience."
        />
      </div>
      <ConditionalFooter />
    </>
  );
}
