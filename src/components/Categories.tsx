import { categories, type Category } from "../data/categories";
import { itemsByCategory } from "../data/merchandise";
import { emit } from "../lib/bus";
import { useShoppingList } from "../store/ShoppingListContext";
import { IconArrowRight, IconCheck, IconPlus } from "./icons";
import { Reveal, SectionHeading, SmartImage } from "./ui";

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const { isListed, toggleItem } = useShoppingList();
  const listed = isListed(cat.name);
  const count = itemsByCategory(cat.id).length;

  return (
    <Reveal delay={index * 70} className="h-full">
      <article className="group flex h-full flex-col border-2 border-ink bg-card shadow-hard-sm transition-all duration-200 hover:-translate-y-1.5 hover:shadow-hard">
        <div className={`h-2 ${cat.barClass}`} aria-hidden="true" />
        <div className="relative overflow-hidden border-b-2 border-ink">
          <SmartImage
            src={cat.image}
            alt={cat.imageAlt}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <span className="absolute right-3 top-3 rotate-3 border-2 border-ink bg-sun px-2 py-0.5 font-display text-sm tracking-wider text-ink shadow-hard-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-ink/60">
            <span className={`h-2.5 w-2.5 rounded-full ${cat.dotClass}`} aria-hidden="true" />
            {cat.short} · {count} {count === 1 ? "find" : "finds"} to ask about
          </p>
          <h3 className="font-display text-[22px] uppercase leading-tight tracking-wide text-ink">
            {cat.name}
          </h3>
          <p className="text-sm leading-relaxed text-ink/65">{cat.description}</p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            <a
              href="#browse"
              onClick={() => emit("pd:browse-category", { categoryId: cat.id })}
              className="group/link inline-flex items-center gap-1.5 text-[13px] font-black uppercase tracking-wider text-ink transition-colors hover:text-flame"
            >
              Explore Category
              <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={() => toggleItem(cat.name, cat.id)}
              aria-pressed={listed}
              aria-label={
                listed ? `Remove ${cat.name} from my shopping list` : `Add ${cat.name} to my shopping list`
              }
              className={`inline-flex items-center gap-1.5 border-2 border-ink px-2.5 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all active:translate-y-0.5 ${
                listed ? "bg-pine text-paper" : "bg-card text-ink hover:bg-sun"
              }`}
            >
              {listed ? <IconCheck className="h-3.5 w-3.5" /> : <IconPlus className="h-3.5 w-3.5" />}
              {listed ? "Listed" : "List"}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Categories() {
  return (
    <section id="categories" aria-labelledby="categories-title" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="categories-title"
            kicker="Shop by Category"
            title="What's on the floor"
            note="Six aisles of discount merchandise to explore. Stock rotates fast, so think of these as the kinds of finds you can browse — not guaranteed shelves."
          />
          <Reveal delay={150}>
            <p className="mb-1 max-w-[240px] border-l-4 border-flame pl-4 text-sm font-bold leading-snug text-ink/70">
              Tap a category to browse the finds shoppers ask about most.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
