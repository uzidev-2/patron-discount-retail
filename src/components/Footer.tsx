import { business, hoursLabel, weeklyHours } from "../data/business";
import { IconArrowUpRight, IconDirections, IconTag } from "./icons";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Shop Categories", href: "#categories" },
  { label: "Browse the Aisles", href: "#browse" },
  { label: "Weekly Deals", href: "#deals" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Visit Us", href: "#visit" },
  { label: "Ask About an Item", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-sun bg-ink-deep text-paper/75">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr] lg:px-8">
        {/* Brand */}
        <div>
          <a href="#home" className="group inline-flex items-center gap-2.5">
            <span className="grid h-10 w-10 -rotate-6 place-items-center border-2 border-paper/80 bg-sun transition-transform duration-300 group-hover:rotate-3">
              <IconTag className="h-5 w-5 text-ink" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-xl uppercase tracking-wider text-paper">
                Patron
              </span>
              <span className="block font-display text-xl uppercase tracking-wider text-sun">
                Discount
              </span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            A discount retail destination in Laredo, Texas — explore a wide variety of merchandise
            and discover bargain-shopping opportunities in every aisle.
          </p>
          <p className="mt-4 inline-block border-2 border-dashed border-paper/30 px-3 py-1.5 font-mono text-xs font-bold tracking-wider text-sun">
            {business.plusCode}
          </p>
        </div>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-paper/50">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-sm font-bold text-paper/75 transition-colors hover:text-sun"
                >
                  <span className="text-flame transition-transform group-hover:translate-x-0.5">
                    ★
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hours */}
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-paper/50">
            Opening Hours
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {weeklyHours.map((d) => (
              <li key={d.day} className="flex items-baseline justify-between gap-3">
                <span className="font-bold text-paper/70">
                  {d.day}
                  {d.note ? (
                    <span className="ml-2 bg-flame px-1.5 py-px text-[9px] font-black uppercase tracking-widest text-paper">
                      {d.note}
                    </span>
                  ) : null}
                </span>
                <span className="tabular-nums text-paper/85">{hoursLabel(d)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12px] font-bold text-sun">
            ★ Tuesday closes early at 2:00 PM
          </p>
        </div>

        {/* Visit */}
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-paper/50">
            Visit Us
          </h2>
          <address className="mt-4 text-sm font-semibold not-italic leading-relaxed text-paper/85">
            {business.addressLine}
            <br />
            {business.addressCity}
            <br />
            United States
          </address>
          <p className="mt-4 text-[11px] font-black uppercase tracking-[0.2em] text-paper/50">
            Phone
          </p>
          <p className="mt-1 text-sm font-extrabold text-paper">{business.phone}</p>
          <a
            href={business.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 border-2 border-sun bg-sun px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-ink transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#ee4723] active:translate-y-0.5"
          >
            <IconDirections className="h-4 w-4" />
            Get Directions
            <IconArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs font-semibold text-paper/45 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.18em]">Discount Store · Laredo, Texas</p>
        </div>
      </div>
    </footer>
  );
}
