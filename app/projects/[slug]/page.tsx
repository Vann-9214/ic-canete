import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { CategoryBadge } from "@/components/ui/category-badge";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectBackLink } from "@/components/projects/project-back-link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | ICCañete`,
      description: project.shortDescription,
    },
  };
}

const mdxComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-balance text-text-primary mt-8 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-sans text-lg md:text-xl font-semibold text-balance text-text-primary mt-6 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="font-sans text-base leading-relaxed text-pretty text-text-secondary mb-4">
      {children}
    </p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-outside pl-6 space-y-2 mb-4 text-text-secondary">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-outside pl-6 space-y-2 mb-4 text-text-secondary">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="font-sans text-base leading-relaxed">{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted text-text-primary border border-border-subtle">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="font-mono text-xs p-4 rounded-xl bg-surface border border-border-subtle overflow-x-auto my-4 text-text-primary">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-accent-primary pl-4 italic text-text-secondary my-4">
      {children}
    </blockquote>
  ),
  a: ({
    href,
    children,
  }: {
    href?: string;
    children?: React.ReactNode;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-primary underline hover:text-accent-primary-hover font-medium transition-colors"
    >
      {children}
    </a>
  ),
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const mainImage =
    project.images && project.images.length > 0 ? project.images[0] : undefined;
  const hasLinks = Array.isArray(project.links) && project.links.length > 0;
  const hasDownloads =
    Array.isArray(project.downloads) && project.downloads.length > 0;

  return (
    <main className="py-14 md:py-20 min-h-screen">
      <article className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Suspense
            fallback={
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-mono text-text-muted hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded p-1"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Back to Projects</span>
              </Link>
            }
          >
            <ProjectBackLink />
          </Suspense>
        </div>

        {/* Category & Title */}
        <div className="space-y-3">
          <div>
            <CategoryBadge category={project.category} />
          </div>
          <h1 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-balance text-text-primary">
            {project.title}
          </h1>
          <p className="font-sans text-base md:text-lg leading-relaxed text-pretty text-text-secondary max-w-[68ch]">
            {project.shortDescription}
          </p>
        </div>

        {/* Links & Downloads Bar */}
        {(hasLinks || hasDownloads) && (
          <div className="flex flex-wrap items-center gap-3 pt-6 pb-2">
            {hasLinks &&
              project.links!.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-sm font-medium border border-border-subtle bg-surface hover:bg-surface-hover hover:border-border-strong text-text-primary transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ExternalLink
                    size={14}
                    className="text-text-muted"
                    aria-hidden="true"
                  />
                </a>
              ))}

            {hasLinks && hasDownloads && (
              <span
                className="hidden sm:inline-block w-px h-6 bg-border-subtle mx-1"
                aria-hidden="true"
              />
            )}

            {hasDownloads &&
              project.downloads!.map((download) => (
                <a
                  key={download.fileUrl}
                  href={download.fileUrl}
                  download
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] text-sm font-medium border border-border-subtle bg-surface hover:bg-surface-hover hover:border-border-strong text-text-primary transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring cursor-pointer"
                >
                  <Download
                    size={14}
                    className="text-accent-primary"
                    aria-hidden="true"
                  />
                  <span>{download.label}</span>
                  {download.fileSize && (
                    <span className="text-xs font-mono text-text-muted">
                      ({download.fileSize})
                    </span>
                  )}
                </a>
              ))}
          </div>
        )}

        {/* Primary Hero Image */}
        <div className="aspect-video w-full rounded-[20px] overflow-hidden bg-muted relative border border-border-subtle my-8 shadow-card">
          <ImageWithFallback
            src={mainImage?.src}
            alt={mainImage?.alt || project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* MDX Full Details */}
        <div className="max-w-[68ch]">
          <MDXRemote
            source={project.fullDetails || ""}
            components={mdxComponents}
          />
        </div>

        {/* Project Gallery */}
        <ProjectGallery
          images={project.images}
          projectTitle={project.title}
        />
      </article>
    </main>
  );
}
