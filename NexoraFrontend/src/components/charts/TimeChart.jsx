import { useState } from "react";
import { useElementWidth } from "../../hooks/useElementWidth";
import { formatCompact } from "../../utils/formatCurrency";

const PAD = { top: 12, right: 12, bottom: 26, left: 46 };

function niceMax(v) {
    if (v <= 0) return 1;
    const pow = 10 ** Math.floor(Math.log10(v));
    const n = v / pow;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow;
}

/** series: [{ name, values, dashed?, area? }]. variant="bar" faqat birinchi series'ni chizadi. */
export default function TimeChart({ variant = "line", labels, series, formatValue = formatCompact, height = 200, label }) {
    const [ref, width] = useElementWidth();
    const [hover, setHover] = useState(null);
    const n = labels.length;
    const bar = variant === "bar";

    const max = niceMax(Math.max(0, ...series.flatMap((s) => s.values)));
    const iw = Math.max(width - PAD.left - PAD.right, 0);
    const ih = height - PAD.top - PAD.bottom;
    const x = (i) => (bar ? PAD.left + (i + 0.5) * (iw / n) : PAD.left + (n < 2 ? iw / 2 : (i / (n - 1)) * iw));
    const y = (v) => PAD.top + ih - (v / max) * ih;
    const path = (vals) => vals.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
    const xLabels = [...new Set([0, Math.floor((n - 1) / 2), n - 1])];

    const onMove = (e) => {
        const rel = e.clientX - e.currentTarget.getBoundingClientRect().left - PAD.left;
        const idx = bar ? Math.floor(rel / (iw / n)) : Math.round((rel / iw) * (n - 1));
        setHover(Math.min(Math.max(idx, 0), n - 1));
    };

    if (n === 0) return null;

    return (
        <div className="chart" ref={ref} style={{ height }}>
            {width > 0 && (
                <>
                    <svg width={width} height={height} role="img" aria-label={label} onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
                        {[0, 1, 2, 3, 4].map((t) => (
                            <g key={t}>
                                <line className="chart__grid" x1={PAD.left} x2={width - PAD.right} y1={y((max / 4) * t)} y2={y((max / 4) * t)} />
                                <text className="chart__tick" x={PAD.left - 8} y={y((max / 4) * t) + 4} textAnchor="end">{formatCompact((max / 4) * t)}</text>
                            </g>
                        ))}
                        {xLabels.map((i) => (
                            <text key={i} className="chart__tick" x={x(i)} y={height - 6}
                                textAnchor={bar ? "middle" : i === 0 ? "start" : i === n - 1 ? "end" : "middle"}>{labels[i]}</text>
                        ))}

                        {bar && series[0].values.map((v, i) => {
                            const bw = Math.max((iw / n) * 0.68, 1);
                            return <rect key={i} className={`chart__bar ${hover === i ? "is-hover" : ""}`} x={x(i) - bw / 2} y={y(v)} width={bw} height={Math.max(PAD.top + ih - y(v), 0)} rx={Math.min(3, bw / 2)} />;
                        })}

                        {!bar && series.map((s) => (
                            <g key={s.name}>
                                {s.area && <path className="chart__area" d={`${path(s.values)} L${x(n - 1)} ${y(0)} L${x(0)} ${y(0)} Z`} />}
                                <path className={`chart__line ${s.dashed ? "chart__line--dashed" : ""}`} d={path(s.values)} pathLength={s.dashed ? undefined : 1} />
                                {hover !== null && <circle className="chart__dot" cx={x(hover)} cy={y(s.values[hover])} r="4" />}
                            </g>
                        ))}
                        {hover !== null && !bar && <line className="chart__cursor" x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={PAD.top + ih} />}
                    </svg>
                    {hover !== null && (
                        <div className="chart__tip" style={{ left: Math.min(Math.max(x(hover), 70), width - 70) }}>
                            <strong>{labels[hover]}</strong>
                            {series.map((s) => <span key={s.name}>{s.name}: {formatValue(s.values[hover])}</span>)}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}