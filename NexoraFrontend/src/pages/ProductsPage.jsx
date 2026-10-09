import { useCallback, useMemo, useState } from "react";
import { Package, Pencil, Plus, Trash2 } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import DateRangePicker from "../components/ui/DateRangePicker";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import ConfirmModal from "../components/ui/ConfirmModal";
import { SearchInput, SelectField } from "../components/ui/Field";
import DataTable from "../components/tables/DataTable";
import ProductFormModal from "../features/products/ProductFormModal";
import { useAnalytics } from "../hooks/useAnalytics";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";
import { productStats } from "../utils/calculateMetrics";
import { formatCurrency, formatNumber } from "../utils/formatCurrency";

export default function ProductsPage() {
    const { current } = useAnalytics();
    const { products, deleteProduct } = useData();
    const toast = useToast();
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [form, setForm] = useState(null); // { product } | null
    const [removing, setRemoving] = useState(null);
    const closeForm = useCallback(() => setForm(null), []);
    const closeRemove = useCallback(() => setRemoving(null), []);

    const categories = useMemo(() => [...new Set(products.map((p) => p.category))].sort(), [products]);
    const rows = useMemo(() => {
        const stats = productStats(current);
        const q = query.trim().toLowerCase();
        return products
            .filter((p) => (category === "all" || p.category === category) && (!q || `${p.name} ${p.sku}`.toLowerCase().includes(q)))
            .map((p) => ({ ...p, units: stats.get(p.id)?.units ?? 0, revenue: stats.get(p.id)?.revenue ?? 0 }));
    }, [current, products, query, category]);

    const columns = [
        { key: "name", header: "Product", render: (r) => <span className="stacked"><strong>{r.name}</strong><small>{r.sku}</small></span>, sortValue: (r) => r.name },
        { key: "category", header: "Category", render: (r) => r.category, sortValue: (r) => r.category },
        { key: "price", header: "Price", render: (r) => formatCurrency(r.price), sortValue: (r) => r.price, align: "right" },
        { key: "stock", header: "Stock", render: (r) => (r.stock == null ? "—" : formatNumber(r.stock)), sortValue: (r) => r.stock, align: "right" },
        { key: "units", header: "Units sold", render: (r) => formatNumber(r.units), sortValue: (r) => r.units, align: "right" },
        { key: "revenue", header: "Revenue", render: (r) => formatCurrency(r.revenue), sortValue: (r) => r.revenue, align: "right" },
        {
            key: "actions", header: "Actions", align: "right",
            render: (r) => (
                <span className="row-actions">
                    <button type="button" className="icon-btn" aria-label={`Edit ${r.name}`} onClick={() => setForm({ product: r })}><Pencil size={16} /></button>
                    <button type="button" className="icon-btn icon-btn--danger" aria-label={`Delete ${r.name}`} onClick={() => setRemoving(r)}><Trash2 size={16} /></button>
                </span>
            ),
        },
    ];

    return (
        <>
            <PageHeader title="Products" subtitle="What sells best"><DateRangePicker /></PageHeader>
            <Card>
                <div className="toolbar">
                    <SearchInput label="Search products" value={query} onChange={(e) => setQuery(e.target.value)} />
                    <SelectField label="Category" hideLabel value={category} onChange={(e) => setCategory(e.target.value)}
                        options={[{ value: "all", label: "All categories" }, ...categories.map((c) => ({ value: c, label: c }))]} />
                    <Button onClick={() => setForm({ product: null })}><Plus size={16} aria-hidden="true" /> Add product</Button>
                </div>
                <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} resetPageKey={`${query}|${category}`}
                    initialSort={{ key: "revenue", dir: "desc" }} caption="Products"
                    empty={<EmptyState icon={Package} title="No products found" description="Adjust your filters or add a new product." />} />
            </Card>

            {form && <ProductFormModal product={form.product} categories={categories} onClose={closeForm} />}
            <ConfirmModal open={Boolean(removing)} onClose={closeRemove} tone="danger" confirmLabel="Delete"
                title={`Delete ${removing?.name ?? "product"}?`}
                description="It will be removed from your catalog. Existing orders keep their history, so past revenue totals do not change."
                onConfirm={() => { deleteProduct(removing.id); toast.success("Product deleted."); closeRemove(); }} />
        </>
    );
}