const cache = new Map();
const nf = (key, options) => {
    if (!cache.has(key)) cache.set(key, new Intl.NumberFormat("en-US", options));
    return cache.get(key);
};

export const formatCurrency = (v, currency = "USD") =>
    v == null ? "—" : nf(`c-${currency}`, { style: "currency", currency, maximumFractionDigits: 0 }).format(v);
export const formatNumber = (v) => (v == null ? "—" : nf("n", { maximumFractionDigits: 0 }).format(v));
export const formatCompact = (v) => nf("k", { notation: "compact", maximumFractionDigits: 1 }).format(v);
export const formatPercent = (v, { sign = false, digits = 1 } = {}) =>
    v == null || !Number.isFinite(v) ? "—" : `${sign && v > 0 ? "+" : ""}${v.toFixed(digits)}%`;
export const formatOrderId = (id) => `#${id.replace("ORD-", "")}`;