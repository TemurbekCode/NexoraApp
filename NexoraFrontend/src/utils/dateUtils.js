const pad = (n) => String(n).padStart(2, "0");
export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parseISO = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
export const todayISO = () => toISO(new Date());
export const addDays = (iso, n) => { const d = parseISO(iso); d.setDate(d.getDate() + n); return toISO(d); };
export const daysBetween = (from, to) => Math.round((parseISO(to) - parseISO(from)) / 86400000) + 1;
export const eachDay = (from, to) => Array.from({ length: daysBetween(from, to) }, (_, i) => addDays(from, i));
export const previousRange = (from, to) => ({ from: addDays(from, -daysBetween(from, to)), to: addDays(from, -1) });
export const presetRange = (days, end = todayISO()) => ({ from: addDays(end, -(days - 1)), to: end });
export const weekdayIndex = (iso) => (parseISO(iso).getDay() + 6) % 7; // Dushanba = 0
export const weekStart = (iso) => addDays(iso, -weekdayIndex(iso));
export const formatShortDate = (iso) => iso.slice(5);