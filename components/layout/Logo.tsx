import Link from "next/link";
import { Dna } from "lucide-react";
import clsx from "clsx";

export default function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const dark = variant === "dark";

  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5">
      <span
        className={clsx(
          "flex h-11 w-11 items-center justify-center rounded-xl",
          dark ? "bg-white/10" : "bg-primary-50",
        )}
      >
        <Dna className={clsx("h-6 w-6", dark ? "text-primary-300" : "text-primary-600")} />
      </span>
      <span className="leading-tight">
        <span
          className={clsx(
            "block font-heading text-lg font-extrabold tracking-tight",
            dark ? "text-white" : "text-secondary-800",
          )}
        >
          Nano<span className="text-primary-600">Nova</span>
        </span>
        <span
          className={clsx(
            "block text-[11px] font-medium tracking-wide",
            dark ? "text-secondary-200" : "text-secondary-500",
          )}
        >
          Research Training Centre
        </span>
      </span>
    </Link>
  );
}
