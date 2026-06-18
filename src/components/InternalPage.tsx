import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

type CtaLink = {
  label: string;
  to: string;
};

export function SectionReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.36, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function InnerPageHero({
  title,
  description,
  imageSrc = "/cover-2.png",
  imageAlt = "",
}: {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-slate-950 pt-28 text-white shadow-[var(--shadow-ind-card)]">
      <div className="absolute inset-0">
        <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover opacity-98" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(202,138,4,.22),transparent_30%),radial-gradient(circle_at_18%_85%,rgba(0,122,85,.24),transparent_32%),linear-gradient(180deg,rgba(2,6,23,.88),rgba(15,23,42,.94))]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[340px] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center lg:min-h-[410px]">
        <h1 className="text-2xl md:text-3xl lg:text-6xl font-black leading-[1.08] tracking-normal text-white">{title}</h1>
        <p className="mt-6 max-w-3xl text-base font-bold leading-8 text-stone-100 lg:text-xl">{description}</p>
      </div>
    </section>
  );
}

export function PageSection({
  id,
  children,
  tone = "default",
}: {
  id: string;
  children: ReactNode;
  tone?: "default" | "soft" | "dark";
}) {
  const toneClass =
    tone === "dark"
      ? "border-y border-slate-800 bg-slate-950 text-white"
      : tone === "soft"
        ? "border-y border-stone-200 bg-[#F4F1EA]"
        : "bg-[#FAF9F6]";

  return (
    <section id={id} className={`relative scroll-mt-28 px-6 py-16 lg:py-24 ${toneClass}`}>
      {tone !== "default" && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img src="/cover-2.png" alt="" className={`h-full w-full object-cover ${tone === "dark" ? "opacity-[0.80]" : "opacity-[0.43]"}`} />
          <div className={`absolute inset-0 ${tone === "dark" ? "bg-slate-950/88" : "bg-[#F4F1EA]/82"}`} />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-4xl">{children}</div>
    </section>
  );
}

export function SectionHeading({ title, description, align = "center" }: { title: string; description?: string; align?: "center" | "start" }) {
  return (
    <div className={`mb-10 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-black leading-tight text-inherit">{title}</h2>
      {description && <p className="mt-4 text-base font-bold leading-8 text-slate-600 lg:text-lg">{description}</p>}
    </div>
  );
}

export function DefinitionPanel({
  title,
  body,
  emphasis,
  aside,
}: {
  title: string;
  body: string;
  emphasis?: string[];
  aside?: ReactNode;
}) {
  return (
    <SectionReveal>
      <article className="relative overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:p-9">
        <div className={`grid gap-7 ${aside ? "lg:grid-cols-[1fr_220px] lg:items-center" : ""}`}>
          <div>
            <h2 className="text-3xl font-black leading-tight text-slate-950 lg:text-4xl">{title}</h2>
            <p className="mt-5 max-w-3xl text-base font-bold leading-9 text-slate-600 lg:text-lg">{body}</p>
            {emphasis && emphasis.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {emphasis.map((item) => (
                  <span key={item} className="rounded-xl border border-[#007A55]/15 bg-[#007A55]/8 px-3 py-2 text-xs font-black text-[#006747]">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
          {aside}
        </div>
        
      </article>
    </SectionReveal>
  );
}

export function ProcessTimeline({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <div className="grid gap-4">
      {steps.map((step) => (
        <SectionReveal key={step.title}>
          <article className="rounded-[1.25rem] border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)] transition-colors hover:border-[#007A55]/25">
            <h3 className="text-xl font-black leading-8 text-slate-950">{step.title}</h3>
            <p className="mt-2 text-sm font-bold leading-7 text-slate-600 lg:text-base">{step.text}</p>
          </article>
        </SectionReveal>
      ))}
    </div>
  );
}

export function RequirementGroup({
  title,
  description,
  items,
  defaultOpen = false,
}: {
  title: string;
  description: string;
  items: string[];
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group rounded-[1.25rem] border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)] open:bg-[#FDFCF8]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-black text-slate-950 focus:outline-none focus:ring-4 focus:ring-[#007A55]/20">
        <span>{title}</span>
        <span aria-hidden="true" className="text-2xl leading-none text-[#007A55] transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <p className="mt-4 text-sm font-bold leading-7 text-slate-600">{description}</p>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-xl border border-stone-100 bg-[#FAF9F6] p-4 text-sm font-bold leading-7 text-slate-700">
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function InformationPanel({
  title,
  body,
  children,
  dark = false,
}: {
  title: string;
  body: string;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <SectionReveal>
      <article className={`rounded-[1.5rem] border p-6 shadow-[var(--shadow-ind-card)] lg:p-9 ${dark ? "border-slate-700 bg-slate-950 text-white" : "border-stone-200 bg-white text-slate-950"}`}>
        <h2 className="text-3xl font-black leading-tight lg:text-4xl">{title}</h2>
        <p className={`mt-5 max-w-3xl text-base font-bold leading-9 lg:text-lg ${dark ? "text-stone-200" : "text-slate-600"}`}>{body}</p>
        {children && <div className="mt-7">{children}</div>}
      </article>
    </SectionReveal>
  );
}

export function DocumentLinkCard({
  title,
  description,
  status,
  href,
  fallbackTo,
  actionLabel,
  fallbackLabel,
}: {
  title: string;
  description: string;
  status: string;
  href?: string;
  fallbackTo: string;
  actionLabel: string;
  fallbackLabel: string;
}) {
  const actionHref = href || fallbackTo;
  const label = href ? actionLabel : fallbackLabel;

  return (
    <SectionReveal>
      <article className="grid gap-5 rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
        <div>
          <h3 className="text-2xl font-black text-slate-950">{title}</h3>
          <p className="mt-3 text-sm font-bold leading-7 text-slate-600">{description}</p>
          <p className="mt-4 w-fit rounded-lg border border-stone-200 bg-[#FAF9F6] px-3 py-2 text-xs font-black text-stone-500">{status}</p>
        </div>
        <a
          href={actionHref}
          target={href ? "_blank" : undefined}
          rel={href ? "noreferrer" : undefined}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#007A55] px-5 py-3 text-sm font-black text-white shadow-[var(--shadow-ind-floating)] hover:bg-[#004D36] focus:outline-none focus:ring-4 focus:ring-[#007A55]/20"
        >
          {label}
        </a>
      </article>
    </SectionReveal>
  );
}

export function FinalActionPanel({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description?: string;
  primary: CtaLink;
  secondary: CtaLink;
}) {
  return (
    <section className="relative overflow-hidden rounded-[1.5rem] border border-[#CA8A04]/25 bg-[#004D36] p-6 text-white shadow-[var(--shadow-ind-floating)] lg:p-9">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-black leading-tight lg:text-4xl">{title}</h2>
        {description && <p className="mt-4 text-sm font-bold leading-8 text-stone-100 lg:text-base">{description}</p>}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to={primary.to} className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#CA8A04] px-6 py-3 text-sm font-black text-slate-950 shadow-[var(--shadow-ind-floating)] hover:bg-[#E0A11A] focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/25">
            {primary.label}
          </Link>
          <Link to={secondary.to} className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white hover:border-white/35 focus:outline-none focus:ring-4 focus:ring-white/20">
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
