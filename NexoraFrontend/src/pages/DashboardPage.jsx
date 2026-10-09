import { useMemo, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import DateRangePicker from "../components/ui/DateRangePicker";
import Card from "../components/ui/Card";
import KpiCard from "../components/dashboard/KpiCard";
import TopProducts from "../components/dashboard/TopProducts";
import RecentActivity from "../components/dashboard/RecentActivity";
import TimeChart from "../components/charts/TimeChart";
import OrderDetailModal from "../features/orders/OrderDetailModal";
import { useAnalytics } from "../hooks/useAnalytics";
import { useData } from "../context/DataContext";
import { byNewest, percentChange, topProducts } from "../utils/calculateMetrics";
import { formatCurrency, formatNumber } from "../utils/formatCurrency";
import { formatShortDate } from "../utils/dateUtils";

export default function DashboardPage() {
    const { summary: s, prevSummary: p, daily, prevDaily, current } = useAnalytics();
    const { orders, productsById, customersById } = useData();
    const [openId, setOpenId] = useState(null);

    const top = useMemo(() => topProducts(current, productsById, 5), [current, productsById]);
    const recent = useMemo(() => [...orders].sort(byNewest).slice(0, 8), [orders]);
    const labels = daily.map((d) => formatShortDate(d.date));

    return (
        <>
            <PageHeader title="Dashboard" subtitle="Quick overview of the selected period"><DateRangePicker /></PageHeader>
            <div className="page-body">
                <div className="grid-4">
                    <KpiCard label="Revenue" value={s.revenue} format={formatCurrency} delta={percentChange(s.revenue, p.revenue)} />
                    <KpiCard label="Orders" value={s.orders} format={formatNumber} delta={percentChange(s.orders, p.orders)} />
                    <KpiCard label="Active customers" value={s.activeCustomers} format={formatNumber} delta={percentChange(s.activeCustomers, p.activeCustomers)} />
                    <KpiCard label="Average order value" value={s.aov} format={formatCurrency} delta={percentChange(s.aov, p.aov)} />
                </div>
                <div className="grid-3">
                    <Card title="Revenue" hint="dashed line = previous period">
                        <TimeChart labels={labels} formatValue={formatCurrency} label="Revenue over the selected period compared with the previous period"
                            series={[
                                { name: "Current", values: daily.map((d) => d.revenue), area: true },
                                { name: "Previous", values: prevDaily.map((d) => d.revenue), dashed: true },
                            ]} />
                    </Card>
                    <Card title="Completed orders">
                        <TimeChart variant="bar" labels={labels} formatValue={formatNumber} label="Completed orders per day"
                            series={[{ name: "Completed", values: daily.map((d) => d.completed) }]} />
                    </Card>
                    <TopProducts items={top} />
                </div>
                <div className="grid-3">
                    <RecentActivity orders={recent} customersById={customersById} onOpen={setOpenId} />
                </div>
            </div>
            <OrderDetailModal orderId={openId} onClose={() => setOpenId(null)} />
        </>
    );
}