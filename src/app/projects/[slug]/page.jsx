"use client";
import "./project-detail.css";
import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import MasonryGallery from "@/components/MasonryGallery/MasonryGallery";
import Copy from "@/components/Copy/Copy";

import { getProjectBySlug, getNextProject } from "@/data/projects-data";

export default function ProjectDetailPage({ params }) {
  const { slug } = use(params);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const project = getProjectBySlug(slug);
  const nextProject = getNextProject(slug);

  useEffect(() => {
    fetch(`/api/project-images/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images);
        setIsLoaded(true);
      })
      .catch(() => {
        setImages([]);
        setIsLoaded(true);
      });
  }, [slug]);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Nav />
      <div className="page project-detail">
        <section className="project-detail-hero">
          <div className="project-detail-hero-img">
            <img src={project.image} alt={project.title} />
          </div>
          <div className="project-detail-hero-overlay"></div>
          <div className="container">
            <div className="project-detail-hero-header">
              <Copy delay={1} animateOnScroll={false}>
                <p className="mono">{project.category}</p>
              </Copy>
              <Copy delay={1.05} animateOnScroll={false}>
                <h1>{project.title}</h1>
              </Copy>
              <Copy delay={1.1} animateOnScroll={false}>
                <p className="location">{project.location}</p>
              </Copy>
            </div>
          </div>
        </section>

        <section className="project-detail-gallery">
          <div className="container">
            <MasonryGallery images={images} />
          </div>
        </section>

        {isLoaded && nextProject && (
          <CTAWindow
            img={nextProject.image}
            header={nextProject.title}
            callout="Next Project"
            description={nextProject.location}
            href={`/projects/${nextProject.slug}`}
            ctaLabel="View Next Project"
          />
        )}
      </div>
      {isLoaded && <ConditionalFooter />}
    </>
  );
}
