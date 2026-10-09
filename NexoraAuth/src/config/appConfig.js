const env = import.meta.env;
const trim = (u) => u.replace(/\/+$/, "");

export const LANDING_URL = trim(env.VITE_LANDING_URL ?? "http://localhost:5173");
export const FRONTEND_URL = trim(env.VITE_FRONTEND_URL ?? "http://localhost:5175");

export const PATHS = {
    login: "/login",
    register: "/register",
    setup: "/setup",
    preferences: "/setup/preferences",
    dashboard: "/dashboard",
    profile: "/profile",
};