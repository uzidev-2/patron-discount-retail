import { useEffect, useMemo, useState } from "react";
import { categories, categoryById } from "../data/categories";
import { merchandise, type MerchandiseItem } from "../data/merchandise";
import { emit, on } from "../lib/bus";
import { useShoppingList } from "../store/ShoppingListContext";
import { cn } from "../utils/cn";
import { IconCheck, IconInfo, IconPlus, IconSearch, IconSort, IconX } from "./icons";
import { Reveal, SectionHeading, SmartImage } from "./ui";

type SortKey = "featured" | "name-asc" | "name-desc";

const POPULAR_SEARCHES = ["speakers", "jeans", "toys", "cookware", "bins"];

function askAboutItem(item: MerchandiseItem) {
  emit("pd:prefill-enquiry", {
    categoryId: item.categoryId,
    text: `${item.name} — is it in the store right now, and what's the current price?`,
  });
}

function ItemCard({ item, index }: { item: MerchandiseItem; index: number }) {
  const { isListed, toggleItem } = useShoppingList();
  const listed = isListed(item.name);
  const cat = categoryById(item.categoryId);

  return (
    <Reveal delay={(index % 4) * 60} className="h-full">
      <article className="group flex h-full flex-col border-2 border-ink bg-card shadow-hard-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-hard">
        <div className="relative overflow-hidden border-b-2 border-ink">
          <SmartImage
            src={item.image}
            alt={item.imageAlt}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          {cat ? (
            <span
              className={cn(
                "absolute left-3 top-3 inline-flex items-center gap-1.5 border-2 border-ink px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em]",
                cat.chipClass
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-paper" aria-hidden="true" />
              {cat.short}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-[17px] font-extrabold leading-snug text-ink">{item.name}</h3>
          <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink/65">{item.blurb}</p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => askAboutItem(item)}
              className="flex-1 border-2 border-ink bg-sun px-3 py-2 text-[11px] font-black uppercase tracking-wider text-ink shadow-hard-xs transition-all hover:-translate-y-0.5 hover:shadow-hard-sm active:translate-y-0.5 active:shadow-none"
            >
              Ask about it
            </button>
            <button
              type="button"
              onClick={() => toggleItem(item.name, item.categoryId)}
              aria-pressed={listed}
              aria-label={
                listed ? `Remove ${item.name} from my shopping list` : `Add ${item.name} to my shopping list`
              }
              title={listed ? "On your list" : "Add to my list"}
              className={cn(
                "grid w-11 place-items-center border-2 border-ink transition-all active:translate-y-0.5",
                listed ? "bg-pine text-paper" : "bg-card text-ink hover:bg-sun"
              )}
            >
              {listed ? <IconCheck className="h-4 w-4" /> : <IconPlus className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Browse() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  // Category cards elsewhere on the page can drive this filter.
  useEffect(
    () =>
      on("pd:browse-category", ({ categoryId }) => {
        setCategory(categoryId);
        setQuery("");
        setSort("featured");
      }),
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = merchandise.filter((item) => {
      const inCategory = category === "all" || item.categoryId === category;
      if (!inCategory) return false;
      if (!q) return true;
      const haystack = [item.name, item.blurb, ...item.keywords].join(" ").toLowerCase();
      return haystack.includes(q);
    });
    if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [query, category, sort]);

  const filtersActive = query.trim() !== "" || category !== "all" || sort !== "featured";

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("featured");
  };

  return (
    <section
      id="browse"
      aria-labelledby="browse-title"
      className="scroll-mt-20 border-y-2 border-ink bg-paper-deep py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="browse-title"
          kicker="Browse the Aisles"
          title="Find your next find"
          note="Search the kinds of items shoppers ask about most. Merchandise rotates fast — availability and pricing are confirmed in-store, not online."
        />

        {/* Controls */}
        <Reveal delay={100}>
          <div className="mt-10 border-2 border-ink bg-card p-4 shadow-hard-sm md:p-5">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40" />
                <label htmlFor="find-search" className="sr-only">
                  Search merchandise
                </label>
                <input
                  id="find-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search finds — try “speakers” or “jeans”"
                  className="w-full border-2 border-ink bg-paper py-3.5 pl-12 pr-10 text-sm font-semibold placeholder:text-ink/40 focus:bg-card"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center border-2 border-ink bg-sun transition active:translate-y-[-45%]"
                  >
                    <IconX className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>
              <div className="relative lg:w-56">
                <IconSort className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
                <label htmlFor="find-sort" className="sr-only">
                  Sort results
                </label>
                <select
                  id="find-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="w-full appearance-none border-2 border-ink bg-paper py-3.5 pl-10 pr-8 text-sm font-bold"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="name-asc">Sort: Name A–Z</option>
                  <option value="name-desc">Sort: Name Z–A</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
              <button
                type="button"
                onClick={() => setCategory("all")}
                aria-pressed={category === "all"}
                className={cn(
                  "rounded-full border-2 px-4 py-1.5 text-[12px] font-black uppercase tracking-wider transition-all",
                  category === "all"
                    ? "border-ink bg-ink text-sun"
                    : "border-ink/25 bg-paper text-ink/70 hover:border-ink hover:text-ink"
                )}
              >
                All Finds
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  aria-pressed={category === cat.id}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-1.5 text-[12px] font-black uppercase tracking-wider transition-all",
                    category === cat.id
                      ? "border-ink bg-ink text-sun"
                      : "border-ink/25 bg-paper text-ink/70 hover:border-ink hover:text-ink"
                  )}
                >
                  <span className={`h-2 w-2 rounded-full ${cat.dotClass}`} aria-hidden="true" />
                  {cat.short}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-ink/15 pt-4">
              <p className="text-[13px] font-bold text-ink/60" aria-live="polite">
                Showing <span className="text-ink">{results.length}</span> of {merchandise.length} finds
                {category !== "all" ? (
                  <>
                    {" "}in <span className="text-ink">{categoryById(category)?.name}</span>
                  </>
                ) : null}
                {query.trim() ? (
                  <>
                    {" "}for “<span className="text-ink">{query.trim()}</span>”
                  </>
                ) : null}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="hidden text-[12px] font-bold uppercase tracking-wider text-ink/45 sm:inline">
                  Popular:
                </span>
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="text-[12px] font-bold text-flame underline decoration-2 underline-offset-2 transition-colors hover:text-flame-deep"
                  >
                    {term}
                  </button>
                ))}
                {filtersActive ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="ml-1 inline-flex items-center gap-1 border-2 border-ink bg-flame px-3 py-1 text-[11px] font-black uppercase tracking-wider text-paper shadow-hard-xs transition active:translate-y-0.5 active:shadow-none"
                  >
                    <IconX className="h-3 w-3" />
                    Clear filters
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Results */}
        {results.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-8 border-2 border-dashed border-ink/40 bg-card px-6 py-14 text-center">
            <span className="mx-auto grid h-16 w-16 -rotate-6 place-items-center border-2 border-ink bg-sun shadow-hard-xs">
              <IconSearch className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-display text-3xl uppercase tracking-wide">
              No finds for “{query.trim()}”
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/65">
              The racks change all the time, so it may still be in the store. Ask the team about it —
              they'll check the floor for you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  emit("pd:prefill-enquiry", {
                    text: `I'm looking for: ${query.trim()}. Is it available, and what does it cost?`,
                  })
                }
                className="border-2 border-ink bg-sun px-5 py-3 text-[12px] font-black uppercase tracking-wider shadow-hard-xs transition hover:-translate-y-0.5 hover:shadow-hard-sm active:translate-y-0.5 active:shadow-none"
              >
                Ask about “{query.trim()}”
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="border-2 border-ink bg-card px-5 py-3 text-[12px] font-black uppercase tracking-wider transition hover:bg-ink hover:text-paper"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}

        <p className="mt-8 flex items-start gap-2.5 text-[13px] font-semibold leading-relaxed text-ink/55">
          <IconInfo className="mt-0.5 h-4 w-4 shrink-0" />
          These are examples of merchandise shoppers look for — not live inventory. Prices and
          availability are always confirmed at the store.
        </p>
      </div>
    </section>
  );
}
