import { useEffect, useRef, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { getOpenStatus } from "../lib/hours";
import { IconSparkle, IconTag } from "./icons";

/* ------------------------------------------------------------------ */
/* Scroll reveal wrapper                                               */
/* ------------------------------------------------------------------ */

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", inView && "is-in", className)}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

interface SectionHeadingProps {
  kicker: string;
  title: string;
  note?: string;
  dark?: boolean;
  id?: string;
}

export function SectionHeading({ kicker, title, note, dark = false, id }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p
        className={cn(
          "inline-flex items-center gap-2 border-2 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em]",
          dark ? "border-sun bg-sun text-ink" : "border-ink bg-sun text-ink"
        )}
      >
        <IconSparkle className="h-3.5 w-3.5" />
        {kicker}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-4 font-display text-4xl uppercase leading-[0.95] tracking-wide sm:text-5xl",
          dark ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      {note ? (
        <p className={cn("mt-4 text-base sm:text-lg", dark ? "text-paper/70" : "text-ink/70")}>
          {note}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Image with graceful fallback                                        */
/* ------------------------------------------------------------------ */

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

export function SmartImage({ src, alt, className, eager = false }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("flex items-center justify-center bg-paper-deep", className)}
      >
        <span className="flex flex-col items-center gap-2 text-ink/30">
          <IconTag className="h-10 w-10" />
          <span className="px-4 text-center text-xs font-bold uppercase tracking-widest">
            Patron Discount
          </span>
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type CommonProps = {
  className?: string;
};

const btnBase =
  "inline-flex items-center justify-center gap-2.5 border-2 border-ink px-6 py-3.5 text-sm font-black uppercase tracking-wider transition-all duration-150 select-none";

const btnStyles = {
  primary: "bg-sun text-ink shadow-hard-sm hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0.5 active:shadow-none",
  dark: "bg-ink text-sun shadow-[4px_4px_0_0_#ffc61a] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#ffc61a] active:translate-y-0.5 active:shadow-none",
  ghost: "bg-transparent text-ink hover:bg-ink hover:text-paper",
  ghostDark: "border-paper bg-transparent text-paper hover:bg-paper hover:text-ink",
  flame: "bg-flame text-paper shadow-hard-sm hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0.5 active:shadow-none",
} as const;

type BtnVariant = keyof typeof btnStyles;

interface BtnLinkProps extends CommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: BtnVariant;
  href: string;
}

export function BtnLink({ variant = "primary", href, children, className, ...rest }: BtnLinkProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(btnBase, btnStyles[variant], className)}
      {...rest}
    >
      {children}
    </a>
  );
}

interface BtnButtonProps extends CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
}

export function Btn({ variant = "primary", children, className, ...rest }: BtnButtonProps) {
  return (
    <button type="button" className={cn(btnBase, btnStyles[variant], className)} {...rest}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Live open-now badge (computed from the published hours)             */
/* ------------------------------------------------------------------ */

export function OpenNowBadge({ className, dark = false }: { className?: string; dark?: boolean }) {
  const [status, setStatus] = useState(() => getOpenStatus());

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 border-ink px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider",
        status.isOpen ? "bg-pine text-paper" : dark ? "bg-navy-deep text-paper" : "bg-card text-ink",
        className
      )}
    >
      <span
        className={cn("h-2 w-2 rounded-full", status.isOpen ? "animate-pulse bg-sun" : "bg-flame")}
        aria-hidden="true"
      />
      {status.label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Rotating circular text badge                                        */
/* ------------------------------------------------------------------ */

export function RotatingBadge({ className }: { className?: string }) {
  return (
    <div className={cn("relative grid place-items-center", className)} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="spin-slow h-full w-full">
        <defs>
          <path id="pd-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="30" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" strokeDasharray="3 4" />
        <text
          fill="var(--color-ink)"
          fontSize="11.5"
          fontWeight="800"
          letterSpacing="2.6"
          fontFamily="Archivo, sans-serif"
        >
          <textPath href="#pd-circle">PATRON DISCOUNT ★ LAREDO TX ★ BIG FINDS ★</textPath>
        </text>
      </svg>
      <IconTag className="absolute h-8 w-8 text-ink" />
    </div>
  );
}
