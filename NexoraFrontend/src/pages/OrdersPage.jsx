import { useCallback, useMemo, useState } from "react";
import { ListOrdered } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import DateRangePicker from "../components/ui/DateRangePicker";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import FilterChips from "../components/ui/FilterChips";
import { SearchInput } from "../components/ui/Field";
import { StatusBadge } from "../components/ui/Badge";
import DataTable from "../components/tables/DataTable";
import OrderDetailModal from "../features/orders/OrderDetailModal";
import { useAnalytics } from "../hooks/useAnalytics";
import { useData } from "../context/DataContext";
import { orderTotal } from "../utils/calculateMetrics";
import { formatCurrency, formatOrderId } from "../utils/formatCurrency";
import { ORDER_STATUSES } from "../data/options";

export default function OrdersPage() {
    const { current } = useAnalytics();
    const { customersById } = useData();
    const [status, setStatus] = useState("all");
    const [query, setQuery] = useState("");
    const [openId, setOpenId] = useState(null);
    const close = useCallback(() => setOpenId(null), []);

    const counts = useMemo(() => {
        const c = { all: current.length };
        ORDER_STATUSES.forEach((s) => { c[s] = current.filter((o) => o.status === s).length; });
        return c;
    }, [current]);

    const rows = useMemo(() => {
        const q = query.trim().toLowerCase();
        return current
            .filter((o) => status === "all" || o.status === status)
            .map((o) => ({ ...o, customer: customersById.get(o.customerId)?.name ?? "Unknown customer", total: orderTotal(o) }))
            .filter((r) => !q || `${r.id} ${r.customer}`.toLowerCase().includes(q));
    }, [current, status, query, customersById]);

    const columns = [
        { key: "id", header: "Order", render: (r) => formatOrderId(r.id), sortValue: (r) => r.id },
        { key: "date", header: "Date", render: (r) => r.date, sortValue: (r) => `${r.date}${r.id}` },
        { key: "customer", header: "Customer", render: (r) => r.customer, sortValue: (r) => r.customer },
        { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} />, sortValue: (r) => r.status },
        { key: "total", header: "Amount", render: (r) => formatCurrency(r.total), sortValue: (r) => r.total, align: "right" },
    ];
    const options = ["all", ...ORDER_STATUSES].map((v) => ({ value: v, label: `${v} (${counts[v]})` }));

    return (
        <>
            <PageHeader title="Orders" subtitle="Every order, filtered"><DateRangePicker /></PageHeader>
            <Card>
                <div className="toolbar">
                    <FilterChips label="Filter by status" options={options} value={status} onChange={setStatus} />
                </div>
                <div className="toolbar"><SearchInput label="Search order ID or customer" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
                <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} onRowClick={(r) => setOpenId(r.id)} pageSize={12}
                    resetPageKey={`${status}|${query}`} initialSort={{ key: "date", dir: "desc" }} caption="Orders in the selected period"
                    empty={<EmptyState icon={ListOrdered} title="No orders match" description="Change the status, search or date range." />} />
            </Card>
            <OrderDetailModal orderId={openId} onClose={close} />
        </>
    );
}