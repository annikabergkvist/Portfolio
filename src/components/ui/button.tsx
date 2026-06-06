import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-']):not([class*='w-']):not([class*='h-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        glow: [
          // allow the halo to extend outside the pill (like the reference)
          "relative isolate overflow-visible",
          // no border / no outline edge — fill uses page background
          "border-0 bg-transparent text-foreground/90",
          "backdrop-blur-md",
          "shadow-[0_10px_30px_rgba(0,0,0,0.55)]",
          "will-change-transform transition-transform duration-200 ease-out",
          "hover:text-foreground",
          "hover:[text-shadow:0_0_14px_color-mix(in_oklab,var(--ring)_35%,transparent)]",
          "hover:-translate-y-px",
          "hover:opacity-95",
          // navy glow behind
          "before:pointer-events-none before:absolute before:inset-[-10px] before:rounded-[calc(var(--radius-lg)+10px)]",
          "before:-z-10",
          "before:bg-[radial-gradient(60%_120%_at_50%_50%,color-mix(in_oklab,var(--ring)_55%,transparent),transparent_70%)]",
          "before:opacity-60 before:blur-2xl",
          // extra halo strength (outer glow) — no 1px edge
          "shadow-[0_0_24px_color-mix(in_oklab,var(--ring)_30%,transparent)]",
          "hover:shadow-[0_0_32px_color-mix(in_oklab,var(--ring)_38%,transparent)]",
          // subtle glass shine on top edge (not a fill gradient)
          "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:content-['']",
          "after:ring-1 after:ring-inset after:ring-white/10",
          "after:bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]",
          "after:opacity-70",
          "hover:after:ring-white/14",
          "hover:bg-transparent",
          "active:bg-transparent",
          "focus-visible:border-transparent",
          "focus-visible:ring-4 focus-visible:ring-ring/35",
        ].join(" "),
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
        /** Portfolio CTAs: pill shape, comfortable padding */
        pill:
          "h-auto min-h-11 w-fit gap-2 rounded-md px-5 py-3 text-[16px] font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
