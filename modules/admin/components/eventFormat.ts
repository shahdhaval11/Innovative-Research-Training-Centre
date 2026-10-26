const DATE_TIME = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" });

export function formatEventDateTime(iso: string): string {
  return DATE_TIME.format(new Date(iso));
}

// ISO -> value for <input type="datetime-local"> in the browser's timezone.
export function toLocalInputValue(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatEventFees(fees: number): string {
  return fees > 0 ? `₹${fees.toLocaleString("en-IN")}` : "Free";
}
