import { fmtTime, weeklyHours } from "../data/business";

export interface OpenStatus {
  isOpen: boolean;
  label: string;
  todayIndex: number;
}

/** Computes whether the store is open right now, using the published weekly hours. */
export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const todayIndex = now.getDay();
  const today = weeklyHours[todayIndex];
  const mins = now.getHours() * 60 + now.getMinutes();

  if (mins >= today.openMin && mins < today.closeMin) {
    return {
      isOpen: true,
      label: `Open now · closes ${fmtTime(today.closeMin)}`,
      todayIndex,
    };
  }
  if (mins < today.openMin) {
    return {
      isOpen: false,
      label: `Closed · opens ${fmtTime(today.openMin)} today`,
      todayIndex,
    };
  }
  const tomorrow = weeklyHours[(todayIndex + 1) % 7];
  return {
    isOpen: false,
    label: `Closed · opens ${fmtTime(tomorrow.openMin)} tomorrow`,
    todayIndex,
  };
}
