/**
 * Merchandise category definitions.
 * Copy is intentionally written as "what shoppers may explore" —
 * availability always varies in-store.
 */

export type CategoryId =
  | "electronics"
  | "clothing"
  | "toys"
  | "home"
  | "household"
  | "mixed";

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Tailwind classes for accent chips / dots (literal strings so the JIT picks them up). */
  barClass: string;
  dotClass: string;
  chipClass: string;
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    short: "Electronics",
    description: "Speakers, earbuds, chargers and everyday tech to dig through.",
    image:
      "https://images.pexels.com/photos/37933326/pexels-photo-37933326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "A colorful display of electronic gadgets and accessories on retail shelves",
    barClass: "bg-sky",
    dotClass: "bg-sky",
    chipClass: "bg-sky text-paper",
  },
  {
    id: "clothing",
    name: "Clothing & Apparel",
    short: "Clothing",
    description: "Everyday apparel for the whole family in assorted sizes and styles.",
    image:
      "https://images.pexels.com/photos/1488470/pexels-photo-1488470.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Colorful jackets and apparel hanging on a clothing rack in a store",
    barClass: "bg-berry",
    dotClass: "bg-berry",
    chipClass: "bg-berry text-paper",
  },
  {
    id: "toys",
    name: "Toys & Games",
    short: "Toys",
    description: "Board games, plush friends and building sets for every age.",
    image:
      "https://images.pexels.com/photos/35285848/pexels-photo-35285848.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Shelves stocked with colorful toys and games in a toy shop",
    barClass: "bg-tang",
    dotClass: "bg-tang",
    chipClass: "bg-tang text-paper",
  },
  {
    id: "home",
    name: "Home Goods",
    short: "Home Goods",
    description: "Cookware, bedding and décor touches for every room in the house.",
    image:
      "https://images.pexels.com/photos/34005916/pexels-photo-34005916.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Colorful non-stick pans with price tags on display in a kitchenware store",
    barClass: "bg-pine",
    dotClass: "bg-pine",
    chipClass: "bg-pine text-paper",
  },
  {
    id: "household",
    name: "Household Essentials",
    short: "Household",
    description: "The everyday basics that keep a home running smoothly.",
    image:
      "https://images.pexels.com/photos/5217889/pexels-photo-5217889.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Rows of assorted household cleaning products in colorful bottles",
    barClass: "bg-leaf",
    dotClass: "bg-leaf",
    chipClass: "bg-leaf text-paper",
  },
  {
    id: "mixed",
    name: "Mixed Merchandise & Bin Finds",
    short: "Bin Finds",
    description: "Overstock, closeouts and surprise bins — dig in and see what's there.",
    image:
      "https://images.pexels.com/photos/14853183/pexels-photo-14853183.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "A market table of assorted bargain merchandise with bold sale tags",
    barClass: "bg-grape",
    dotClass: "bg-grape",
    chipClass: "bg-grape text-paper",
  },
];

export const categoryById = (id: string): Category | undefined =>
  categories.find((c) => c.id === id);
