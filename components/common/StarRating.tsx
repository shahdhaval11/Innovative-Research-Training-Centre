import { Star } from "lucide-react";

// Read-only star display; the feedback form has its own star picker for input.
export default function StarRating({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${className} ${n <= value ? "fill-amber-400 text-amber-400" : "text-secondary-200"}`}
        />
      ))}
    </span>
  );
}
