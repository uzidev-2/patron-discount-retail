import { business, hoursLabel, weeklyHours } from "../data/business";
import { shopperReports, verifiedDeals } from "../data/deals";
import { IconBurst, IconCheck, IconInfo, IconTag } from "./icons";
import { BtnLink, Reveal, SectionHeading } from "./ui";

export function Deals() {
  const today = weeklyHours[new Date().getDay()];

  return (
    <section
      id="deals"
      aria-labelledby="deals-title"
      className="halftone-dark relative scroll-mt-20 overflow-hidden bg-navy py-20 text-paper md:py-28"
    >
      {/* Ambient decorations */}
      <IconBurst
        className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rotate-12 text-sun/[0.08]"
      />
      <IconBurst
        className="pointer-events-none absolute -bottom-28 -left-24 h-96 w-96 -rotate-6 text-flame/[0.09]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="deals-title"
            dark
            kicker="Weekly Deals"
            title="Discover the Deals"
            note="Merchandise and prices change regularly at Patron Discount. Visit the store to explore current bargains and merchandise deals across every aisle."
          />
          <Reveal delay={140}>
            <span className="mb-1 inline-flex -rotate-3 items-center gap-2 border-2 border-sun bg-flame px-4 py-2 font-display text-xl uppercase tracking-wider text-paper shadow-hard-paper">
              <IconBurst className="h-5 w-5 text-sun" />
              Hot aisle energy
            </span>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Current offers column */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col gap-5 border-2 border-paper/20 bg-navy-deep p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-3xl uppercase tracking-wide">
                  This week at the store
                </h3>
                <span className="hidden shrink-0 rounded-full border-2 border-sun px-3 py-1 text-[11px] font-black uppercase tracking-wider text-sun sm:inline-block">
                  Open today · {hoursLabel(today)}
                </span>
              </div>

              {verifiedDeals.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {verifiedDeals.map((deal) => (
                    <li key={deal.id} className="border-2 border-sun bg-navy p-5">
                      <p className="inline-block bg-sun px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-ink">
                        {deal.badge ?? "Confirmed"}
                      </p>
                      <h4 className="mt-2 font-display text-2xl uppercase tracking-wide">
                        {deal.title}
                      </h4>
                      <p className="mt-1 text-sm text-paper/70">{deal.when}</p>
                      <p className="mt-2 text-sm leading-relaxed text-paper/80">{deal.detail}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col gap-4 border-2 border-dashed border-paper/30 p-5 sm:flex-row sm:items-start">
                  <span className="grid h-12 w-12 shrink-0 rotate-6 place-items-center border-2 border-sun bg-navy text-sun">
                    <IconTag className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-base font-extrabold">No confirmed promotions posted right now</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper/70">
                      When the store confirms an offer, it appears right here. Until then, the aisles
                      are the source of truth — come browse today's bargains and see what the racks
                      are holding.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t-2 border-dashed border-paper/20 pt-5">
                <BtnLink href="#visit">Plan Your Visit</BtnLink>
                <p className="flex items-center gap-2.5 text-sm font-bold text-paper/80">
                  <span className="grid h-8 w-8 place-items-center border-2 border-paper/30 text-sun">
                    <IconInfo className="h-4 w-4" />
                  </span>
                  Questions? {business.phone}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Shopper buzz + policy column */}
          <div className="flex flex-col gap-6">
            {shopperReports.map((report, i) => (
              <Reveal key={report.id} delay={i * 90}>
                <div className="rotate-1 border-2 border-ink bg-sun p-6 text-ink shadow-hard-paper transition-transform duration-300 hover:rotate-0">
                  <p className="inline-block -rotate-2 border-2 border-ink bg-flame px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-paper">
                    Shopper buzz · Unverified
                  </p>
                  <h3 className="mt-3 font-display text-3xl uppercase leading-tight tracking-wide">
                    {report.claim}
                  </h3>
                  <p className="mt-2.5 text-sm font-semibold leading-relaxed text-ink/80">
                    {report.note}
                  </p>
                  <p className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-ink/55">
                    Reported by local shoppers — not a confirmed offer
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={160}>
              <div className="border-2 border-paper/20 bg-navy-deep p-6">
                <h3 className="flex items-center gap-2.5 text-base font-extrabold uppercase tracking-wide">
                  <IconCheck className="h-5 w-5 text-pine" />
                  Our deal-info promise
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-paper/70">
                  We only post a promotion once the store has confirmed it. No fake countdowns, no
                  made-up percentages, no crossed-out prices — what you see here is real, and the
                  best deals are the ones you uncover in person.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
