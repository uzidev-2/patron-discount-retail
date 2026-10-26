import { IconBox, IconCompass, IconStorefront, IconTag } from "./icons";
import { Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

const STEPS = [
  {
    number: "01",
    title: "Explore",
    copy: "Browse different merchandise categories — electronics, clothing, toys, home goods and more — and discover the items that interest you.",
    Icon: IconCompass,
    rotate: "-rotate-3",
    dark: false,
  },
  {
    number: "02",
    title: "Find Your Bargain",
    copy: "Explore the products on the floor and compare the deals you find in-store. The racks and bins rotate, so every walk-through is a fresh look.",
    Icon: IconTag,
    rotate: "rotate-2",
    dark: true,
  },
  {
    number: "03",
    title: "Visit and Shop",
    copy: "Visit Patron Discount to check current merchandise and pricing in person. What you see on the floor is the real deal — grab it before it goes.",
    Icon: IconStorefront,
    rotate: "-rotate-2",
    dark: false,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      <div className="halftone pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="how-title"
          kicker="How It Works"
          title="Bargain hunting, three ways"
          note="A simple in-store experience — no apps, no accounts, no waiting. Just you and the aisles."
        />

        <div className="relative mt-14">
          {/* Connector */}
          <div
            className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-ink/30 lg:block"
            aria-hidden="true"
          />
          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {STEPS.map(({ number, title, copy, Icon, rotate, dark }, i) => (
              <li key={number}>
                <Reveal delay={i * 120} className="h-full">
                  <div
                    className={cn(
                      "relative flex h-full flex-col border-2 p-6 transition-transform duration-200 hover:-translate-y-1.5",
                      dark
                        ? "border-ink bg-ink text-paper shadow-hard-sun"
                        : "border-ink bg-card text-ink shadow-hard-sm hover:shadow-hard"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "grid h-20 w-20 shrink-0 place-items-center border-2 border-ink shadow-hard-xs transition-transform duration-300 hover:rotate-0",
                          rotate,
                          dark ? "bg-flame text-paper" : "bg-sun text-ink"
                        )}
                      >
                        <span className="font-display text-3xl tracking-wider">{number}</span>
                      </span>
                      <span
                        className={cn(
                          "grid h-12 w-12 place-items-center border-2",
                          dark ? "border-paper/30 text-sun" : "border-ink/25 text-flame"
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-3xl uppercase tracking-wide">{title}</h3>
                    <p
                      className={cn(
                        "mt-2.5 text-sm leading-relaxed",
                        dark ? "text-paper/75" : "text-ink/70"
                      )}
                    >
                      {copy}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-12 flex max-w-2xl items-start justify-center gap-2.5 text-center text-[13px] font-semibold leading-relaxed text-ink/55">
            <IconBox className="mt-0.5 h-4 w-4 shrink-0" />
            Merchandise and prices vary day to day — not every item is available every day, and
            that's part of the fun.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
