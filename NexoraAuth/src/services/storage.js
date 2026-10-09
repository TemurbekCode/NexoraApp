export const KEYS = {
    user: "nexora_user",
    business: "nexora_business",
    preferences: "nexora_preferences",
    auth: "nexora_auth",
};

const read = (store, key) => {
    try {
        const raw = store.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const storage = {
    get: (key) => read(localStorage, key),
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    remove: (key) => localStorage.removeItem(key),

    // "Remember me" yoqilmasa sessiya faqat brauzer yopilguncha yashaydi
    getSession: () => read(localStorage, KEYS.auth) ?? read(sessionStorage, KEYS.auth),
    setSession: (session) => {
        const [keep, drop] = session.remember ? [localStorage, sessionStorage] : [sessionStorage, localStorage];
        drop.removeItem(KEYS.auth);
        keep.setItem(KEYS.auth, JSON.stringify(session));
    },
    clearSession: () => {
        localStorage.removeItem(KEYS.auth);
        sessionStorage.removeItem(KEYS.auth);
    },
};