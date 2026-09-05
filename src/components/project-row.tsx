import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectMockup } from "@/components/project-mockup";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { MAIN_CONTENT_CLASS } from "@/lib/main-content";
import { cn } from "@/lib/utils";

const gridClass =
  "grid grid-cols-1 items-start gap-10 pb-16 pt-0 sm:pb-20 sm:pt-0 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-16 lg:pb-24 lg:pt-0 xl:min-h-screen";

type ProjectRowProps = Project & {
  /** First row sits tight to the hero */
  isFirst?: boolean;
};

export function ProjectRow({
  slug,
  index,
  title,
  subtitle,
  description,
  role,
  mockupSrc,
  floatDurationMs,
  floatDelayMs,
  isFirst,
}: ProjectRowProps) {
  return (
    <div
      className={cn(
        MAIN_CONTENT_CLASS,
        "!pl-4 sm:!pl-6 md:!pl-8",
        gridClass,
        // keep the first row close to the hero, but avoid looking “cut off”
        isFirst && "pt-4 sm:pt-6 lg:pt-8",
      )}
    >
      <div className="flex flex-col gap-6 lg:max-w-[420px] lg:self-center lg:-translate-y-4">
        <span className="text-base font-semibold text-primary">
          {index}
        </span>
        <div className="flex flex-col gap-1 sm:gap-1.5">
          <h3 className="mb-0 max-w-full text-balance text-[clamp(2rem,6vw+1rem,50px)] font-black leading-[1.05] text-foreground">
            {title}
          </h3>
          {subtitle ? (
            <p className="max-w-full text-pretty text-[clamp(1.05rem,2.2vw+0.4rem,1.35rem)] font-semibold leading-snug text-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-10 sm:gap-12">
          <p className="text-[18px] font-medium leading-[1.5] text-secondary-foreground">
            {description}
          </p>
          <p className="text-[16px] font-medium leading-relaxed text-muted-foreground">
            {role}
          </p>
        </div>
        <Button
          variant="glow"
          size="pill"
          className="mt-2"
          asChild
        >
          <Link href={`/work/${slug}`}>
            <span className="inline-flex items-center gap-2">
              <span>View project</span>
              <ArrowRight
                className="size-5"
                strokeWidth={2.5}
                aria-hidden
              />
            </span>
          </Link>
        </Button>
      </div>
      <ProjectMockup
        src={mockupSrc}
        alt={`${title} mockup`}
        floatDurationMs={floatDurationMs}
        floatDelayMs={floatDelayMs}
        priority={isFirst}
      />
    </div>
  );
}
