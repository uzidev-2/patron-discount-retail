import { categories } from "../data/categories";
import { IconArrowRight, IconBurst } from "./icons";
import { Reveal, RotatingBadge, SmartImage } from "./ui";

const PHOTO_MAIN =
  "https://images.pexels.com/photos/7987752/pexels-photo-7987752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const PHOTO_SECOND =
  "https://images.pexels.com/photos/32474661/pexels-photo-32474661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-20 border-y-2 border-ink bg-card py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* Copy */}
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 border-2 border-ink bg-sun px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em]">
              <IconBurst className="h-3.5 w-3.5 text-flame" />
              About Patron Discount
            </p>
            <h2
              id="about-title"
              className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-wide sm:text-5xl"
            >
              The thrill of
              <br />
              <span className="text-flame">the find</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-lg leading-relaxed text-ink/75">
              Patron Discount is a discount retail destination in Laredo, Texas, where shoppers can
              explore a variety of merchandise — including electronics, clothing, toys and home
              goods. With a bargain-hunting shopping experience, customers can visit the store to
              discover what's available and check current prices.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/65">
              Merchandise moves fast and the mix changes, so no two visits look quite the same.
              That's the point: the best part of a discount store is finding something you weren't
              expecting — at a price that makes it an easy yes.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 text-[11px] font-black uppercase tracking-[0.18em] text-ink/55">
              You might spot
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-ink/20 bg-paper px-3.5 py-1.5 text-[12px] font-bold text-ink/80 transition-colors hover:border-ink hover:bg-sun/40"
                >
                  <span className={`h-2 w-2 rounded-full ${cat.dotClass}`} aria-hidden="true" />
                  {cat.short}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={260}>
            <a
              href="#how-it-works"
              className="group mt-8 inline-flex items-center gap-2 border-b-4 border-flame pb-1 text-sm font-black uppercase tracking-wider text-ink transition-colors hover:text-flame"
            >
              See how bargain shopping works
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* Photo collage */}
        <Reveal delay={150}>
          <div className="relative pb-16 pr-4 sm:pr-10">
            <div className="relative z-10 w-[82%] -rotate-2 overflow-hidden border-2 border-ink bg-paper shadow-hard transition-transform duration-300 hover:rotate-0">
              <SmartImage
                src={PHOTO_MAIN}
                alt="Shopping bags with red sale tags ready for a bargain haul"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 z-20 w-[58%] rotate-3 overflow-hidden border-2 border-ink bg-paper shadow-hard transition-transform duration-300 hover:rotate-0">
              <SmartImage
                src={PHOTO_SECOND}
                alt="A busy retail floor with colorful, fully stocked shelving"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <RotatingBadge className="absolute -top-8 right-2 z-30 h-24 w-24 sm:h-28 sm:w-28" />
            <span
              className="absolute left-2 top-2 z-0 h-24 w-24 border-2 border-dashed border-flame/50"
              aria-hidden="true"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
