/** Hand-drawn inline SVG icon set — consistent 24px grid, stroke-based. */

interface IconProps {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconTag({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M3.5 5.5a2 2 0 0 1 2-2h5.6a2 2 0 0 1 1.4.6l7.9 7.9a2 2 0 0 1 0 2.8l-5.6 5.6a2 2 0 0 1-2.8 0l-7.9-7.9a2 2 0 0 1-.6-1.4V5.5z" />
      <circle cx="9" cy="9" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBasket({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M3.5 9.5h17l-1.6 9a2 2 0 0 1-2 1.6H7.1a2 2 0 0 1-2-1.6l-1.6-9z" />
      <path d="M8 9.5 11 3.6M16 9.5 13 3.6M8.7 13v3.8M12 13v3.8M15.3 13v3.8" />
    </svg>
  );
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="10.5" cy="10.5" r="6.2" />
      <path d="m20 20-4.9-4.9" />
    </svg>
  );
}

export function IconPin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 21s-6.8-5.4-6.8-11A6.8 6.8 0 0 1 12 3.2 6.8 6.8 0 0 1 18.8 10c0 5.6-6.8 11-6.8 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2.2" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M5.5 3.5h3l1.7 4.3-2 1.7a12.5 12.5 0 0 0 5.8 5.8l1.7-2 4.3 1.7v3a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 3.5 5.6a2 2 0 0 1 2-2.1z" />
    </svg>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function IconX({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconCopy({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="9" y="9" width="11" height="11" rx="1.5" />
      <path d="M5.5 15H5a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 5 3h9A1.5 1.5 0 0 1 15.5 4.5V5" />
    </svg>
  );
}

export function IconTrash({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4.5 6.5h15M9.5 6V4.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V6M6.5 6.5l.8 12.6a1.6 1.6 0 0 0 1.6 1.4h6.2a1.6 1.6 0 0 0 1.6-1.4l.8-12.6M10 10.5v6M14 10.5v6" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M3.5 6.5h17M3.5 12h13M3.5 17.5h17" />
    </svg>
  );
}

export function IconCompass({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2z" />
    </svg>
  );
}

export function IconStorefront({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 9.5 5.3 4h13.4L20 9.5M4 9.5v1.2a2.2 2.2 0 0 0 4.4 0V9.5m0 0v1.2a2.2 2.2 0 0 0 4.4 0V9.5m0 0v1.2a2.2 2.2 0 0 0 4.4 0V9.5m0 0h2.8M5 13v7h14v-7M10 20v-4.5h4V20" />
    </svg>
  );
}

export function IconBox({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M3.5 8 12 3.5 20.5 8v8L12 20.5 3.5 16V8z" />
      <path d="M3.5 8 12 12.5 20.5 8M12 12.5v8" />
    </svg>
  );
}

export function IconSparkle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2.5c.9 4.6 2.4 6.6 3.4 7.6 1 1 3 2.5 6.1 1.9-4.6.9-6.6 2.4-7.6 3.4-1 1-2.5 3-1.9 6.1-.9-4.6-2.4-6.6-3.4-7.6-1-1-3-2.5-6.1-1.9 4.6-.9 6.6-2.4 7.6-3.4 1-1 2.5-3 1.9-6.1z" />
    </svg>
  );
}

export function IconBurst({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 1.8 13.9 5l3-2.1.6 3.7 3.7.6L19.1 10l3.1 2-3.1 2 2.1 2.9-3.7.6-.6 3.7-3-2.1L12 22.2 10.1 19l-3 2.1-.6-3.7-3.7-.6L4.9 14 1.8 12l3.1-2-2.1-2.9 3.7-.6.6-3.7 3 2.1L12 1.8z" />
    </svg>
  );
}

export function IconInfo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="7.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconAlert({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 4 2.8 19.5h18.4L12 4z" />
      <path d="M12 10v4.5" />
      <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconDirections({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 2.8 21.2 12 12 21.2 2.8 12 12 2.8z" />
      <path d="M9 13.5v-2a1.5 1.5 0 0 1 1.5-1.5H15m0 0-2.2-2.2M15 10l-2.2 2.2" />
    </svg>
  );
}

export function IconSort({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M7 4.5v15M7 19.5 4 16.5M7 19.5l3-3M17 19.5v-15M17 4.5l-3 3M17 4.5l3 3" />
    </svg>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="m12 2.8 2.5 6 6.5.5-5 4.2 1.6 6.4L12 16.4l-5.6 3.5L8 13.5 3 9.3l6.5-.5L12 2.8z" />
    </svg>
  );
}
