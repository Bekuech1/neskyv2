// app/projects/[slug]/page.tsx
import { projects } from "@/app/libs/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import ActionLink from "@/app/components/ui/actionlink";
import Overview from "@/app/components/ui/overview";

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
    <main className="pt-35 pb-12">
      <div className="max-w-[808px] grid gap-8 mx-auto">
        {/* Header */}
        <div className="grid gap-3">
          <h1 className="text-4xl md:text-[36px] font-bold">{project.title}</h1>
          <div className="flex justify-between">
            <div className="flex gap-2">
              {project.tags.map((cat, index) => (
                <span
                  key={index}
                  className="text-sm font-medium px-3 bg-secondary py-1 rounded-full text-secondary-text"
                >
                  {cat}
                </span>
              ))}
            </div>
            <ActionLink
              label="Case Study"
              href={project.caseStudy || "#"}
              type="case"
              locked={project.isCaseStudyLocked}
            />
          </div>

        </div>

        {/* Main Image */}
        <div className="relative w-[808px] h-[477px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="grid gap-6">
          <h6 className="text-2xl font-bold">Overview</h6>
          <Overview data={project.overview} />
        </div>
      </div>
    </main>
  );
}