import { formatPercent } from "../../utils/formatCurrency";

export default function Badge({ tone = "neutral", children }) {
    return <span className={`badge badge--${tone}`}>{children}</span>;
}

const STATUS_TONE = { completed: "success", pending: "warning", cancelled: "danger" };
export const StatusBadge = ({ status }) => <Badge tone={STATUS_TONE[status] ?? "neutral"}>{status}</Badge>;

// invert: kamayish yaxshi bo'lgan ko'rsatkichlar uchun (masalan cancel rate)
export function DeltaBadge({ value, invert = false }) {
    if (value == null) return <Badge>—</Badge>;
    const good = invert ? value < 0 : value > 0;
    return <Badge tone={value === 0 ? "neutral" : good ? "success" : "danger"}>{formatPercent(value, { sign: true })}</Badge>;
}