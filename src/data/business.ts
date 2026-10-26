/**
 * Verified business information for Patron Discount.
 * Keep this file as the single source of truth for all contact details.
 */

export interface DayHours {
  /** Index matches Date.getDay(): 0 = Sunday … 6 = Saturday */
  day: string;
  openMin: number;
  closeMin: number;
  note?: string;
}

const at = (h: number, m = 0) => h * 60 + m;

export const business = {
  name: "Patron Discount",
  type: "Discount Store",
  addressLine: "7414 TX-359 E",
  addressCity: "Laredo, TX 78043",
  addressFull: "7414 TX-359 E, Laredo, TX 78043, United States",
  phone: "+1 956-441-8861",
  plusCode: "FJPH+58 Laredo, Texas, USA",
  mapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    "7414 TX-359 E, Laredo, TX 78043"
  )}`,
  mapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(
    "7414 TX-359 E, Laredo, TX 78043"
  )}&z=14&output=embed`,
};

/** Weekly opening hours, ordered Sunday → Saturday. */
export const weeklyHours: DayHours[] = [
  { day: "Sunday", openMin: at(10), closeMin: at(17) },
  { day: "Monday", openMin: at(10), closeMin: at(17) },
  { day: "Tuesday", openMin: at(10), closeMin: at(14), note: "Early close" },
  { day: "Wednesday", openMin: at(10), closeMin: at(17) },
  { day: "Thursday", openMin: at(10), closeMin: at(17) },
  { day: "Friday", openMin: at(10), closeMin: at(17) },
  { day: "Saturday", openMin: at(10), closeMin: at(17) },
];

export function fmtTime(min: number): string {
  const hr = Math.floor(min / 60);
  const mm = min % 60;
  const period = hr >= 12 ? "PM" : "AM";
  const display = hr % 12 === 0 ? 12 : hr % 12;
  return mm === 0 ? `${display}:00 ${period}` : `${display}:${String(mm).padStart(2, "0")} ${period}`;
}

export function hoursLabel(d: DayHours): string {
  return `${fmtTime(d.openMin)} – ${fmtTime(d.closeMin)}`;
}
