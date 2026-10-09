import { STORAGE_KEYS } from "../config/appConfig";
import { generateDemoData } from "../data/demoData";
import { todayISO } from "../utils/dateUtils";

const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));
const isValid = (d) => Boolean(d) && Array.isArray(d.orders) && Array.isArray(d.products) && Array.isArray(d.customers);

function persist({ orders, products, customers }) {
    try {
        localStorage.setItem(STORAGE_KEYS.data, JSON.stringify({ orders, products, customers }));
    } catch {
        /* private mode yoki quota: demo ishlashda davom etadi */
    }
}

async function load() {
    await wait();
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.data);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (isValid(parsed)) return parsed;
        }
    } catch {
        /* buzilgan JSON: pastda qayta yaratiladi */
    }
    const fresh = generateDemoData(todayISO());
    persist(fresh);
    return fresh;
}

async function reset() {
    await wait();
    const fresh = generateDemoData(todayISO());
    persist(fresh);
    return fresh;
}

export const dataService = { load, reset, save: persist };