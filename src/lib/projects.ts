export const PROJECT_SLUGS = [
  "vdff",
  "wexiodisk",
  "leader-linne",
  "fintech-dashboard",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export type Project = {
  slug: ProjectSlug;
  index: string;
  title: string;
  /** Shown under the title on the project detail page only */
  subtitle?: string;
  /** Short teaser on the home work section */
  description: string;
  /** Longer narrative on the project detail page */
  fullDescription: string;
  /** Full role line (detail page + home row); often starts with "Role: …" */
  role: string;
  /** Public URL when the work is live; omit when not applicable */
  liveUrl?: string;
  /** Public repo (e.g. GitHub); shown on case study when set */
  githubUrl?: string;
  mockupSrc: string;
  floatDurationMs?: number;
  floatDelayMs?: number;
};

export const projects: Project[] = [
  {
    slug: "vdff",
    index: "01",
    title: "VDFF Website Redesign",
    description:
      "Växjö DFF needed a website that could keep up with their growing fanbase, sponsors, and media presence—surfacing results, player profiles, news, and membership in a modern, engaging way across devices.",
    fullDescription:
      "The problem.\n\nVäxjö DFF is one of Sweden's women's football clubs competing at the top level. As the club grew its fanbase, sponsor relationships and media presence, they needed a website that could keep up — one that surfaced match results, player profiles, news and membership in a way that felt modern and engaging for fans on any device.\n\nWhat I did.\n\nI joined the project as the lead frontend developer, working from detailed high-fidelity designs delivered by the designer on the team. My focus was translating those designs into a fully responsive, performant website using HTML5, CSS3, JavaScript and the agency's CMS platform.\n\nI implemented the full frontend — from the hero section and live match result cards to player profile grids, news feeds, sponsor rows and the membership call-to-action. Where designs didn't specify every breakpoint, I extended the system logically to ensure a consistent and intentional experience across mobile, tablet and desktop. I collaborated closely with a backend developer on the final integration and conducted testing across devices and browsers before launch.\n\nThe result.\n\nThe site launched successfully and gave Växjö DFF a modern digital home that matched the ambition of the club. It handled dynamic content — results, rankings, player data — while maintaining a polished visual experience across all screen sizes.",
    role: "Role: Frontend Developer — responsive implementation, HTML/CSS/JS, cross-team collaboration, QA & testing",
    mockupSrc: "/images/mockup-vdff2.png",
    floatDurationMs: 8000,
    floatDelayMs: 140,
  },
  {
    slug: "wexiodisk",
    index: "02",
    title: "Wexiödisk",
    subtitle: "PRM Savings Calculator",
    description:
      "Wexiödisk needed a way to make the ROI of their pre-rinse machine concrete and compelling for buyers. I designed a savings calculator that guides users through their specific situation and surfaces a clear payback timeline, turning a complex sales argument into a simple, shareable number.",
    fullDescription:
      "The problem.\n\nWexiödisk's PRM pre-rinse machine saves restaurants, schools and hotels significant amounts of water, energy and labor — but proving that value in a sales conversation is hard without concrete numbers. Buying decisions in professional kitchens are rarely made on intuition. Decision-makers need to justify the investment internally, which means they need to see a clear return on investment for their specific situation before they commit. Without a tool to calculate that, sales conversations relied on generic estimates that were difficult to trust and easy to set aside.\n\nWhat I did.\n\nAs the sole designer on the project, I worked directly with Wexiödisk to understand their sales process and what information their customers needed to make a confident decision. The brief was clear: make the savings tangible and the machine easy to justify.\n\nI designed the calculator experience in Figma from the ground up. The interface guides users through their situation — workplace type, number of racks washed per day, working days per year — and immediately surfaces how quickly the machine pays for itself. A simple mode makes the entry point approachable, while an advanced mode lets users fine-tune energy costs, water prices and machine cost for a more precise calculation. Results are shown as a clear ROI timeline across one, five and ten years.\n\nOnce the design was approved, I collaborated closely with the frontend and backend development teams, providing design assets and working through any technical implementation questions that came up. Throughout the project I maintained open communication with the client, presenting designs and iterating based on their feedback to ensure the final product matched both their vision and their customers' needs.\n\nThe result.\n\nThe calculator launched successfully and is still live and in use today. It gave Wexiödisk's sales team a concrete, visual tool to use in customer conversations, turning a complex value proposition into a simple, shareable number. What had previously required manual estimates and spreadsheets became something a salesperson could pull up in a meeting and walk a customer through in minutes.",
    role: "Role: UI/UX Designer — interaction design, Figma prototyping, cross-team collaboration",
    liveUrl: "https://wexiodisk.com/kalkylator",
    mockupSrc: "/images/mockup-wexiodisk.png",
    floatDurationMs: 7200,
    floatDelayMs: 420,
  },
  {
    slug: "leader-linne",
    index: "03",
    title: "Leader Linné",
    subtitle: "Homepage Redesign & Development",
    description:
      "Homepage redesign and build for a regional NGO: outdated navigation and clutter made key content hard to find. I simplified information architecture, designed in Figma, and shipped responsive HTML/CSS/JS and Liquid templates—with ongoing client collaboration through to launch.",
    fullDescription:
      "The problem.\n\nLeader Linné Småland's website was outdated, cluttered and difficult to navigate. An oversized, unorganised menu with links scattered across every page made it nearly impossible for visitors to find what they were looking for. The client needed a modern, streamlined site that surfaced the most important content, grant applications, ongoing projects and news, without making users hunt for it.\n\nWhat I did.\n\nBy combining UX research, UI design and hands-on frontend development, I was able to own the full process from first client call to final deployment.\n\nI started by working closely with the client to understand their business goals, user needs and pain points, gathering insights through interviews and discussions to inform design decisions. I then conducted heuristic evaluation, analysing the existing site and benchmarking against similar organisations to identify structural and usability issues.\n\nFrom there I simplified the entire site architecture, reducing and reorganising the navigation into clear categories with dropdowns where needed. Priority content, how to apply for grants, what the process involves, news, and current and upcoming projects, was brought forward and made immediately accessible.\n\nHigh-fidelity prototypes were built in Figma, with a strong focus on crafting a visually modern and intuitive interface that aligned with the client's brand identity. Designs were presented and iterated based on client feedback before moving into frontend development. The approved designs were translated into fully responsive, pixel-perfect pages using HTML, CSS, JavaScript and Liquid templating.\n\nThroughout the project I maintained open communication with the client, gathering feedback at every stage and guiding them through design and development decisions to ensure clarity and alignment. Conducted cross-device and cross-browser testing to ensure a polished, consistent experience before launch.\n\nThe result.\n\nThe simplified navigation and clearer information hierarchy made key content significantly easier to find. Visitors no longer had to search for grant information or project updates, it was front and centre. The client reported positive feedback from users following launch, noting that the site felt modern, easier to navigate and better represented the organisation.",
    role:
      "Role: Design Engineer — UX research, UI design, Figma prototyping, frontend development, QA & testing",
    liveUrl: "https://leaderlinne.se/",
    mockupSrc: "/images/mockup-leader2.png",
    floatDurationMs: 7600,
    floatDelayMs: 260,
  },
  {
    slug: "fintech-dashboard",
    index: "04",
    title: "Fintech Dashboard UI",
    description:
      "Most fintech dashboards are either visually cluttered or too stripped back to be useful. This project started as a course exercise redesigning the Wise dashboard, but quickly became an opportunity to build a production-ready UI from scratch using a modern stack.",
    fullDescription:
      "The problem.\n\nMost fintech dashboards are either visually cluttered or too stripped back to be useful. This project started as a course exercise redesigning the Wise dashboard, but quickly became something more, a real opportunity to build a production-ready UI from scratch using a modern stack, and to prove that design and engineering can coexist without compromise.\n\nWhat I did.\n\nI redesigned and built the dashboard end-to-end using Next.js, React, Tailwind CSS v4 and shadcn/ui. The work centered on building a small but complete design system. Semantic color tokens, typography scale and spacing primitives, that made both light and dark mode first-class, keeping data and states legible in both themes.\n\nReusable components for cards, tables and charts were built on shadcn/ui primitives and Recharts, ensuring the UI could grow without becoming a patchwork of one-off solutions. Complex flows were broken into focused views with consistent patterns for filters, summaries and empty states.\n\nThe result is a dashboard that reads clearly at a glance, scales as new data and features are added, and is built the way a product team would actually build it.\n\nThe result.\n\nLive on Vercel. Source code on GitHub. Built to the same standards I would apply to a production codebase.",
    role: "Role: Design Engineer — UX/UI design, design system, component architecture, frontend development",
    liveUrl: "https://fintech-dashboard-ui-six.vercel.app/",
    githubUrl: "https://github.com/annikabergkvist/Fintech-Dashboard-UI",
    mockupSrc: "/images/mockup-fintech.png",
    floatDurationMs: 6800,
    floatDelayMs: 80,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
