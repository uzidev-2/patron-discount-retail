/** Small, dependency-free validators. Each returns an error message or null. */

export function required(value: string, label: string): string | null {
  return value.trim().length > 0 ? null : `${label} is required.`;
}

export function minChars(value: string, min: number, label: string): string | null {
  if (value.trim().length === 0) return `${label} is required.`;
  if (value.trim().length < min) return `${label} should be at least ${min} characters.`;
  return null;
}

export function phoneValid(value: string): string | null {
  const v = value.trim();
  if (v.length === 0) return "Phone number is required.";
  if (!/^\+?[\d\s().-]{7,20}$/.test(v)) {
    return "Enter a valid phone number (digits, spaces, +, -, ( ) allowed).";
  }
  const digits = v.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) {
    return "Phone number should include 7–15 digits.";
  }
  return null;
}

export function emailOptional(value: string): string | null {
  const v = value.trim();
  if (v.length === 0) return null; // optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
    ? null
    : "Enter a valid email address, or leave this blank.";
}
