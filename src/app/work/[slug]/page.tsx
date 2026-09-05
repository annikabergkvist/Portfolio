import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ChevronRight, Github } from "lucide-react";
import { BlockImageSaveUI } from "@/components/block-image-save-ui";
import { ProjectMockup } from "@/components/project-mockup";
import { MAIN_CONTENT_CLASS } from "@/lib/main-content";
import {
  PROJECT_SLUGS,
  getProjectBySlug,
  type Project,
  type ProjectGalleryImage,
} from "@/lib/projects";
import { getSiteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Phrases that start a case-study paragraph when followed by body text. */
const CASE_STUDY_SECTION_HEADINGS = new Set([
  "The problem.",
  "What I did.",
  "The result.",
  "Overview.",
  "The thinking behind it.",
  "What I built.",
  "A dual-surface product.",
  "Challenges I solved.",
  "Craft details.",
  "Stack.",
  "Two work models, on purpose.",
  "Knowing where to stop.",
  "Actionable over decorative.",
]);

type PageProps = {
  params: Promise<{ slug: string }>;
};

type CaseStudyBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "lead"; label: string; body: string }
  | { kind: "list"; items: string[] };

function buildCaseStudyBlocks(paragraphs: string[]): CaseStudyBlock[] {
  const blocks: CaseStudyBlock[] = [];
  for (let i = 0; i < paragraphs.length; i++) {
    const trimmed = paragraphs[i].trim();
    const next = paragraphs[i + 1]?.trim() ?? "";
    if (trimmed.startsWith("- ")) {
      const items = [trimmed.slice(2)];
      while (i + 1 < paragraphs.length && paragraphs[i + 1].trim().startsWith("- ")) {
        i += 1;
        items.push(paragraphs[i].trim().slice(2));
      }
      blocks.push({ kind: "list", items });
    } else if (
      CASE_STUDY_SECTION_HEADINGS.has(trimmed) &&
      next.length > 0 &&
      !CASE_STUDY_SECTION_HEADINGS.has(next) &&
      !next.startsWith("- ")
    ) {
      blocks.push({ kind: "lead", label: trimmed, body: next });
      i += 1;
    } else if (CASE_STUDY_SECTION_HEADINGS.has(trimmed)) {
      blocks.push({ kind: "lead", label: trimmed, body: "" });
    } else {
      blocks.push({ kind: "paragraph", text: paragraphs[i] });
    }
  }
  return blocks;
}

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project" };
  }
  const headline = project.subtitle
    ? `${project.title} — ${project.subtitle}`
    : project.title;
  const base = getSiteUrl();
  return {
    title: `${headline} — Annika Bergkvist`,
    description: project.description,
    openGraph: {
      title: `${headline} — Annika Bergkvist`,
      description: project.description,
      url: `${base}/work/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${headline} — Annika Bergkvist`,
      description: project.description,
    },
  };
}

function ProjectHeroIntro({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      <div className="flex flex-col gap-3 sm:gap-4">
        <span className="text-sm font-semibold text-primary">{project.index}</span>
        <div className="flex flex-col gap-1 sm:gap-1.5">
          <h1 className="text-balance text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.02]">
            {project.title}
          </h1>
          {project.subtitle ? (
            <p className="text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl lg:text-[2rem] lg:leading-tight">
              {project.subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex max-w-xl flex-col gap-5 sm:gap-6">
        {project.slug !== "orbit" ? (
          <p className="text-pretty text-base font-medium leading-relaxed text-secondary-foreground sm:text-lg sm:leading-relaxed">
            {project.description}
          </p>
        ) : null}
        <p className="text-pretty text-sm font-medium leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
          {project.role}
        </p>
      </div>
    </div>
  );
}

const bodyClass =
  "text-[17px] font-medium leading-relaxed text-secondary-foreground sm:text-[18px] sm:leading-[1.65]";

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) {
          return (
            <span key={i} className="font-bold text-foreground">
              {bold[1]}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function ProjectExternalLinks({
  liveUrl,
  githubUrl,
  slug,
}: {
  liveUrl?: string;
  githubUrl?: string;
  slug: Project["slug"];
}) {
  if ((!liveUrl || slug === "vdff") && !githubUrl) {
    return null;
  }

  return (
    <div
      className={cn(
        bodyClass,
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-8 sm:gap-y-2",
      )}
    >
      {liveUrl && slug !== "vdff" ? (
        <Link
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-baseline gap-0.5 font-semibold text-primary underline decoration-primary/40 underline-offset-[0.2em] transition-colors hover:text-primary/90 hover:decoration-primary"
        >
          <ChevronRight
            className="relative top-[0.12em] inline size-4 shrink-0 transition-transform group-hover:translate-x-0.5 sm:size-[1.125rem]"
            strokeWidth={2.5}
            aria-hidden
          />
          <span>View website</span>
        </Link>
      ) : null}
      {githubUrl ? (
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-baseline gap-1.5 font-semibold text-primary underline decoration-primary/40 underline-offset-[0.2em] transition-colors hover:text-primary/90 hover:decoration-primary"
        >
          <Github
            className="relative top-[0.08em] inline size-4 shrink-0 opacity-90 sm:size-[1.125rem]"
            strokeWidth={2.25}
            aria-hidden
          />
          <span>View on GitHub</span>
        </Link>
      ) : null}
    </div>
  );
}

function GalleryFigure({
  image,
  sizes,
}: {
  image: ProjectGalleryImage;
  sizes: string;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border/60 bg-card/20 shadow-[0_40px_90px_rgba(0,0,0,0.35)]">
      <BlockImageSaveUI>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          className="h-auto w-full select-none"
          draggable={false}
          priority={false}
        />
      </BlockImageSaveUI>
    </figure>
  );
}

function ProjectGallery({ images }: { images: ProjectGalleryImage[] }) {
  const groups: { variant: "desktop" | "phone"; items: ProjectGalleryImage[] }[] =
    [];
  for (const image of images) {
    const variant = image.variant ?? "desktop";
    const last = groups[groups.length - 1];
    if (last && last.variant === variant) {
      last.items.push(image);
    } else {
      groups.push({ variant, items: [image] });
    }
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {groups.map((group, gi) =>
        group.variant === "phone" ? (
          <div
            key={`phone-${gi}`}
            className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
          >
            {group.items.map((image) => (
              <GalleryFigure
                key={image.src}
                image={image}
                sizes="(min-width: 1024px) 18vw, 46vw"
              />
            ))}
          </div>
        ) : (
          <div key={`desktop-${gi}`} className="flex flex-col gap-8 sm:gap-10">
            {group.items.map((image) => (
              <GalleryFigure
                key={image.src}
                image={image}
                sizes="(min-width: 1024px) 90vw, 94vw"
              />
            ))}
          </div>
        ),
      )}
    </div>
  );
}

function CaseStudyBody({
  paragraphs,
  liveUrl,
  githubUrl,
  slug,
  showLinks,
}: {
  paragraphs: string[];
  liveUrl?: string;
  githubUrl?: string;
  slug: Project["slug"];
  showLinks: boolean;
}) {
  const blocks = buildCaseStudyBlocks(paragraphs);

  return (
    <div className="flex min-w-0 w-full max-w-[65ch] flex-col gap-6 lg:max-w-none">
      {blocks.map((block, i) => {
        if (block.kind === "lead") {
          return (
            <p key={`lead-${i}`} className={bodyClass}>
              <span className="font-bold text-foreground">{block.label}</span>
              {block.body ? ` ${block.body}` : null}
            </p>
          );
        }
        if (block.kind === "list") {
          return (
            <ul
              key={`list-${i}`}
              className={cn(bodyClass, "list-disc space-y-2 pl-5")}
            >
              {block.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={`p-${i}`} className={bodyClass}>
            {block.text}
          </p>
        );
      })}
      {showLinks ? (
        <div className="mt-6 sm:mt-8">
          <ProjectExternalLinks liveUrl={liveUrl} githubUrl={githubUrl} slug={slug} />
        </div>
      ) : null}

      {slug === "vdff" ? (
        <figure className="mt-10 overflow-hidden rounded-xl border border-border/60 bg-card/20 shadow-[0_40px_90px_rgba(0,0,0,0.35)] sm:mt-12">
          <BlockImageSaveUI>
            <Image
              src="/images/vdff-desktop.png"
              alt="VDFF website — desktop view"
              width={2400}
              height={1600}
              sizes="(min-width: 1024px) 58vw, 94vw"
              className="h-auto w-full select-none"
              draggable={false}
              priority={false}
            />
          </BlockImageSaveUI>
        </figure>
      ) : null}
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const paragraphs = project.fullDescription.split("\n\n");
  const mockupAlt = project.subtitle
    ? `${project.title} — ${project.subtitle} mockup`
    : `${project.title} mockup`;
  const hasGallery = Boolean(project.gallery?.length);

  return (
    <main className="flex min-w-0 flex-col pb-24 pt-12 sm:pb-28 sm:pt-14 lg:pt-16">
      <div className={cn(MAIN_CONTENT_CLASS, "flex flex-col gap-16 sm:gap-20 lg:gap-24")}>
        <Link
          href="/#work"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          <ArrowLeft className="size-4 shrink-0" strokeWidth={2.5} aria-hidden />
          Work
        </Link>
        <ProjectHeroIntro project={project} />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start lg:gap-x-16 xl:gap-x-20 2xl:gap-x-24">
          <CaseStudyBody
            paragraphs={paragraphs}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
            slug={project.slug}
            showLinks={!hasGallery}
          />

          <div className="min-w-0 overflow-visible lg:-mt-[min(28vh,13rem)] lg:sticky lg:top-28 lg:self-start xl:-mt-[min(32vh,15rem)] xl:top-24">
            {/*
              Narrower image track vs 50/50 grid — scale up from top-right so mockup
              matches previous visual weight without shrinking the text column.
            */}
            <div className="overflow-visible lg:origin-top-right lg:translate-x-7 lg:scale-[1.22] xl:translate-x-10 xl:scale-[1.18] 2xl:translate-x-12 2xl:scale-[1.14]">
              <ProjectMockup
                src={project.mockupSrc}
                alt={mockupAlt}
                floatDurationMs={project.floatDurationMs}
                floatDelayMs={project.floatDelayMs}
                className="mx-0 w-full !max-w-none pb-0 sm:pb-0"
              />
            </div>
          </div>
        </div>

        {hasGallery && project.gallery ? (
          <div className="flex flex-col gap-10 sm:gap-12">
            <ProjectGallery images={project.gallery} />
            <ProjectExternalLinks
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              slug={project.slug}
            />
          </div>
        ) : null}

        <p className="border-t border-border pt-12 sm:pt-14">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-base font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            <ArrowLeft className="size-4 shrink-0" strokeWidth={2.5} aria-hidden />
            Work
          </Link>
        </p>
      </div>
    </main>
  );
}
