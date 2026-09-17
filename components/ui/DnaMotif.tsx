function buildStrand(segments: number, width: number, segmentHeight: number, mirrored: boolean) {
  let d = "";
  for (let i = 0; i < segments; i++) {
    const y0 = i * segmentHeight;
    const y1 = y0 + segmentHeight;
    const even = i % 2 === 0;
    let xStart = even ? 0 : width;
    let xEnd = even ? width : 0;
    if (mirrored) {
      xStart = width - xStart;
      xEnd = width - xEnd;
    }
    if (i === 0) d += `M${xStart},${y0} `;
    d += `C${xStart},${y0 + segmentHeight / 2} ${xEnd},${y0 + segmentHeight / 2} ${xEnd},${y1} `;
  }
  return d;
}

export default function DnaMotif({
  className = "",
  segments = 8,
}: {
  className?: string;
  segments?: number;
}) {
  const width = 140;
  const segmentHeight = 90;
  const height = segments * segmentHeight;
  const rungs = Array.from({ length: segments - 1 }, (_, i) => (i + 1) * segmentHeight);

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      className={className}
    >
      <path d={buildStrand(segments, width, segmentHeight, false)} stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d={buildStrand(segments, width, segmentHeight, true)} stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      {rungs.map((y) => (
        <line key={y} x1={0} y1={y} x2={width} y2={y} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      ))}
    </svg>
  );
}
