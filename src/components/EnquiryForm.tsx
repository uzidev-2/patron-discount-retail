import { useEffect, useRef, useState, type FormEvent } from "react";
import { categories } from "../data/categories";
import { on } from "../lib/bus";
import { submitEnquiry, type EnquiryReceipt } from "../lib/enquiryService";
import { emailOptional, minChars, phoneValid } from "../lib/validation";
import { useShoppingList } from "../store/ShoppingListContext";
import { cn } from "../utils/cn";
import { IconAlert, IconBurst, IconCheck, IconInfo, IconTag, IconX } from "./icons";

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  category: string;
  itemDescription: string;
  additionalDetails: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  fullName: "",
  phone: "",
  email: "",
  category: "",
  itemDescription: "",
  additionalDetails: "",
};

const FIELD_ORDER: (keyof FormState)[] = [
  "fullName",
  "phone",
  "email",
  "category",
  "itemDescription",
];

const inputCls = (hasError: boolean) =>
  cn(
    "w-full border-2 bg-paper px-4 py-3 text-sm font-semibold text-ink caret-flame placeholder:text-ink/45 transition-colors focus:bg-card",
    hasError ? "border-flame bg-flame/5" : "border-ink/30 focus:border-ink"
  );

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[13px] font-bold text-flame-deep">
      <IconAlert className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

const labelCls = "mb-1.5 block text-[11px] font-black uppercase tracking-[0.16em] text-ink";

export function EnquiryForm() {
  const { items } = useShoppingList();
  const rootRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [chips, setChips] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<EnquiryReceipt | null>(null);

  // Other sections can prefill the form (item cards, search empty state, shopping list).
  useEffect(
    () =>
      on("pd:prefill-enquiry", (detail) => {
        setReceipt(null);
        setState((prev) => ({
          ...prev,
          category: detail.categoryId ?? prev.category,
          itemDescription:
            detail.text && prev.itemDescription.trim() === "" ? detail.text : prev.itemDescription,
        }));
        if (detail.includeList) {
          setChips((prev) => Array.from(new Set([...prev, ...items.map((i) => i.name)])));
        }
        rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }),
    [items]
  );

  const setField = (field: keyof FormState, value: string) => {
    setState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = (): Errors => {
    const errs: Errors = {};
    const nameErr = minChars(state.fullName, 2, "Full name");
    if (nameErr) errs.fullName = nameErr;
    const phoneErr = phoneValid(state.phone);
    if (phoneErr) errs.phone = phoneErr;
    const emailErr = emailOptional(state.email);
    if (emailErr) errs.email = emailErr;
    if (!state.category) errs.category = "Select a product category.";
    const itemErr = minChars(state.itemDescription, 10, "Item description");
    if (itemErr) errs.itemDescription = itemErr;
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const errs = validate();
    setErrors(errs);
    const firstError = FIELD_ORDER.find((f) => errs[f]);
    if (firstError) {
      document.getElementById(`enq-${firstError}`)?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitEnquiry({ ...state, listItems: chips });
      setReceipt(result);
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setSubmitError("Something went wrong while preparing your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const startNew = () => {
    setState(EMPTY);
    setErrors({});
    setChips([]);
    setReceipt(null);
    setSubmitError(null);
  };

  /* ------------------------------ Confirmation ------------------------------ */

  if (receipt) {
    return (
      <div
        ref={rootRef}
        className="scroll-mt-24 border-2 border-ink bg-card p-6 shadow-hard-paper md:p-8"
        aria-live="polite"
      >
        <div className="flex flex-col items-center text-center">
          <span className="relative grid h-20 w-20 place-items-center">
            <IconBurst className="absolute inset-0 h-full w-full -rotate-12 text-pine" />
            <IconCheck className="relative h-9 w-9 text-paper" />
          </span>
          <h3 className="mt-5 font-display text-4xl uppercase leading-tight tracking-wide text-ink">
            Thank You for Your Enquiry!
          </h3>
          <p className="mt-3 max-w-md text-[15px] font-semibold leading-relaxed text-ink/75">
            We’ve received your enquiry details. Our team will review your request and contact you
            regarding product availability and pricing.
          </p>
        </div>

        <div className="mx-auto mt-7 max-w-sm border-2 border-dashed border-ink bg-paper px-4 py-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/60">
            Your reference
          </p>
          <p className="mt-1 font-display text-4xl tracking-widest text-ink">{receipt.reference}</p>
          <p className="mt-1.5 text-[12px] font-bold text-ink/60">
            Please keep this reference number for your records.
          </p>
        </div>

        <button
          type="button"
          onClick={startNew}
          className="mx-auto mt-8 flex w-full items-center justify-center gap-2.5 border-2 border-ink bg-sun px-10 py-4 text-sm font-black uppercase tracking-wider shadow-hard-sm transition-all hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0.5 active:shadow-none sm:w-auto"
        >
          <IconCheck className="h-4 w-4" />
          Done
        </button>
      </div>
    );
  }

  /* --------------------------------- Form --------------------------------- */

  return (
    <div ref={rootRef} className="scroll-mt-24 border-2 border-ink bg-card p-6 shadow-hard-paper md:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 -rotate-6 place-items-center border-2 border-ink bg-sun shadow-hard-xs">
          <IconTag className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-3xl uppercase leading-none tracking-wide">
            Ask About an Item
          </h3>
          <p className="mt-1.5 text-[13px] font-semibold text-ink/75">
            Looking for something specific? Tell us what you're after and we'll get back to you
            about availability and pricing.
          </p>
        </div>
      </div>

      {chips.length > 0 ? (
        <div className="mt-5 border-2 border-dashed border-ink/40 bg-paper p-3.5">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-ink/70">
            From your shopping list — included with this enquiry
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip}>
                <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-sun py-1 pl-2.5 pr-1.5 text-[12px] font-bold">
                  {chip}
                  <button
                    type="button"
                    onClick={() => setChips((prev) => prev.filter((c) => c !== chip))}
                    aria-label={`Remove ${chip} from this enquiry`}
                    className="grid h-5 w-5 place-items-center border border-ink/40 bg-card transition hover:bg-flame hover:text-paper"
                  >
                    <IconX className="h-3 w-3" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="enq-fullName" className={labelCls}>
              Full Name *
            </label>
            <input
              id="enq-fullName"
              type="text"
              autoComplete="name"
              value={state.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              placeholder="Enter your full name"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "err-fullName" : undefined}
              className={inputCls(Boolean(errors.fullName))}
            />
            <FieldError id="err-fullName" message={errors.fullName} />
          </div>
          <div>
            <label htmlFor="enq-phone" className={labelCls}>
              Phone Number *
            </label>
            <input
              id="enq-phone"
              type="tel"
              autoComplete="tel"
              value={state.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="Enter your phone number"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "err-phone" : undefined}
              className={inputCls(Boolean(errors.phone))}
            />
            <FieldError id="err-phone" message={errors.phone} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="enq-email" className={labelCls}>
              Email Address (optional)
            </label>
            <input
              id="enq-email"
              type="email"
              autoComplete="email"
              value={state.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="Enter your email address (optional)"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "err-email" : undefined}
              className={inputCls(Boolean(errors.email))}
            />
            <FieldError id="err-email" message={errors.email} />
          </div>
          <div>
            <label htmlFor="enq-category" className={labelCls}>
              Product Category *
            </label>
            <select
              id="enq-category"
              value={state.category}
              onChange={(e) => setField("category", e.target.value)}
              aria-invalid={Boolean(errors.category)}
              aria-describedby={errors.category ? "err-category" : undefined}
              className={cn(inputCls(Boolean(errors.category)), "appearance-none", !state.category && "text-ink/55")}
            >
              <option value="" disabled className="bg-paper text-ink/60">
                Select a product category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-paper text-ink">
                  {cat.name}
                </option>
              ))}
              <option value="other" className="bg-paper text-ink">
                Something else / not sure
              </option>
            </select>
            <FieldError id="err-category" message={errors.category} />
          </div>
        </div>

        <div>
          <label htmlFor="enq-itemDescription" className={labelCls}>
            Item Description *
          </label>
          <textarea
            id="enq-itemDescription"
            rows={3}
            value={state.itemDescription}
            onChange={(e) => setField("itemDescription", e.target.value)}
            placeholder="Describe the item you are looking for"
            aria-invalid={Boolean(errors.itemDescription)}
            aria-describedby={errors.itemDescription ? "err-itemDescription" : undefined}
            className={cn(inputCls(Boolean(errors.itemDescription)), "resize-y")}
          />
          <FieldError id="err-itemDescription" message={errors.itemDescription} />
        </div>

        <div>
          <label htmlFor="enq-additionalDetails" className={labelCls}>
            Additional Details
          </label>
          <textarea
            id="enq-additionalDetails"
            rows={2}
            value={state.additionalDetails}
            onChange={(e) => setField("additionalDetails", e.target.value)}
            placeholder="Add any additional details"
            className={cn(inputCls(false), "resize-y")}
          />
        </div>

        {submitError ? (
          <p role="alert" className="flex items-center gap-2 border-2 border-flame bg-flame/10 px-4 py-3 text-sm font-bold text-flame-deep">
            <IconAlert className="h-4 w-4 shrink-0" />
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className={cn(
            "flex w-full items-center justify-center gap-2.5 border-2 border-ink bg-flame px-6 py-4 text-sm font-black uppercase tracking-wider text-paper shadow-hard-sm transition-all",
            submitting
              ? "cursor-wait opacity-70"
              : "hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0.5 active:shadow-none"
          )}
        >
          {submitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Creating your enquiry…
            </>
          ) : (
            <>
              <IconTag className="h-4 w-4" />
              Create My Enquiry
            </>
          )}
        </button>

        <p className="flex items-start gap-2 text-[12px] font-semibold leading-relaxed text-ink/65">
          <IconInfo className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          We only collect the details needed to help with your enquiry. Your information is used to
          check product availability and pricing, and is never shared with third parties.
        </p>
      </form>
    </div>
  );
}
