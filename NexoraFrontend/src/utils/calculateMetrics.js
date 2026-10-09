import { eachDay, weekStart } from "./dateUtils";

export const orderTotal = (o) => o.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
export const byNewest = (a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id);
export const filterByRange = (orders, from, to) => orders.filter((o) => o.date >= from && o.date <= to);

// Oldingi qiymat 0 yoki mavjud bo'lmasa, foiz hisoblanmaydi (null)
export function percentChange(current, previous) {
    if (current == null || previous == null || previous === 0) return null;
    return ((current - previous) / previous) * 100;
}

/**
 * Qoidalar:
 * - revenue / aov / activeCustomers: faqat COMPLETED buyurtmalar
 * - activeCustomers: davrda kamida 1 ta completed buyurtmasi bor noyob mijozlar
 * - orders: davrdagi barcha buyurtmalar; cancelRate = cancelled / orders * 100
 */
export function summarize(orders) {
    const s = { revenue: 0, orders: orders.length, completed: 0, pending: 0, cancelled: 0, pendingValue: 0, cancelledValue: 0 };
    const active = new Set();
    for (const o of orders) {
        const t = orderTotal(o);
        if (o.status === "completed") { s.revenue += t; s.completed++; active.add(o.customerId); }
        else if (o.status === "pending") { s.pending++; s.pendingValue += t; }
        else { s.cancelled++; s.cancelledValue += t; }
    }
    return {
        ...s,
        activeCustomers: active.size,
        aov: s.completed ? s.revenue / s.completed : null,
        cancelRate: s.orders ? (s.cancelled / s.orders) * 100 : 0,
    };
}

export function dailySeries(orders, from, to) {
    const map = new Map(eachDay(from, to).map((date) => [date, { date, revenue: 0, completed: 0, orders: 0 }]));
    for (const o of orders) {
        const d = map.get(o.date);
        if (!d) continue;
        d.orders++;
        if (o.status === "completed") { d.revenue += orderTotal(o); d.completed++; }
    }
    return [...map.values()].map((d) => ({ ...d, aov: d.completed ? d.revenue / d.completed : 0 }));
}

export const GROUPERS = { day: (d) => d, week: (d) => weekStart(d), month: (d) => d.slice(0, 7) };

export function groupSeries(days, keyOf) {
    const m = new Map();
    for (const d of days) {
        const k = keyOf(d.date);
        const g = m.get(k) ?? { key: k, revenue: 0, completed: 0, orders: 0 };
        g.revenue += d.revenue; g.completed += d.completed; g.orders += d.orders;
        m.set(k, g);
    }
    return [...m.values()];
}

// Completed buyurtmalar bo'yicha umumiy guruhlash: pairsOf(order) -> [[key, value], ...]
export function aggregate(orders, pairsOf) {
    const m = new Map();
    for (const o of orders) {
        if (o.status !== "completed") continue;
        for (const [k, v] of pairsOf(o)) m.set(k, (m.get(k) ?? 0) + v);
    }
    return [...m].map(([key, value]) => ({ key, label: key, value })).sort((a, b) => b.value - a.value);
}

export function productStats(orders) {
    const m = new Map();
    for (const o of orders) {
        if (o.status !== "completed") continue;
        for (const i of o.items) {
            const s = m.get(i.productId) ?? { name: i.name, units: 0, revenue: 0 };
            s.units += i.quantity; s.revenue += i.quantity * i.unitPrice;
            m.set(i.productId, s);
        }
    }
    return m;
}

export function customerStats(orders) {
    const m = new Map();
    for (const o of orders) {
        const s = m.get(o.customerId) ?? { orders: 0, spent: 0, lastDate: null };
        s.orders++;
        if (o.status === "completed") s.spent += orderTotal(o);
        if (!s.lastDate || o.date > s.lastDate) s.lastDate = o.date;
        m.set(o.customerId, s);
    }
    return m;
}

export function topProducts(orders, productsById, limit = 5) {
    return [...productStats(orders)]
        .map(([id, s]) => ({ key: id, label: productsById.get(id)?.name ?? s.name, value: s.revenue }))
        .sort((a, b) => b.value - a.value)
        .slice(0, limit);
}