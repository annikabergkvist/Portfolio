"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SITE_EMAIL_ADDRESS, SITE_MAILTO } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

export function ContactDialogTrigger({
  children,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  return (
    <DialogTrigger asChild>
      {children}
    </DialogTrigger>
  );
}

type SendState = "idle" | "sending" | "success" | "error";

export function ContactDialog({ children }: { children: React.ReactNode }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [sendState, setSendState] = React.useState<SendState>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sendState === "sending") return;
    setSendState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          company,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setSendState("error");
        return;
      }
      setSendState("success");
      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
    } catch {
      setSendState("error");
    }
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setSendState("idle");
      }}
    >
      {children}
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          "before:pointer-events-none before:absolute before:inset-0 before:-z-10",
          "before:bg-[radial-gradient(55%_70%_at_20%_20%,color-mix(in_oklab,var(--ring)_20%,transparent),transparent_70%)]",
        )}
      >
        <DialogTitle className="sr-only">Contact</DialogTitle>
        <DialogDescription className="sr-only">
          Contact form dialog
        </DialogDescription>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.02em] text-foreground sm:text-5xl">
              Let&apos;s talk.
            </h2>
            <ul className="space-y-1 md:space-y-2 text-[17px] font-medium leading-relaxed text-muted-foreground">
              <li>Design Engineering</li>
              <li>UX/UI Design</li>
              <li>Frontend Development</li>
              <li>AI-assisted workflows</li>
            </ul>
          </div>

          <form
            onSubmit={onSubmit}
            className="relative flex flex-col gap-4"
            noValidate
          >
            <div
              className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
              aria-hidden
            >
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                name="company"
                value={company}
                tabIndex={-1}
                autoComplete="off"
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <Field
              label="Name"
              input={
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                  autoComplete="name"
                  placeholder="Your name"
                />
              }
            />
            <Field
              label="Email"
              input={
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  required
                />
              }
            />
            <Field
              label="Message"
              input={
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={cn(fieldClass, "min-h-32 resize-y")}
                  placeholder="Write your message here"
                  required
                />
              }
            />

            {sendState === "success" ? (
              <p
                role="status"
                className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium text-foreground"
              >
                Message sent. I&apos;ll get back to you soon.
              </p>
            ) : null}
            {sendState === "error" ? (
              <p
                role="alert"
                className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm font-medium text-foreground"
              >
                Couldn&apos;t send from here. Email me at{" "}
                <a
                  href={SITE_MAILTO}
                  className="font-semibold text-primary underline decoration-primary/40 underline-offset-2"
                >
                  {SITE_EMAIL_ADDRESS}
                </a>
                .
              </p>
            ) : null}

            <div className="pt-2">
              <Button
                type="submit"
                variant="default"
                size="pill"
                className="w-full"
                disabled={sendState === "sending"}
              >
                {sendState === "sending" ? "Sending…" : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, input }: { label: string; input: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {input}
    </label>
  );
}

const fieldClass = cn(
  "w-full rounded-md border border-input bg-background/50 px-3 py-2 text-[15px] text-foreground",
  "placeholder:text-muted-foreground/70",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
);

