import { useEffect, useRef, useState } from "react";
import { categoryById } from "../data/categories";
import { business } from "../data/business";
import { emit } from "../lib/bus";
import { copyText } from "../lib/clipboard";
import { useShoppingList } from "../store/ShoppingListContext";
import { cn } from "../utils/cn";
import { IconBasket, IconCheck, IconCopy, IconTag, IconTrash, IconX } from "./icons";

function buildListText(names: { name: string; categoryId: string }[]): string {
  const lines = names.map(
    (i) => `• ${i.name} (${categoryById(i.categoryId)?.short ?? "General"})`
  );
  return [
    `${business.name} — My Shopping List`,
    ...lines,
    "",
    `Ask about these in-store: ${business.addressFull}`,
    `Phone: ${business.phone}`,
  ].join("\n");
}

/* ------------------------------ Slide-over panel ------------------------------ */

export function ShoppingListPanel() {
  const { items, isPanelOpen, closePanel, removeItem, clearList, count } = useShoppingList();
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isPanelOpen) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isPanelOpen, closePanel]);

  if (!isPanelOpen) return null;

  const handleCopy = async () => {
    const ok = await copyText(buildListText(items));
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const sendToEnquiry = () => {
    closePanel();
    emit("pd:prefill-enquiry", { includeList: true });
  };

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close shopping list"
        onClick={closePanel}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/60"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="My shopping list"
        className="slide-in-right absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l-2 border-ink bg-paper shadow-[-8px_0_0_rgba(11,17,32,0.25)]"
      >
        <div className="flex items-center justify-between gap-4 border-b-2 border-ink bg-sun px-5 py-4">
          <h2 className="flex items-center gap-2.5 font-display text-2xl uppercase tracking-wide">
            <IconBasket className="h-6 w-6" />
            My Shopping List
            <span className="grid h-7 min-w-7 place-items-center rounded-full border-2 border-ink bg-flame px-1 text-xs font-black text-paper">
              {count}
            </span>
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closePanel}
            aria-label="Close shopping list"
            className="grid h-10 w-10 place-items-center border-2 border-ink bg-card shadow-hard-xs transition active:translate-y-0.5 active:shadow-none"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-20 w-20 -rotate-6 place-items-center border-2 border-dashed border-ink/40 bg-card">
              <IconBasket className="h-9 w-9 text-ink/35" />
            </span>
            <div>
              <p className="font-display text-2xl uppercase tracking-wide">Your list is empty</p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-ink/60">
                Tap “List” on any category or find to keep track of what you want to ask about at
                the store.
              </p>
            </div>
            <a
              href="#browse"
              onClick={closePanel}
              className="mt-2 border-2 border-ink bg-sun px-5 py-3 text-[12px] font-black uppercase tracking-wider shadow-hard-xs transition hover:-translate-y-0.5 hover:shadow-hard-sm"
            >
              Browse the aisles
            </a>
          </div>
        ) : (
          <>
            <ul className="nice-scroll flex-1 space-y-3 overflow-y-auto p-5">
              {items.map((item) => (
                <li
                  key={item.key}
                  className="flex items-center justify-between gap-3 border-2 border-ink bg-card p-3.5 shadow-hard-xs"
                >
                  <div className="min-w-0">
                    <p className="truncate font-extrabold leading-snug">{item.name}</p>
                    <p className="mt-0.5 text-[11px] font-black uppercase tracking-[0.14em] text-ink/50">
                      {categoryById(item.categoryId)?.short ?? "General"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    aria-label={`Remove ${item.name} from my shopping list`}
                    className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink bg-paper transition hover:bg-flame hover:text-paper active:translate-y-0.5"
                  >
                    <IconX className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t-2 border-ink bg-card p-5">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className={cn(
                    "inline-flex flex-1 items-center justify-center gap-2 border-2 border-ink px-4 py-3 text-[12px] font-black uppercase tracking-wider shadow-hard-xs transition-all active:translate-y-0.5 active:shadow-none",
                    copied ? "bg-pine text-paper" : "bg-paper hover:bg-sun"
                  )}
                >
                  {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy list"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearList();
                  }}
                  className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-4 py-3 text-[12px] font-black uppercase tracking-wider transition hover:bg-flame hover:text-paper active:translate-y-0.5"
                >
                  <IconTrash className="h-4 w-4" />
                  Clear
                </button>
              </div>
              <button
                type="button"
                onClick={sendToEnquiry}
                className="flex w-full items-center justify-center gap-2.5 border-2 border-ink bg-flame px-4 py-3.5 text-[13px] font-black uppercase tracking-wider text-paper shadow-hard-sm transition-all hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0.5 active:shadow-none"
              >
                <IconTag className="h-4 w-4" />
                Include in item enquiry
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ------------------------------ Floating button ------------------------------ */

export function FloatingListButton() {
  const { count, openPanel, isPanelOpen } = useShoppingList();

  if (isPanelOpen) return null;

  return (
    <button
      type="button"
      onClick={openPanel}
      aria-label={`Open my shopping list (${count} ${count === 1 ? "item" : "items"})`}
      className="group fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2.5 rounded-full border-2 border-ink bg-sun pl-5 pr-4 font-black uppercase tracking-wide shadow-hard-sm transition-all hover:-translate-y-1 hover:shadow-hard active:translate-y-0.5 active:shadow-none"
    >
      <IconBasket className="h-5 w-5 transition-transform group-hover:-rotate-12" />
      <span className="hidden text-[13px] sm:inline">My List</span>
      <span
        key={count}
        className={cn(
          "pop-in grid h-7 min-w-7 place-items-center rounded-full border-2 border-ink px-1 text-xs font-black",
          count > 0 ? "bg-flame text-paper" : "bg-card text-ink/60"
        )}
      >
        {count}
      </span>
    </button>
  );
}
