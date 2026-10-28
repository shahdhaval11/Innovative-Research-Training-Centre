"use client";

import { useEffect, useRef, useState } from "react";
import type { RegistrationTrendPoint } from "@/lib/redux/slices/dashboardSlice";

// Categorical slots 1 and 2 of the validated palette (blue / orange): worst CVD
// separation 24.7, normal-vision 33.6, 3:1+ against the white card.
const SERIES = [
  { key: "event", label: "Event", color: "#2a78d6" },
  { key: "workshop", label: "Workshop", color: "#eb6834" },
] as const;

const INK = { primary: "#0b0b0b", secondary: "#52514e", muted: "#898781" };
const SURFACE = "#ffffff";
const GRID = "#e8e7e3";

const HEIGHT = 280;
const MARGIN = { top: 16, right: 24, bottom: 44, left: 36 };

const DAY_LABEL = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", timeZone: "UTC" });
const WEEKDAY = new Intl.DateTimeFormat("en-IN", { weekday: "short", timeZone: "UTC" });
const FULL_DATE = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

// `date` is a plain YYYY-MM-DD calendar day; parse it as UTC so the label never shifts.
const toDate = (date: string) => new Date(`${date}T00:00:00Z`);

// Integer y-axis: the smallest "nice" step that needs at most 5 intervals.
function yScale(max: number) {
  const steps = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000];
  const target = Math.max(max, 1);
  const step = steps.find((s) => Math.ceil(target / s) <= 5) ?? 10000;
  const intervals = max === 0 ? 4 : Math.ceil(max / step);
  return { step, top: step * intervals, ticks: Array.from({ length: intervals + 1 }, (_, i) => i * step) };
}

// Smooth path through the points using monotone cubic interpolation (Fritsch-Carlson):
// the curve never overshoots the data, so it cannot dip below 0 or above a real peak.
function smoothPath(pts: { x: number; y: number }[]): string {
  const n = pts.length;
  if (n === 0) return "";
  if (n === 1) return `M${pts[0].x},${pts[0].y}`;

  const delta = pts.slice(1).map((p, k) => (p.y - pts[k].y) / (p.x - pts[k].x));
  const m = pts.map((_, k) => {
    if (k === 0) return delta[0];
    if (k === n - 1) return delta[n - 2];
    return delta[k - 1] * delta[k] <= 0 ? 0 : (delta[k - 1] + delta[k]) / 2;
  });
  for (let k = 0; k < n - 1; k++) {
    if (delta[k] === 0) {
      m[k] = m[k + 1] = 0;
      continue;
    }
    const a = m[k] / delta[k];
    const b = m[k + 1] / delta[k];
    const s = a * a + b * b;
    if (s > 9) {
      const tau = 3 / Math.sqrt(s);
      m[k] = tau * a * delta[k];
      m[k + 1] = tau * b * delta[k];
    }
  }

  let d = `M${pts[0].x},${pts[0].y}`;
  for (let k = 0; k < n - 1; k++) {
    const h = pts[k + 1].x - pts[k].x;
    d += ` C${pts[k].x + h / 3},${pts[k].y + (m[k] * h) / 3} ${pts[k + 1].x - h / 3},${
      pts[k + 1].y - (m[k + 1] * h) / 3
    } ${pts[k + 1].x},${pts[k + 1].y}`;
  }
  return d;
}

export default function RegistrationTrendChart({ data }: { data: RegistrationTrendPoint[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [active, setActive] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(280, entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, [showTable]);

  const n = data.length;
  const totals = SERIES.map((s) => data.reduce((sum, d) => sum + d[s.key], 0));
  const grandTotal = totals.reduce((a, b) => a + b, 0);
  const max = Math.max(0, ...data.flatMap((d) => SERIES.map((s) => d[s.key])));
  const { top, ticks } = yScale(max);

  const innerW = width - MARGIN.left - MARGIN.right;
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const x = (i: number) => MARGIN.left + (n > 1 ? (i * innerW) / (n - 1) : innerW / 2);
  const y = (v: number) => MARGIN.top + innerH - (v / top) * innerH;

  function indexFromPointer(clientX: number, svg: SVGSVGElement) {
    const px = clientX - svg.getBoundingClientRect().left;
    const i = Math.round(((px - MARGIN.left) / innerW) * (n - 1));
    return Math.min(n - 1, Math.max(0, i));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") setActive((i) => Math.min(n - 1, (i ?? -1) + 1));
    else if (e.key === "ArrowLeft") setActive((i) => Math.max(0, (i ?? n) - 1));
    else if (e.key === "Escape") setActive(null);
    else return;
    e.preventDefault();
  }

  const compactLabels = width < 360;
  const activePoint = active === null ? null : data[active];
  // Keep the tooltip inside the card: flip to the left of the crosshair on the right half.
  const tooltipOnLeft = active !== null && x(active) > width / 2;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {SERIES.map((s, i) => (
            <li key={s.key} className="flex items-center gap-2 text-sm text-secondary-600">
              <span aria-hidden className="h-0.5 w-4 rounded-full" style={{ background: s.color }} />
              {s.label}
              <span className="text-xs text-secondary-400">{totals[i]} total</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-pressed={showTable}
          onClick={() => setShowTable((v) => !v)}
          className="rounded-md px-2.5 py-1 text-xs font-semibold text-secondary-600 hover:bg-secondary-100"
        >
          {showTable ? "Show chart" : "Show table"}
        </button>
      </div>

      {showTable ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-secondary-100 text-xs tracking-wide text-secondary-500 uppercase">
              <tr>
                <th className="py-2 pr-4 font-semibold">Date</th>
                {SERIES.map((s) => (
                  <th key={s.key} className="px-4 py-2 text-right font-semibold">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {data.map((d) => (
                <tr key={d.date}>
                  <td className="py-2 pr-4 text-secondary-700">{FULL_DATE.format(toDate(d.date))}</td>
                  {SERIES.map((s) => (
                    <td key={s.key} className="px-4 py-2 text-right text-secondary-800 tabular-nums">
                      {d[s.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div ref={wrapRef} className="relative mt-3" style={{ height: HEIGHT }}>
          <svg
            width={width}
            height={HEIGHT}
            tabIndex={0}
            role="img"
            aria-label={`Line chart of daily Event and Workshop registrations for the last ${n} days. ${totals[0]} event and ${totals[1]} workshop registrations in total. Use the left and right arrow keys to read each day.`}
            className="block touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            onPointerMove={(e) => setActive(indexFromPointer(e.clientX, e.currentTarget))}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive((i) => i ?? n - 1)}
            onBlur={() => setActive(null)}
            onKeyDown={onKeyDown}
          >
            {/* y grid + ticks */}
            {ticks.map((t) => (
              <g key={t}>
                <line x1={MARGIN.left} x2={width - MARGIN.right} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth={1} />
                <text x={MARGIN.left - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={11} fill={INK.muted}>
                  {t}
                </text>
              </g>
            ))}

            {/* x labels: date, then weekday */}
            {data.map((d, i) => {
              if (compactLabels && i % 2 === 1) return null;
              const date = toDate(d.date);
              return (
                <text key={d.date} x={x(i)} y={HEIGHT - MARGIN.bottom + 18} textAnchor="middle" fontSize={11}>
                  <tspan fill={active === i ? INK.primary : INK.secondary} fontWeight={active === i ? 600 : 400}>
                    {DAY_LABEL.format(date)}
                  </tspan>
                  <tspan x={x(i)} dy={14} fill={INK.muted}>
                    {WEEKDAY.format(date)}
                  </tspan>
                </text>
              );
            })}

            {/* crosshair */}
            {active !== null && (
              <line x1={x(active)} x2={x(active)} y1={MARGIN.top} y2={MARGIN.top + innerH} stroke={INK.muted} strokeWidth={1} />
            )}

            {/* lines, then dots with a surface ring so overlaps stay legible */}
            {SERIES.map((s) => (
              <path
                key={s.key}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                d={smoothPath(data.map((d, i) => ({ x: x(i), y: y(d[s.key]) })))}
              />
            ))}
            {SERIES.map((s) =>
              data.map((d, i) => (
                <circle
                  key={`${s.key}-${d.date}`}
                  cx={x(i)}
                  cy={y(d[s.key])}
                  r={active === i ? 5 : 4}
                  fill={s.color}
                  stroke={SURFACE}
                  strokeWidth={2}
                />
              )),
            )}
          </svg>

          {activePoint && active !== null && (
            <div
              role="status"
              className="pointer-events-none absolute z-10 min-w-36 rounded-md border border-secondary-100 bg-white px-3 py-2 shadow-soft"
              style={{
                top: MARGIN.top,
                left: tooltipOnLeft ? undefined : x(active) + 12,
                right: tooltipOnLeft ? width - x(active) + 12 : undefined,
              }}
            >
              <p className="text-xs font-semibold text-secondary-500">
                {FULL_DATE.format(toDate(activePoint.date))}
              </p>
              <ul className="mt-1.5 space-y-1">
                {SERIES.map((s) => (
                  <li key={s.key} className="flex items-center gap-2 text-sm">
                    <span aria-hidden className="h-0.5 w-3 rounded-full" style={{ background: s.color }} />
                    <span className="font-semibold text-secondary-800 tabular-nums">{activePoint[s.key]}</span>
                    <span className="text-secondary-500">{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {grandTotal === 0 && !showTable && (
        <p className="mt-2 text-center text-xs text-secondary-400">
          No registrations in the last {n} days.
        </p>
      )}
    </div>
  );
}
