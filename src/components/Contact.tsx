import { business } from "../data/business";
import { IconClock, IconDirections, IconPhone, IconPin, IconTag } from "./icons";
import { BtnLink, Reveal, SectionHeading } from "./ui";
import { EnquiryForm } from "./EnquiryForm";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="halftone-dark relative scroll-mt-20 overflow-hidden bg-navy py-20 text-paper md:py-28"
    >
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full border-[22px] border-flame/15"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8">
        {/* Info column */}
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            id="contact-title"
            dark
            kicker="Contact"
            title="Get in touch"
            note="Questions about an item, a category, or today's finds? Prepare an enquiry here, then bring it to the counter or read it to the team — they'll check the floor for you."
          />

          <Reveal delay={120}>
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-sun bg-navy-deep text-sun">
                  <IconTag className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-paper/55">
                    Store
                  </p>
                  <p className="mt-0.5 font-display text-2xl uppercase leading-none tracking-wide text-paper">
                    {business.name}
                  </p>
                  <p className="mt-1 text-sm font-bold text-paper/70">{business.type}</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-sun bg-navy-deep text-sun">
                  <IconPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-paper/55">
                    Address
                  </p>
                  <p className="mt-0.5 font-extrabold leading-snug">{business.addressFull}</p>
                  <p className="mt-1 font-mono text-xs font-bold tracking-wider text-sun">
                    {business.plusCode}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-sun bg-navy-deep text-sun">
                  <IconPhone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-paper/55">
                    Phone
                  </p>
                  <p className="mt-0.5 font-extrabold">{business.phone}</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-sun bg-navy-deep text-sun">
                  <IconClock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-paper/55">
                    Hours
                  </p>
                  <p className="mt-0.5 font-extrabold leading-snug">
                    Sunday–Saturday from 10:00 AM
                    <span className="block text-sm font-bold text-sun">
                      Tuesday closes early at 2:00 PM
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <BtnLink href={business.mapsDirectionsUrl}>
                <IconDirections className="h-4 w-4" />
                Get Directions
              </BtnLink>
            </div>
            <p className="mt-6 max-w-md border-l-4 border-sun pl-4 text-sm font-semibold leading-relaxed text-paper/70">
              We're an in-store shopping destination — the fastest way to check an item is to visit,
              or to bring your prepared enquiry summary to the counter.
            </p>
          </Reveal>
        </div>

        {/* Form column */}
        <Reveal delay={140}>
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
