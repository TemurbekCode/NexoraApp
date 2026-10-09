export const brand = { name: "Nexora" };

export const navLinks = [
    { label: "What it answers", href: "#questions" },
    { label: "How we count", href: "#trust" },
];

export const hero = {
    title: "See exactly where your revenue comes from.",
    subtitle:
        "Nexora brings your orders, customers and products into one dashboard, so you can tell what is growing, what is slipping and why.",
    note: "Sample data is included, so you can explore right away.",
};

// Sample data: keyinchalik backend'dan keladi
export const revenueSample = {
    label: "Revenue, last 30 days",
    total: "$128,400",
    change: "+12.4% vs previous period",
    series: [
        42, 46, 44, 51, 49, 55, 53, 58, 56, 61, 59, 57, 63, 66, 64,
        69, 67, 72, 70, 75, 73, 78, 76, 82, 80, 85, 83, 88, 91, 95,
    ],
};

export const topProducts = [
    { name: "Rack Server", value: "$48.2k", share: 100 },
    { name: "Nexora Cloud", value: "$39.6k", share: 82 },
    { name: "Data Audit", value: "$24.1k", share: 51 },
];

export const questionsSection = {
    title: "The questions every owner asks",
    description:
        "Each chart in Nexora answers one of these, so there are no numbers that exist only to fill space.",
    items: [
        { title: "How much did we make this month?", description: "Total revenue for any date range you pick." },
        { title: "Are sales growing or falling?", description: "Every figure is compared with the previous period." },
        { title: "Which products sell the most?", description: "Ranked by revenue and units sold." },
        { title: "Who are our best customers?", description: "Search and sort by total spent and orders." },
        { title: "How many orders are completed, pending or cancelled?", description: "Filter every order by status." },
        { title: "What changed in this period?", description: "Switch ranges and watch the trends update." },
    ],
};

export const trustSection = {
    title: "Numbers you can trust",
    description: "Nexora shows how every figure is calculated.",
    items: [
        {
            title: "Completed orders only",
            description:
                "Revenue counts completed orders. Pending and cancelled orders are tracked separately and never inflate your total.",
        },
        {
            title: "Fair comparisons",
            description:
                "Growth compares your selected period with the period of the same length right before it.",
        },
        {
            title: "One source of truth",
            description:
                "Customer totals and product sales are calculated from your orders, so they always add up.",
        },
    ],
};

export const ctaSection = {
    title: "Open your dashboard",
    description: "Start with sample data and see your business in one place.",
};

export const footer = {
    left: "© 2026 Nexora",
    right: "Business intelligence for growing teams",
};