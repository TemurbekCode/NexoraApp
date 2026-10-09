import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);
const EMPTY = { user: null, business: null, preferences: null };

export function AuthProvider({ children }) {
    const [state, setState] = useState({ ...EMPTY, loading: true });

    const apply = useCallback((snap) => setState({ ...snap, loading: false }), []);

    useEffect(() => {
        authService.getCurrentUser().then(apply);
    }, [apply]);

    // Theme: Light / Dark / System
    const theme = state.preferences?.theme ?? "dark";
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: light)");
        const set = () => {
            document.documentElement.dataset.theme = theme === "system" ? (mq.matches ? "light" : "dark") : theme;
        };
        set();
        if (theme !== "system") return undefined;
        mq.addEventListener("change", set);
        return () => mq.removeEventListener("change", set);
    }, [theme]);

    const actions = useMemo(
        () => ({
            register: async (data) => apply(await authService.register(data)),
            login: async (data) => apply(await authService.login(data)),
            logout: async () => {
                await authService.logout();
                apply(EMPTY);
            },
            saveBusiness: async (business) => {
                const saved = await authService.saveBusiness(business);
                setState((s) => ({ ...s, business: saved }));
            },
            savePreferences: async (prefs) => {
                const saved = await authService.savePreferences(prefs);
                setState((s) => ({ ...s, preferences: saved }));
            },
            updateProfile: async (patch) => apply(await authService.updateProfile(patch)),
            changePassword: (data) => authService.changePassword(data),
            requestPasswordReset: (email) => authService.requestPasswordReset(email),
        }),
        [apply]
    );

    const value = useMemo(
        () => ({ ...state, isAuthenticated: Boolean(state.user), ...actions }),
        [state, actions]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}