import { useMemo } from "react";
import PageHeader from "../components/layout/PageHeader";
import DateRangePicker from "../components/ui/DateRangePicker";
import Card from "../components/ui/Card";
import { DeltaBadge, StatusBadge } from "../components/ui/Badge";
import TimeChart from "../components/charts/TimeChart";
import HBarList from "../components/charts/HBarList";
import { useAnalytics } from "../hooks/useAnalytics";
import { aggregate, orderTotal, percentChange } from "../utils/calculateMetrics";
import { formatCurrency, formatNumber, formatPercent } from "../utils/formatCurrency";
import { WEEKDAYS, formatShortDate, weekdayIndex } from "../utils/dateUtils";

const ROWS = [
    { label: "Revenue", key: "revenue", fmt: formatCurrency },
    { label: "Orders", key: "orders", fmt: formatNumber },
    { label: "Average order value", key: "aov", fmt: formatCurrency },
    { label: "Active customers", key: "activeCustomers", fmt: formatNumber },
    { label: "Cancel rate", key: "cancelRate", fmt: (v) => formatPercent(v), invert: true },
];
const STATUSES = [["completed", "completed"], ["pending", "pending"], ["cancelled", "cancelled"]];

export default function AnalyticsPage() {
    const { summary: s, prevSummary: p, daily, current } = useAnalytics();

    const weekdays = useMemo(() => {
        const byDay = new Map(aggregate(current, (o) => [[WEEKDAYS[weekdayIndex(o.date)], orderTotal(o)]]).map((r) => [r.key, r.value]));
        return WEEKDAYS.map((d) => ({ key: d, label: d, value: byDay.get(d) ?? 0 }));
    }, [current]);

    const total = s.orders || 1;

    return (
        <>
            <PageHeader title="Analytics" subtitle="Compare periods and spot trends"><DateRangePicker /></PageHeader>
            <div className="page-body">
                <div className="grid-3">
                    <Card title="Current vs previous period">
                        <table className="table table--plain">
                            <thead><tr><th scope="col">Metric</th><th scope="col">Now</th><th scope="col">Before</th><th scope="col">Change</th></tr></thead>
                            <tbody>
                                {ROWS.map((r) => (
                                    <tr key={r.key}>
                                        <th scope="row">{r.label}</th>
                                        <td>{r.fmt(s[r.key])}</td>
                                        <td>{r.fmt(p[r.key])}</td>
                                        <td><DeltaBadge value={percentChange(s[r.key], p[r.key])} invert={r.invert} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>

                    <Card title="Order status mix">
                        <div className="stackbar" role="img" aria-label={`${s.completed} completed, ${s.pending} pending, ${s.cancelled} cancelled`}>
                            <span className="stackbar__seg stackbar__seg--success" style={{ flexGrow: s.completed }} />
                            <span className="stackbar__seg stackbar__seg--warning" style={{ flexGrow: s.pending }} />
                            <span className="stackbar__seg stackbar__seg--danger" style={{ flexGrow: s.cancelled }} />
                        </div>
                        <ul className="status-rows">
                            {STATUSES.map(([key, status]) => (
                                <li key={key}>
                                    <StatusBadge status={status} />
                                    <span>{formatNumber(s[key])} ({Math.round((s[key] / total) * 100)}%)</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card title="Average order value trend">
                        <TimeChart labels={daily.map((d) => formatShortDate(d.date))} formatValue={formatCurrency} label="Average order value per day"
                            series={[{ name: "AOV", values: daily.map((d) => d.aov), area: true }]} />
                    </Card>
                </div>
                <div className="grid-3">
                    <Card title="Revenue by weekday" hint="which days are strongest"><HBarList items={weekdays} /></Card>
                </div>
            </div>
        </>
    );
}