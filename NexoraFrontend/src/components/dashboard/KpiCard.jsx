import Card from "../ui/Card";
import { DeltaBadge } from "../ui/Badge";
import { useCountUp } from "../../hooks/useCountUp";

export default function KpiCard({ label, value, format, delta, invert }) {
    const shown = useCountUp(value);
    return (
        <Card className="kpi">
            <p className="kpi__label">{label}</p>
            <p className="kpi__value">
                <span aria-hidden="true">{value == null ? "—" : format(shown)}</span>
                <span className="sr-only">{format(value)}</span>
            </p>
            {delta !== undefined && (
                <p className="kpi__foot"><DeltaBadge value={delta} invert={invert} /> <span>vs previous period</span></p>
            )}
        </Card>
    );
}