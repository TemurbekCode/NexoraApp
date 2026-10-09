import { formatCurrency } from "../../utils/formatCurrency";

export default function HBarList({ items, format = formatCurrency, emptyLabel = "No data for this period." }) {
    if (!items.length) return <p className="muted">{emptyLabel}</p>;
    const max = Math.max(...items.map((i) => i.value), 1);
    return (
        <ul className="hbars">
            {items.map((it, i) => (
                <li key={it.key}>
                    <span className="hbars__label">{it.label}</span>
                    <span className="hbars__track" aria-hidden="true">
                        <span className="hbars__bar" style={{ "--w": `${(it.value / max) * 100}%`, "--i": i }} />
                    </span>
                    <span className="hbars__value">{format(it.value)}</span>
                </li>
            ))}
        </ul>
    );
}