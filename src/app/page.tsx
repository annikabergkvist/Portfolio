import Image from "next/image";
import Link from "next/link";
import { GeometricNetwork } from "@/components/geometric-network";
import { HeroBackgroundScene } from "@/components/hero-background-scene";
import { HeroHeadline } from "@/components/hero-headline";
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
          "relative flex w-full flex-col items-center justify-start overflow-hidden bg-background pb-2 md:pb-4",
          HERO_SECTION_TOP_CLASS,
          HERO_SECTION_MIN_HEIGHT_CLASS,
          "xl:ml-[-6rem] xl:w-[calc(100%+6rem)]",
        )}
      >
        <HeroBackgroundScene className="pointer-events-none absolute inset-0 z-0 h-full min-h-full w-full" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[min(22dvh,12rem)] bg-gradient-to-b from-transparent to-background"
          aria-hidden
        />
        <div
          className={cn(
            "relative z-10 w-full px-6 max-sm:px-7",
            HERO_MAIN_BLOCK_LAYOUT_CLASS,
          )}
        >
          <HeroHeadline />
        </div>
        <ScrollChevron />
      </section>

      <div className="relative">
        <GeometricNetwork />
        <div className="relative z-[1] -mt-[100svh]">
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
              I’m a designer based in Kristianstad, Sweden, working across UX, UI,
              visual design and frontend development.
            </p>
            <p className="text-[17px] font-medium leading-relaxed text-muted-foreground">
              With 10+ years across communication, visual design and UX/UI, I work
              with everything from user research and visual identities to
              interaction and UI design, prototypes and frontend development. I
              care about how things look, work and feel to use, from the overall
              structure to the details of each interaction. I can take ownership
              of a project from concept to delivery.
            </p>
            <p className="text-[17px] font-medium leading-relaxed text-muted-foreground">
              AI tools are a natural part of my everyday workflow. I use them to
              explore ideas, develop designs and build.
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
        </div>
      </div>
    </main>
  );
}
