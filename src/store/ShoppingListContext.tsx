import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CategoryId } from "../data/categories";

export interface ListItem {
  key: string;
  name: string;
  categoryId: CategoryId | "store";
}

interface ShoppingListContextValue {
  items: ListItem[];
  count: number;
  isListed: (name: string) => boolean;
  /** Adds the item, or removes it if it's already on the list. */
  toggleItem: (name: string, categoryId: ListItem["categoryId"]) => void;
  removeItem: (key: string) => void;
  clearList: () => void;
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

const ShoppingListContext = createContext<ShoppingListContextValue | null>(null);

const STORAGE_KEY = "patron-discount:shopping-list";

function loadInitial(): ListItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ListItem[];
    return Array.isArray(parsed) ? parsed.filter((i) => i && typeof i.name === "string") : [];
  } catch {
    return [];
  }
}

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ListItem[]>(loadInitial);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable — the list still works for this session.
    }
  }, [items]);

  const isListed = useCallback(
    (name: string) => items.some((i) => i.key === name),
    [items]
  );

  const toggleItem = useCallback((name: string, categoryId: ListItem["categoryId"]) => {
    setItems((prev) =>
      prev.some((i) => i.key === name)
        ? prev.filter((i) => i.key !== name)
        : [...prev, { key: name, name, categoryId }]
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearList = useCallback(() => setItems([]), []);
  const openPanel = useCallback(() => setIsPanelOpen(true), []);
  const closePanel = useCallback(() => setIsPanelOpen(false), []);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      isListed,
      toggleItem,
      removeItem,
      clearList,
      isPanelOpen,
      openPanel,
      closePanel,
    }),
    [items, isListed, toggleItem, removeItem, clearList, isPanelOpen, openPanel, closePanel]
  );

  return <ShoppingListContext.Provider value={value}>{children}</ShoppingListContext.Provider>;
}

export function useShoppingList(): ShoppingListContextValue {
  const ctx = useContext(ShoppingListContext);
  if (!ctx) throw new Error("useShoppingList must be used within ShoppingListProvider");
  return ctx;
}
