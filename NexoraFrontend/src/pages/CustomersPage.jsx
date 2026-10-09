import { useCallback, useMemo, useState } from "react";
import { Users } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import DateRangePicker from "../components/ui/DateRangePicker";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import { SearchInput } from "../components/ui/Field";
import DataTable from "../components/tables/DataTable";
import CustomerModal from "../features/customers/CustomerModal";
import { useAnalytics } from "../hooks/useAnalytics";
import { useData } from "../context/DataContext";
import { customerStats } from "../utils/calculateMetrics";
import { formatCurrency, formatNumber } from "../utils/formatCurrency";

export default function CustomersPage() {
    const { current } = useAnalytics();
    const { customers } = useData();
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(null);
    const close = useCallback(() => setSelected(null), []);

    const rows = useMemo(() => {
        const stats = customerStats(current);
        const q = query.trim().toLowerCase();
        return customers
            .filter((c) => stats.has(c.id))
            .map((c) => ({ ...c, ...stats.get(c.id) }))
            .filter((r) => !q || `${r.name} ${r.email} ${r.country}`.toLowerCase().includes(q));
    }, [current, customers, query]);

    const columns = [
        { key: "name", header: "Customer", render: (r) => <span className="stacked"><strong>{r.name}</strong><small>{r.email}</small></span>, sortValue: (r) => r.name },
        { key: "country", header: "Country", render: (r) => r.country, sortValue: (r) => r.country },
        { key: "orders", header: "Orders", render: (r) => formatNumber(r.orders), sortValue: (r) => r.orders, align: "right" },
        { key: "spent", header: "Total spent", render: (r) => formatCurrency(r.spent), sortValue: (r) => r.spent, align: "right" },
        { key: "last", header: "Last order", render: (r) => r.lastDate, sortValue: (r) => r.lastDate },
    ];

    return (
        <>
            <PageHeader title="Customers" subtitle="Who spends the most"><DateRangePicker /></PageHeader>
            <Card>
                <div className="toolbar"><SearchInput label="Search name, email or country" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
                <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} onRowClick={setSelected} resetPageKey={query}
                    initialSort={{ key: "spent", dir: "desc" }} caption="Customers in the selected period"
                    empty={<EmptyState icon={Users} title="No customers found" description="Try a different search or widen the date range." />} />
            </Card>
            <CustomerModal customer={selected} orders={current} onClose={close} />
        </>
    );
}