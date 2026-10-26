/**
 * Tiny typed event bus built on CustomEvent.
 * Keeps sections decoupled (e.g. a product card can prefill the enquiry form
 * without the two components knowing about each other).
 */

export interface PrefillEnquiryDetail {
  categoryId?: string;
  text?: string;
  includeList?: boolean;
}

export interface BrowseCategoryDetail {
  categoryId: string;
}

interface EventMap {
  "pd:prefill-enquiry": PrefillEnquiryDetail;
  "pd:browse-category": BrowseCategoryDetail;
}

export function emit<K extends keyof EventMap>(event: K, detail: EventMap[K]): void {
  window.dispatchEvent(new CustomEvent(event, { detail }));
}

export function on<K extends keyof EventMap>(
  event: K,
  handler: (detail: EventMap[K]) => void
): () => void {
  const listener = (e: Event) => handler((e as CustomEvent<EventMap[K]>).detail);
  window.addEventListener(event, listener);
  return () => window.removeEventListener(event, listener);
}
