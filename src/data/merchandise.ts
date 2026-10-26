import type { CategoryId } from "./categories";

/**
 * Merchandise "finds" — the kinds of items shoppers commonly ask about.
 * These are NOT live inventory records: no prices, stock counts or brands
 * are claimed. Availability and pricing are always confirmed in-store.
 */

export interface MerchandiseItem {
  id: string;
  name: string;
  categoryId: CategoryId;
  blurb: string;
  keywords: string[];
  image: string;
  imageAlt: string;
}

export const merchandise: MerchandiseItem[] = [
  {
    id: "bluetooth-speakers",
    name: "Bluetooth Speakers",
    categoryId: "electronics",
    blurb: "Portable speakers in assorted sizes and colors — a frequent find on the electronics racks.",
    keywords: ["speaker", "audio", "music", "portable", "bluetooth"],
    image:
      "https://images.pexels.com/photos/880874/pexels-photo-880874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "A portable Bluetooth speaker photographed up close",
  },
  {
    id: "wireless-earbuds",
    name: "Wireless Earbuds",
    categoryId: "electronics",
    blurb: "Earbuds and charging cases turn up regularly — ask what's in the case today.",
    keywords: ["earbuds", "headphones", "audio", "wireless"],
    image:
      "https://images.pexels.com/photos/19321719/pexels-photo-19321719.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Wireless earbud with its charging case on a clean studio background",
  },
  {
    id: "smart-watches",
    name: "Smart Watches & Bands",
    categoryId: "electronics",
    blurb: "Fitness trackers, smart watches and spare bands for everyday wear.",
    keywords: ["watch", "smartwatch", "fitness", "tracker", "band"],
    image:
      "https://images.pexels.com/photos/374619/pexels-photo-374619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "A person checking the time on a smartwatch outdoors",
  },
  {
    id: "chargers-cables",
    name: "Chargers, Cables & Cases",
    categoryId: "electronics",
    blurb: "Phone chargers, cables, power banks and cases for most popular phones.",
    keywords: ["charger", "cable", "usb", "power bank", "phone case"],
    image:
      "https://images.pexels.com/photos/4072683/pexels-photo-4072683.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "A power bank with USB charging cables on a plain background",
  },
  {
    id: "kids-sneakers",
    name: "Kids' Sneakers",
    categoryId: "clothing",
    blurb: "Assorted kids' sizes and styles — sizes move fast, so ask what's left in yours.",
    keywords: ["shoes", "sneakers", "kids", "footwear"],
    image:
      "https://images.pexels.com/photos/4987534/pexels-photo-4987534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "A pair of vivid blue kids' boots with orange laces",
  },
  {
    id: "denim-jeans",
    name: "Denim & Jeans",
    categoryId: "clothing",
    blurb: "Jeans and denim staples for men and women in assorted fits and washes.",
    keywords: ["jeans", "denim", "pants", "apparel"],
    image:
      "https://images.pexels.com/photos/10133275/pexels-photo-10133275.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Neatly stacked folded denim fabric in varying blue tones",
  },
  {
    id: "graphic-tees",
    name: "Graphic Tees & Tops",
    categoryId: "clothing",
    blurb: "Everyday graphic tees and casual tops in assorted colors and sizes.",
    keywords: ["t-shirt", "tee", "shirt", "top", "apparel"],
    image:
      "https://images.pexels.com/photos/4049148/pexels-photo-4049148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "A neatly stacked pile of folded clothing in various colors",
  },
  {
    id: "board-games",
    name: "Board Games & Puzzles",
    categoryId: "toys",
    blurb: "Family board games, card games and puzzles for the next game night.",
    keywords: ["board game", "puzzle", "cards", "family", "game"],
    image:
      "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Board game pieces and dice arranged on a game board",
  },
  {
    id: "plush-toys",
    name: "Plush & Soft Toys",
    categoryId: "toys",
    blurb: "Plush friends in all sizes — a bin favorite for younger shoppers.",
    keywords: ["plush", "stuffed", "teddy", "bear", "soft toy"],
    image:
      "https://images.pexels.com/photos/15130371/pexels-photo-15130371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "A brown teddy bear wearing a red checkered scarf",
  },
  {
    id: "building-sets",
    name: "Building Sets & Blocks",
    categoryId: "toys",
    blurb: "Brick building sets and creative kits for builders of every age.",
    keywords: ["blocks", "bricks", "building", "lego", "construction"],
    image:
      "https://images.pexels.com/photos/7123083/pexels-photo-7123083.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Pink and white toy building bricks stacked together",
  },
  {
    id: "cookware",
    name: "Cookware & Bakeware",
    categoryId: "home",
    blurb: "Pots, pans and baking essentials to refresh the kitchen without the big price.",
    keywords: ["pots", "pans", "cookware", "kitchen", "baking"],
    image:
      "https://images.pexels.com/photos/37252631/pexels-photo-37252631.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Colorful pots and pans stacked on display in a shop window",
  },
  {
    id: "bedding",
    name: "Bedding & Pillows",
    categoryId: "home",
    blurb: "Sheet sets, comforters, towels and pillows to refresh a bedroom.",
    keywords: ["bedding", "sheets", "pillow", "comforter", "towels", "linens"],
    image:
      "https://images.pexels.com/photos/39427053/pexels-photo-39427053.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Neatly stacked folded textiles and towels in neutral tones",
  },
  {
    id: "storage-organization",
    name: "Storage & Organization",
    categoryId: "home",
    blurb: "Bins, baskets and containers for closets, pantries and garages.",
    keywords: ["storage", "bins", "containers", "organization", "baskets"],
    image:
      "https://images.pexels.com/photos/4096909/pexels-photo-4096909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "A variety of plastic storage containers stacked together",
  },
  {
    id: "cleaning-supplies",
    name: "Cleaning Supplies",
    categoryId: "household",
    blurb: "Everyday cleaning essentials, sprays, tools and refills for the whole home.",
    keywords: ["cleaning", "spray", "supplies", "detergent"],
    image:
      "https://images.pexels.com/photos/4440564/pexels-photo-4440564.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "A blue cleaning spray bottle on a white background",
  },
  {
    id: "kitchen-utensils",
    name: "Kitchen Utensils & Gadgets",
    categoryId: "household",
    blurb: "Utensils, gadgets and small tools that make cooking easier.",
    keywords: ["utensils", "kitchen", "gadgets", "cooking", "tools"],
    image:
      "https://images.pexels.com/photos/10117711/pexels-photo-10117711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Kitchen utensils arranged on a wooden board",
  },
  {
    id: "laundry-care",
    name: "Laundry & Home Care",
    categoryId: "household",
    blurb: "Laundry-day essentials and everyday home care items at discount prices.",
    keywords: ["laundry", "detergent", "washing", "home care"],
    image:
      "https://images.pexels.com/photos/5217896/pexels-photo-5217896.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Assorted multicolored bottles of household detergent",
  },
  {
    id: "bin-finds",
    name: "Surprise Bin Finds",
    categoryId: "mixed",
    blurb: "The classic dig — assorted overstock and closeouts that change every visit.",
    keywords: ["bins", "surprise", "assorted", "overstock", "closeout", "bargain"],
    image:
      "https://images.pexels.com/photos/34623843/pexels-photo-34623843.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Colorful clothing bins full of assorted items at a sale",
  },
  {
    id: "seasonal-closeouts",
    name: "Seasonal Closeouts",
    categoryId: "mixed",
    blurb: "Seasonal décor and closeout goods that appear around the holidays — while they last.",
    keywords: ["seasonal", "holiday", "decor", "closeout", "christmas", "decorations"],
    image:
      "https://images.pexels.com/photos/35045992/pexels-photo-35045992.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "A festive storefront display with baskets of wrapped gifts and decorations",
  },
];

export const itemsByCategory = (categoryId: string) =>
  merchandise.filter((m) => m.categoryId === categoryId);
