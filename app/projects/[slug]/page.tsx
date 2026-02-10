// app/projects/[slug]/page.tsx
import { projects } from "@/app/libs/projects";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Find the project that matches the URL
  const project = projects.find((p) => p.slug === slug);

  // 2. If it doesn't exist (e.g., /projects/blah), show 404
  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-[1040px] mx-auto py-20 px-6">
      {/* Header */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
      <p className="text-xl text-secondary-text mb-8">{project.category}</p>

      {/* Main Image */}
      <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
      </div>
    </main>
  );
}