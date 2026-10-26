import { business, weeklyHours, hoursLabel } from "../data/business";
import { BtnLink, OpenNowBadge, Reveal, RotatingBadge, SmartImage } from "./ui";
import { IconArrowRight, IconBasket, IconBox, IconClock, IconPin } from "./icons";

const HERO_IMAGE =
  "https://images.pexels.com/photos/4053267/pexels-photo-4053267.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

const TICKER_ITEMS = [
  "Electronics",
  "Clothing",
  "Toys & Games",
  "Home Goods",
  "Household Essentials",
  "Bin Finds",
  "Laredo, TX",
  "Big Finds · Better Prices",
];

export function Hero() {
  const today = weeklyHours[new Date().getDay()];

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-[72px]">
      {/* Layered background */}
      <div className="halftone pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border-[26px] border-sun/40"
        aria-hidden="true"
      />
      <p
        className="pointer-events-none absolute -left-8 top-1/2 hidden -translate-y-1/2 -rotate-90 font-display text-[11rem] uppercase leading-none text-ink/[0.045] xl:block"
        aria-hidden="true"
      >
        Deals
      </p>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:pb-24">
        {/* Copy */}
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="tag-shape inline-flex items-center gap-2 border-2 border-ink bg-flame px-4 py-1.5 pl-6 text-[11px] font-black uppercase tracking-[0.16em] text-paper">
                Discount Retail · Laredo, TX
              </span>
              <OpenNowBadge />
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1
              id="hero-title"
              className="mt-6 font-display uppercase leading-[0.92] tracking-wide text-ink"
            >
              <span className="block text-[17vw] sm:text-7xl lg:text-[5.2rem] xl:text-[5.8rem]">
                Big Finds.
              </span>
              <span className="mt-1 block text-[17vw] sm:text-7xl lg:text-[5.2rem] xl:text-[5.8rem]">
                Better{" "}
                <span className="relative inline-block">
                  <span className="absolute -inset-x-2 bottom-1 top-2 -rotate-1 border-2 border-ink bg-sun" aria-hidden="true" />
                  <span className="relative">Prices.</span>
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
              Explore a wide variety of merchandise and discover bargain-shopping opportunities at{" "}
              <strong className="font-extrabold text-ink">Patron Discount</strong> in Laredo, Texas.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BtnLink href="#categories">
                Explore Categories
                <IconArrowRight className="h-4 w-4" />
              </BtnLink>
              <BtnLink href="#visit" variant="ghost">
                <IconPin className="h-4 w-4" />
                Plan Your Visit
              </BtnLink>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t-2 border-dashed border-ink/20 pt-6">
              {[
                { icon: IconClock, text: "Open 7 days a week" },
                { icon: IconBox, text: "6 aisles of merchandise" },
                { icon: IconBasket, text: "Bargain bins to dig through" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm font-bold text-ink/80">
                  <span className="grid h-8 w-8 place-items-center border-2 border-ink bg-card shadow-hard-xs">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Imagery */}
        <Reveal delay={200} className="relative">
          <div className="relative">
            <div className="overflow-hidden border-2 border-ink shadow-hard">
              <SmartImage
                src={HERO_IMAGE}
                alt="A shopper pushing a cart through a colorful, well-stocked retail aisle"
                className="kenburns h-[320px] w-full object-cover sm:h-[420px] lg:h-[480px]"
                eager
              />
            </div>

            {/* Floating price-tag sticker */}
            <div
              className="floaty absolute -left-3 top-6 sm:-left-6"
              style={{ ["--float-rot" as never]: "-6deg" }}
            >
              <div className="tag-shape border-2 border-ink bg-sun px-4 py-2 pl-6 shadow-hard-xs">
                <p className="font-display text-lg uppercase leading-none tracking-wide">
                  Bin Finds
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-ink/70">
                  Dig in ★
                </p>
              </div>
            </div>

            {/* Today's hours chip */}
            <div className="absolute bottom-5 left-4 flex items-center gap-2.5 border-2 border-ink bg-card px-4 py-2.5 shadow-hard-xs sm:left-6">
              <IconClock className="h-5 w-5 text-flame" />
              <div className="leading-tight">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-ink/60">
                  Open today
                </p>
                <p className="text-sm font-extrabold">{hoursLabel(today)}</p>
              </div>
            </div>

            {/* Rotating badge */}
            <RotatingBadge className="absolute -right-4 -top-8 h-24 w-24 sm:-right-7 sm:h-28 sm:w-28" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Ticker() {
  const row = (ariaHidden: boolean) => (
    <div className="flex items-center" aria-hidden={ariaHidden || undefined}>
      {TICKER_ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-6 pr-6 font-display text-2xl uppercase tracking-wider text-ink sm:text-3xl"
        >
          {item}
          <span className="text-flame" aria-hidden="true">
            ★
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee relative z-10 overflow-hidden border-y-2 border-ink bg-sun py-3.5">
      <div className="marquee-track">{row(false)}{row(true)}</div>
      <span className="sr-only">
        {business.name} — merchandise categories: {TICKER_ITEMS.slice(0, 6).join(", ")}
      </span>
    </div>
  );
}
