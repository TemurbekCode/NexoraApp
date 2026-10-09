import { memo, useMemo } from "react";

const W = 520;
const H = 190;
const PAD = 8;

function buildPoints(series) {
    const min = Math.min(...series);
    const max = Math.max(...series);
    const range = max - min || 1;
    const step = (W - PAD * 2) / (series.length - 1);
    return series.map((v, i) => [
        PAD + i * step,
        H - PAD - ((v - min) / range) * (H - PAD * 2),
    ]);
}

function RevenueChart({ series }) {
    const { line, area } = useMemo(() => {
        const pts = buildPoints(series);
        const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
        const area = `${line} L${pts.at(-1)[0]} ${H} L${pts[0][0]} ${H} Z`;
        return { line, area };
    }, [series]);

    return (
        <svg
            className="chart"
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="Line chart showing revenue growing over the last 30 days"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((r) => (
                <line key={r} className="chart__grid" x1="0" x2={W} y1={H * r} y2={H * r} />
            ))}
            <path className="chart__area" d={area} fill="url(#chartFill)" />
            <path className="chart__line" d={line} pathLength="1" fill="none" />
        </svg>
    );
}

export default memo(RevenueChart);