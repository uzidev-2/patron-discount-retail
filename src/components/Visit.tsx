import { business, hoursLabel, weeklyHours } from "../data/business";
import { IconClock, IconDirections, IconPhone, IconPin } from "./icons";
import { BtnLink, OpenNowBadge, Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

export function Visit() {
  const todayIndex = new Date().getDay();

  return (
    <section
      id="visit"
      aria-labelledby="visit-title"
      className="halftone relative scroll-mt-20 bg-paper-deep py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="visit-title"
          kicker="Visit Us"
          title="Visit Patron Discount"
          note="Find us on TX-359 East in Laredo. Come browse the aisles, dig through the bins, and see today's merchandise and prices for yourself."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Info card */}
          <Reveal>
            <div className="flex h-full flex-col border-2 border-ink bg-card p-6 shadow-hard-sm md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-3xl uppercase tracking-wide">{business.name}</h3>
                <OpenNowBadge />
              </div>

              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-ink bg-sun shadow-hard-xs">
                    <IconPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-ink/55">
                      Address
                    </p>
                    <p className="mt-0.5 font-extrabold leading-snug">{business.addressFull}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-ink bg-sun shadow-hard-xs">
                    <IconDirections className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-ink/55">
                      Plus Code
                    </p>
                    <p className="mt-1 inline-block border-2 border-dashed border-ink/40 bg-paper px-2.5 py-1 font-mono text-sm font-bold tracking-wider">
                      {business.plusCode}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-ink bg-sun shadow-hard-xs">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-ink/55">
                      Phone
                    </p>
                    <p className="mt-0.5 font-extrabold">{business.phone}</p>
                  </div>
                </li>
              </ul>

              {/* Hours */}
              <div className="mt-7 border-t-2 border-dashed border-ink/20 pt-6">
                <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-ink/55">
                  <IconClock className="h-4 w-4" />
                  Opening hours
                </p>
                <ul className="mt-3 space-y-1">
                  {weeklyHours.map((d, i) => {
                    const isToday = i === todayIndex;
                    return (
                      <li
                        key={d.day}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm",
                          isToday
                            ? "border-2 border-ink bg-sun font-extrabold"
                            : "border-2 border-transparent font-semibold text-ink/75"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {d.day}
                          {isToday ? (
                            <span className="border-2 border-ink bg-ink px-1.5 py-px text-[9px] font-black uppercase tracking-widest text-sun">
                              Today
                            </span>
                          ) : null}
                          {d.note ? (
                            <span className="bg-flame px-1.5 py-px text-[9px] font-black uppercase tracking-widest text-paper">
                              {d.note}
                            </span>
                          ) : null}
                        </span>
                        <span className="tabular-nums">{hoursLabel(d)}</span>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 text-[13px] font-bold text-flame-deep">
                  ★ Tuesday closes early at 2:00 PM — plan your bargain hunt accordingly.
                </p>
              </div>

              <div className="mt-auto pt-7">
                <BtnLink href={business.mapsDirectionsUrl}>
                  <IconDirections className="h-4 w-4" />
                  Get Directions
                </BtnLink>
              </div>
            </div>
          </Reveal>

          {/* Map card */}
          <Reveal delay={140}>
            <div className="flex h-full flex-col overflow-hidden border-2 border-ink bg-card shadow-hard">
              <div className="stripes-band h-3" aria-hidden="true" />
              <iframe
                title={`Map showing ${business.name} at ${business.addressFull}`}
                src={business.mapsEmbedUrl}
                className="min-h-[380px] w-full flex-1 border-0 grayscale-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-ink bg-paper px-5 py-4">
                <p className="text-sm font-extrabold">
                  {business.addressLine}
                  <span className="block text-xs font-bold text-ink/60">{business.addressCity}</span>
                </p>
                <a
                  href={business.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-ink bg-sun px-4 py-2 text-[11px] font-black uppercase tracking-wider shadow-hard-xs transition-all hover:-translate-y-0.5 hover:shadow-hard-sm active:translate-y-0.5 active:shadow-none"
                >
                  Open in Google Maps
                  <IconDirections className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
