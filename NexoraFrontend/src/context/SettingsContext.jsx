import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS } from "../config/appConfig";
import { DEMO_PREFERENCES, DEMO_PROFILE } from "../data/demoData";

const SettingsContext = createContext(null);

function read() {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) ?? "null");
        if (parsed?.profile && parsed?.preferences) return parsed;
    } catch { /* default'ga qaytadi */ }
    return { profile: DEMO_PROFILE, preferences: DEMO_PREFERENCES };
}

export function SettingsProvider({ children }) {
    const [state, setState] = useState(read);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state)); } catch { /* ignore */ }
    }, [state]);

    const theme = state.preferences.theme;
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: light)");
        const apply = () => { document.documentElement.dataset.theme = theme === "system" ? (mq.matches ? "light" : "dark") : theme; };
        apply();
        if (theme !== "system") return undefined;
        mq.addEventListener("change", apply);
        return () => mq.removeEventListener("change", apply);
    }, [theme]);

    const value = useMemo(() => ({
        ...state,
        setPreference: (key, v) => setState((s) => ({ ...s, preferences: { ...s.preferences, [key]: v } })),
        setNotification: (key, v) => setState((s) => ({ ...s, preferences: { ...s.preferences, notifications: { ...s.preferences.notifications, [key]: v } } })),
        updateBusiness: (patch) => setState((s) => ({ ...s, profile: { ...s.profile, business: { ...s.profile.business, ...patch } } })),
    }), [state]);

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error("useSettings must be used inside <SettingsProvider>");
    return ctx;
}