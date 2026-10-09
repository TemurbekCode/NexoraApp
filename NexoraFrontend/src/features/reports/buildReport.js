import { byNewest, customerStats, orderTotal, productStats } from "../../utils/calculateMetrics";

const cols = (...keys) => keys.map((k) => ({ key: k, header: k }));

// orders: tanlangan davrdagi buyurtmalar. Ekrandagi range bilan bir xil ma'lumot eksport qilinadi.
export function buildReport(kind, { orders, customers, products, customersById }) {
    if (kind === "orders") {
        return {
            columns: cols("id", "date", "customer", "email", "status", "items", "amount"),
            rows: [...orders].sort(byNewest).map((o) => ({
                id: o.id, date: o.date, customer: customersById.get(o.customerId)?.name ?? "", email: customersById.get(o.customerId)?.email ?? "",
                status: o.status, items: o.items.reduce((s, i) => s + i.quantity, 0), amount: orderTotal(o),
            })),
        };
    }
    if (kind === "customers") {
        const stats = customerStats(orders);
        return {
            columns: cols("id", "name", "email", "country", "orders", "total_spent"),
            rows: customers.filter((c) => stats.has(c.id)).map((c) => ({
                id: c.id, name: c.name, email: c.email, country: c.country, orders: stats.get(c.id).orders, total_spent: stats.get(c.id).spent,
            })).sort((a, b) => b.total_spent - a.total_spent),
        };
    }
    const stats = productStats(orders);
    return {
        columns: cols("sku", "name", "category", "price", "units_sold", "revenue"),
        rows: products.map((p) => ({
            sku: p.sku, name: p.name, category: p.category, price: p.price, units_sold: stats.get(p.id)?.units ?? 0, revenue: stats.get(p.id)?.revenue ?? 0,
        })).sort((a, b) => b.revenue - a.revenue),
    };
}