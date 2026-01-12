import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services-data";
import ServiceDetailClient from "./ServiceDetailClient";

// Generate static params for all services
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient slug={slug} />;
}
