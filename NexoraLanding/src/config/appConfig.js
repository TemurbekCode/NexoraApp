const env = import.meta.env;

const trimSlash = (url) => url.replace(/\/+$/, "");

export const AUTH_URL = trimSlash(env.VITE_AUTH_URL ?? "http://localhost:5174");
export const FRONTEND_URL = trimSlash(env.VITE_FRONTEND_URL ?? "http://localhost:5175");

export const ROUTES = {
    login: `${AUTH_URL}/login`,
    register: `${AUTH_URL}/register`,
    dashboard: FRONTEND_URL,
};