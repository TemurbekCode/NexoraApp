const trim = (u) => u.replace(/\/+$/, "");

export const AUTH_URL = trim(import.meta.env.VITE_AUTH_URL ?? "http://localhost:5174");
export const AUTH_LOGIN_URL = `${AUTH_URL}/login`;

export const STORAGE_KEYS = {
    data: "nexora_demo_data_v1",
    settings: "nexora_demo_settings_v1",
    sidebar: "nexora_sidebar_collapsed",
};