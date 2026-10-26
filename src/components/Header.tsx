import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { IconBurst, IconMenu, IconTag, IconX } from "./icons";

const NAV_ITEMS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Shop Categories", href: "#categories", id: "categories" },
  { label: "Weekly Deals", href: "#deals", id: "deals" },
  { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { label: "About", href: "#about", id: "about" },
  { label: "Visit Us", href: "#visit", id: "visit" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock body scroll + Escape to close the mobile menu
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b-2 border-ink bg-paper/95 shadow-[0_3px_0_rgba(20,28,44,0.12)] backdrop-blur"
          : "border-b-2 border-transparent bg-paper/0"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Patron Discount — home">
          <span className="grid h-10 w-10 -rotate-6 place-items-center border-2 border-ink bg-sun shadow-hard-xs transition-transform duration-300 group-hover:rotate-3">
            <IconTag className="h-5 w-5 text-ink" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[19px] uppercase tracking-wider text-ink">
              Patron
            </span>
            <span className="block font-display text-[19px] uppercase tracking-wider text-flame">
              Discount
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-[13px] font-bold uppercase tracking-wide transition-colors",
                active === item.id
                  ? "bg-sun text-ink"
                  : "text-ink/80 hover:bg-sun/50 hover:text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#deals"
            className="group hidden items-center gap-2 border-2 border-ink bg-ink px-4 py-2.5 text-[13px] font-black uppercase tracking-wider text-sun shadow-[3px_3px_0_0_#ffc61a] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#ffc61a] active:translate-y-0.5 active:shadow-none sm:inline-flex"
          >
            <IconBurst className="h-4 w-4 text-flame transition-transform duration-500 group-hover:rotate-180" />
            Explore Deals
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center border-2 border-ink bg-card text-ink shadow-hard-xs transition active:translate-y-0.5 active:shadow-none lg:hidden"
          >
            {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        inert={!open}
        className={cn(
          "overflow-hidden border-ink bg-paper transition-[max-height] duration-300 ease-out lg:hidden",
          open ? "max-h-[520px] border-t-2" : "max-h-0"
        )}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4 py-4 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "flex items-center justify-between rounded-md border-2 px-4 py-3 text-sm font-black uppercase tracking-wider transition-colors",
                active === item.id
                  ? "border-ink bg-sun text-ink"
                  : "border-transparent text-ink hover:border-ink hover:bg-sun/40"
              )}
            >
              {item.label}
              <span aria-hidden="true" className="text-flame">
                ★
              </span>
            </a>
          ))}
          <a
            href="#deals"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 border-2 border-ink bg-ink px-4 py-3.5 text-sm font-black uppercase tracking-wider text-sun shadow-hard-xs"
          >
            <IconBurst className="h-4 w-4 text-flame" />
            Explore Deals
          </a>
        </nav>
      </div>
    </header>
  );
}
