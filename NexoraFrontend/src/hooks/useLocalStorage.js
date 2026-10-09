import { useCallback, useState } from "react";

export function useLocalStorage(key, initial) {
    const [value, setValue] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw === null ? initial : JSON.parse(raw);
        } catch { return initial; }
    });
    const set = useCallback((next) => {
        setValue((prev) => {
            const val = typeof next === "function" ? next(prev) : next;
            try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
            return val;
        });
    }, [key]);
    return [value, set];
}