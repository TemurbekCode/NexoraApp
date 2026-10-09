import { useMemo, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import DateRangePicker from "../components/ui/DateRangePicker";
import Card from "../components/ui/Card";
import FilterChips from "../components/ui/FilterChips";
import KpiCard from "../components/dashboard/KpiCard";
import TimeChart from "../components/charts/TimeChart";
import HBarList from "../components/charts/HBarList";
import DataTable from "../components/tables/DataTable";
import { useAnalytics } from "../hooks/useAnalytics";
import { useData } from "../context/DataContext";
import { GROUPERS, aggregate, groupSeries, orderTotal, percentChange } from "../utils/calculateMetrics";
import { formatCurrency, formatNumber } from "../utils/formatCurrency";
import { formatShortDate } from "../utils/dateUtils";

const GRANULARITY = [{ value: "day", label: "Daily" }, { value: "week", label: "Weekly" }, { value: "month", label: "Monthly" }];

export default function RevenuePage() {
  const { summary: s, prevSummary: p, daily, prevDaily, current } = useAnalytics();
  const { productsById, customersById } = useData();
  const [gran, setGran] = useState("day");

  const groups = useMemo(() => groupSeries(daily, GROUPERS[gran]), [daily, gran]);
  const prevGroups = useMemo(() => (gran === "day" ? prevDaily : null), [gran, prevDaily]);
  const byCategory = useMemo(() => aggregate(current, (o) => o.items.map((i) => [productsById.get(i.productId)?.category ?? "Uncategorized", i.quantity * i.unitPrice])), [current, productsById]);
  const byCountry = useMemo(() => aggregate(current, (o) => [[customersById.get(o.customerId)?.country ?? "Unknown", orderTotal(o)]]), [current, customersById]);

  const labels = groups.map((g) => (gran === "month" ? g.key : formatShortDate(g.key)));
  const series = [{ name: "Revenue", values: groups.map((g) => g.revenue), area: true }];
  if (prevGroups) series.push({ name: "Previous", values: prevGroups.map((d) => d.revenue), dashed: true });

  const columns = [
    { key: "period", header: "Period", render: (r) => r.key, sortValue: (r) => r.key },
    { key: "completed", header: "Completed orders", render: (r) => formatNumber(r.completed), sortValue: (r) => r.completed, align: "right" },
    { key: "revenue", header: "Revenue", render: (r) => formatCurrency(r.revenue), sortValue: (r) => r.revenue, align: "right" },
  ];

  return (
    <>
      <PageHeader title="Revenue" subtitle="Where the money comes from"><DateRangePicker /></PageHeader>
      <div className="page-body">
        <div className="grid-3">
          <KpiCard label="Revenue (completed)" value={s.revenue} format={formatCurrency} delta={percentChange(s.revenue, p.revenue)} />
          <KpiCard label="Pending, not yet counted" value={s.pendingValue} format={formatCurrency} />
          <KpiCard label="Lost to cancellations" value={s.cancelledValue} format={formatCurrency} />
        </div>
        <Card title="Revenue over time" action={<FilterChips label="Grouping" options={GRANULARITY} value={gran} onChange={setGran} />}>
          <TimeChart height={280} labels={labels} series={series} formatValue={formatCurrency} label={`Revenue grouped ${gran}`} />
        </Card>
        <div className="grid-2">
          <Card title="By category"><HBarList items={byCategory} /></Card>
          <Card title="By customer country"><HBarList items={byCountry} /></Card>
        </div>
        <Card title="Revenue by period">
          <DataTable columns={columns} rows={groups} rowKey={(r) => r.key} pageSize={8} resetPageKey={gran} initialSort={{ key: "period", dir: "desc" }} caption="Revenue by period" />
        </Card>
      </div>
    </>
  );
}