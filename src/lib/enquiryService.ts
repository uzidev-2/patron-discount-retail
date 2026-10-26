/**
 * Enquiry submission handling.
 *
 * The UI calls `submitEnquiry` and branches on `receipt.delivered`, so the
 * confirmation screen always reflects what actually happened:
 *
 * - When a hosted submission endpoint is configured (SUBMISSION_ENDPOINT),
 *   the enquiry is delivered to the business and `delivered` is true.
 * - Until a destination is configured, the enquiry is recorded for the
 *   customer with a unique reference and `delivered` is false, so the UI
 *   presents an honest, actionable next step (share the reference with the
 *   team in-store or by phone) instead of claiming store receipt.
 *
 * Reference convention: enquiries use `PD-ENQ-XXXXXX`. Future order
 * references use a different prefix so the two never collide.
 */

export interface EnquiryDraft {
  fullName: string;
  phone: string;
  email: string;
  category: string;
  itemDescription: string;
  additionalDetails: string;
  listItems: string[];
}

export interface EnquiryReceipt {
  reference: string;
  savedAt: string;
  /** True only when the enquiry was actually delivered to the business. */
  delivered: boolean;
}

/**
 * Hosted submission endpoint for the business (e.g. a form or CRM API).
 * Leave as null until a real destination is configured. Never hardcode
 * credentials in frontend code — keep any keys on the server side.
 */
const SUBMISSION_ENDPOINT: string | null = null;

const REF_KEY = "patron-discount:enquiries";

function makeReference(prefix: string): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  let out = "";
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return `${prefix}-${out}`;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function recordLocally(draft: EnquiryDraft, receipt: EnquiryReceipt): void {
  try {
    const raw = localStorage.getItem(REF_KEY);
    const list: unknown[] = raw ? (JSON.parse(raw) as unknown[]) : [];
    list.push({ ...draft, ...receipt });
    localStorage.setItem(REF_KEY, JSON.stringify(list.slice(-10)));
  } catch {
    // Storage unavailable (private mode, etc.) — the receipt is still returned.
  }
}

export async function submitEnquiry(draft: EnquiryDraft): Promise<EnquiryReceipt> {
  const reference = makeReference("PD-ENQ");
  const savedAt = new Date().toISOString();

  if (SUBMISSION_ENDPOINT) {
    const response = await fetch(SUBMISSION_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...draft, reference, savedAt }),
    });
    if (!response.ok) {
      throw new Error(`Enquiry delivery failed with status ${response.status}`);
    }
    const receipt: EnquiryReceipt = { reference, savedAt, delivered: true };
    recordLocally(draft, receipt);
    return receipt;
  }

  // Brief processing pause so the UI's loading state is perceptible.
  await delay(900);
  const receipt: EnquiryReceipt = { reference, savedAt, delivered: false };
  recordLocally(draft, receipt);
  return receipt;
}
