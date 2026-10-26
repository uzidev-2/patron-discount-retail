/**
 * Promotional data — the ONLY place verified offers are defined.
 * When the store confirms a promotion, add it to `verifiedDeals`
 * and it will render automatically in the "Discover the Deals" section.
 * Nothing here should be advertised unless the business has confirmed it.
 */

export interface VerifiedDeal {
  id: string;
  title: string;
  detail: string;
  /** e.g. "Every Saturday", "This week only" */
  when: string;
  badge?: string;
}

/** Confirmed offers. Empty until the store verifies its current pricing schedule. */
export const verifiedDeals: VerifiedDeal[] = [];

export interface ShopperReport {
  id: string;
  claim: string;
  note: string;
}

/**
 * Word-of-mouth pricing reports from local shoppers.
 * These are explicitly UNVERIFIED and are displayed as such —
 * they are never presented as current guaranteed offers.
 */
export const shopperReports: ShopperReport[] = [
  {
    id: "weekend-five",
    claim: "$5 Weekend Bargain Days",
    note: "Local shoppers have talked about $5 Saturday and Sunday bargain days at the store. Pricing varies by day and this has not been confirmed — check in person before planning your trip.",
  },
];
