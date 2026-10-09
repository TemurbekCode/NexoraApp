import { addDays } from "../utils/dateUtils";

export const DEMO_PROFILE = {
    fullName: "Temur Alisherov",
    email: "temur@example.com",
    role: "Business Owner",
    memberSince: "2026-01-15",
    business: { name: "Nexora Demo Store", type: "E-commerce", country: "Uzbekistan", size: "11–50 employees", currency: "USD" },
};

export const DEMO_PREFERENCES = {
    theme: "dark",
    defaultView: "dashboard",
    notifications: { revenueAlerts: true, dailySummary: false, weeklyReports: true },
};

const PRODUCT_SEEDS = [
    ["Rack Server", "Hardware", 980], ["Data Audit", "Services", 520], ["Onboarding Pack", "Services", 350],
    ["Edge Gateway", "Hardware", 420], ["Pipeline Suite", "Software", 299], ["Premium Support", "Services", 199],
    ["Smart Display", "Hardware", 240], ["Sensor Kit", "Hardware", 160], ["Training Day", "Services", 150],
    ["Insight Pro", "Software", 129], ["Secure Vault", "Software", 89], ["Nexora Cloud", "Software", 49],
];
const FIRST = ["Mehmet", "Aylin", "Malika", "Anna", "Dilnoza", "Laura", "Bekzod", "Sofia", "Elena", "Kenji", "Aziz", "Omar"];
const LAST = ["Ivanova", "Demir", "Tanaka", "Petrov", "Schmidt", "Nazarov", "Smith", "Karimov", "Weber"];
const COUNTRIES = ["Uzbekistan", "Uzbekistan", "Turkey", "Turkey", "Kazakhstan", "Germany", "USA"];

function mulberry32(seed) {
    let a = seed;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function generateDemoData(today) {
    const rand = mulberry32(2026);

    const products = PRODUCT_SEEDS.map(([name, category, price], i) => ({
        id: `PROD-${101 + i}`,
        sku: `${category.slice(0, 2).toUpperCase()}-${String(i + 1).padStart(3, "0")}`,
        name, category, price,
        stock: category === "Hardware" ? 20 + Math.floor(rand() * 180) : null, // stock faqat jismoniy mahsulotlarda
        currency: "USD",
    }));

    const customers = Array.from({ length: 36 }, (_, i) => {
        const first = FIRST[i % FIRST.length];
        const last = LAST[(i * 5 + Math.floor(i / FIRST.length)) % LAST.length];
        return {
            id: `CUS-${101 + i}`,
            name: `${first} ${last}`,
            email: `${first}.${last}@example.com`.toLowerCase(),
            country: COUNTRIES[Math.floor(rand() * COUNTRIES.length)],
        };
    });

    const orders = [];
    let seq = 1000;
    for (let offset = 120; offset >= 0; offset--) {
        const count = 3 + Math.floor(rand() * 7);
        for (let n = 0; n < count; n++) {
            const r = rand();
            // Pending faqat so'nggi kunlardagi buyurtmalarda bo'ladi
            const status = offset > 10 ? (r < 0.78 ? "completed" : "cancelled") : r < 0.6 ? "completed" : r < 0.85 ? "pending" : "cancelled";
            const lines = 1 + (rand() < 0.4 ? 1 : 0) + (rand() < 0.15 ? 1 : 0);
            const picked = new Set();
            while (picked.size < lines) picked.add(Math.floor(rand() * products.length));
            orders.push({
                id: `ORD-${++seq}`,
                customerId: customers[Math.floor(Math.pow(rand(), 1.7) * customers.length)].id,
                date: addDays(today, -offset),
                status,
                currency: "USD",
                items: [...picked].map((idx) => {
                    const p = products[idx];
                    const maxQty = p.price > 400 ? 2 : p.price > 150 ? 3 : 6;
                    return { productId: p.id, name: p.name, quantity: 1 + Math.floor(rand() * maxQty), unitPrice: p.price };
                }),
            });
        }
    }
    return { orders, products, customers };
}