import Image from "next/image";
import Link from "next/link";
import { TypewriterRole } from "@/components/typewriter-role";
import { HeroBackgroundVideo } from "@/components/hero-background-video";
import { ScrollChevron } from "@/components/scroll-chevron";
import { ProjectRow } from "@/components/project-row";
import { projects } from "@/lib/projects";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactDialog, ContactDialogTrigger } from "@/components/contact-dialog";
import {
  HERO_MAIN_BLOCK_LAYOUT_CLASS,
  HERO_SECTION_MIN_HEIGHT_CLASS,
  HERO_SECTION_TOP_CLASS,
} from "@/lib/hero-layout";
import { MAIN_CONTENT_CLASS } from "@/lib/main-content";
import { BlockImageSaveUI } from "@/components/block-image-save-ui";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-w-0 flex-col">
      <section
        className={cn(
          "relative flex w-full flex-col items-start justify-start overflow-hidden bg-background pb-2 md:pb-4",
          HERO_SECTION_TOP_CLASS,
          HERO_SECTION_MIN_HEIGHT_CLASS,
          "xl:ml-[-6rem] xl:w-[calc(100%+6rem)]",
        )}
      >
        <HeroBackgroundVideo className="hero-bg-video pointer-events-none absolute inset-0 z-0 min-h-full w-full object-cover" />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-black/45"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[min(60dvh,32rem)] bg-gradient-to-b from-transparent via-background/80 to-background sm:h-[min(55dvh,28rem)]"
          aria-hidden
        />
        <div
          className={cn(
            MAIN_CONTENT_CLASS,
            "relative z-10 w-full max-sm:px-7 xl:pl-6 2xl:pl-10",
            HERO_MAIN_BLOCK_LAYOUT_CLASS,
          )}
        >
          <div className="@container min-w-0 w-full">
            <div className="flex w-full min-w-0 max-w-full flex-col items-start text-left max-md:gap-6 md:gap-16">
              <p className="font-bold uppercase leading-none text-primary antialiased max-md:[font-size:clamp(0.8125rem,calc((100cqw-0.75rem)/20),1.125rem)] max-md:tracking-[0.34em] max-md:[word-spacing:0.52em] md:text-[21px] md:tracking-[0.32em] md:[word-spacing:0.6em] lg:text-[22px] lg:tracking-[0.34em] lg:[word-spacing:0.7em]">
                Annika Bergkvist
              </p>
              <div className="flex w-full min-w-0 flex-col items-stretch gap-3 md:items-start md:gap-6">
                <h1 className="max-w-full min-w-0 font-semibold leading-[0.92] tracking-[-0.02em] text-foreground max-md:text-balance max-md:[font-size:clamp(1.9rem,calc((100cqw-0.75rem)/7.75),3.75rem)] sm:max-md:whitespace-nowrap md:w-max md:max-w-full md:text-balance md:font-bold md:leading-[0.88] md:[font-size:clamp(2.85rem,11.5vw+1.6rem,7.5rem)]">
                  Design Engineer
                </h1>
                <div
                  className={cn(
                    "w-full min-w-0 max-w-full pt-0.5 leading-[1.06] md:w-max",
                    "max-[360px]:[font-size:clamp(1.05rem,calc((100cqw-0.75rem)/11.75),1.65rem)] max-sm:[font-size:clamp(1.15rem,calc((100cqw-0.75rem)/10.5),2.05rem)] sm:[font-size:clamp(1.55rem,min(5.8vw+0.45rem,3.35rem),3.35rem)] md:[font-size:clamp(1.45rem,5.4vw+0.55rem,5rem)]",
                  )}
                >
                  <TypewriterRole
                    roles={[
                      "UX/UI Design",
                      "Frontend Development",
                      "Graphic Design",
                      "AI-Assisted Workflow",
                     ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollChevron />
      </section>

      {/* Work: section h2; project titles are h3 inside ProjectRow */}
      <section id="work" className="flex flex-col">
        <h2 className="sr-only">Selected work</h2>
        {projects.map((project, i) => (
          <ProjectRow key={project.title} {...project} isFirst={i === 0} />
        ))}
      </section>

      {/* About — full-bleed image like hero, fades into page background top/bottom */}
      <section
        id="about"
        className={cn(
          "relative flex w-full flex-col overflow-hidden",
          "min-h-[min(100svh,56rem)] lg:min-h-[min(82svh,50rem)] xl:min-h-screen",
          "xl:ml-[-6rem] xl:w-[calc(100%+6rem)]",
        )}
      >
        <BlockImageSaveUI className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/about-me.jpg"
            alt="Annika Bergkvist"
            fill
            sizes="(max-width: 1280px) 100vw, calc(100vw + 6rem)"
            draggable={false}
            className="object-cover object-center max-sm:object-[58%_center]"
            priority={false}
          />
        </BlockImageSaveUI>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-black/40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-background from-[8%] via-background/95 via-[36%] to-transparent to-[88%] sm:via-[34%] sm:to-[86%] lg:via-[32%] lg:to-[84%]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[min(32dvh,16rem)] bg-gradient-to-b from-background to-transparent sm:h-[min(28dvh,14rem)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[min(32dvh,16rem)] bg-gradient-to-t from-background to-transparent sm:h-[min(28dvh,14rem)]"
          aria-hidden
        />
        <div
          className={cn(
            MAIN_CONTENT_CLASS,
            "relative z-10 flex flex-col gap-8 py-16 sm:py-20 lg:justify-center lg:py-24",
          )}
        >
          <div className="flex max-w-lg flex-col gap-6">
            <h2 className="text-3xl font-black leading-tight text-foreground sm:text-4xl">
              About me
            </h2>
            <p className="text-[17px] font-medium leading-relaxed text-muted-foreground">
              I’m a Design Engineer based in Kristianstad, Sweden, bridging product
              design and frontend development.
            </p>
            <p className="text-[17px] font-medium leading-relaxed text-muted-foreground">
              With 10+ years across communication, UX/UI, and frontend, I’ve
              shifted into Design Engineering, building production-ready interfaces
              with Next.js, React, Tailwind CSS, and shadcn/ui. I use AI-assisted
              workflows (Cursor + Claude) to iterate fast while keeping quality
              and consistency high.
            </p>
            <p className="text-[17px] font-medium leading-relaxed text-muted-foreground">
              What I bring to a team: strong design thinking, solid frontend
              execution, and the ability to own a feature end‑to‑end, from concept
              and prototypes to shipped code.
            </p>
            <ContactDialog>
              <ContactDialogTrigger asChild>
                <Button variant="glow" size="pill" className="mt-10 sm:mt-14">
                  <span className="inline-flex items-center gap-2">
                    <span>Get in touch</span>
                    <ArrowRight className="size-5" strokeWidth={2.5} aria-hidden />
                  </span>
                </Button>
              </ContactDialogTrigger>
            </ContactDialog>
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-center py-14 text-center text-sm text-muted-foreground sm:py-16 lg:py-20">
        <p>
          <span>© 2026 Annika Bergkvist · </span>
          <Link
            href="/privacy"
            className="font-medium underline decoration-muted-foreground/35 underline-offset-4 transition-colors hover:decoration-muted-foreground/60"
          >
            Privacy
          </Link>
        </p>
      </footer>
    </main>
  );
}
