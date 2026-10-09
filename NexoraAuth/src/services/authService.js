import { storage, KEYS } from "./storage";
import { DEMO_USER, DEMO_BUSINESS, DEMO_PREFERENCES, DEMO_PASSWORD } from "../data/demoData";

/*
 * DEMO auth: hammasi localStorage'da. Keyinchalik shu fayldagi funksiyalar
 * NexoraBackend API chaqiruvlariga almashtiriladi (JWT/session), UI o'zgarmaydi.
 * Bu real xavfsizlik EMAS.
 */
export class AuthError extends Error { }

const wait = (ms = 500) => new Promise((r) => setTimeout(r, ms));
const normEmail = (e) => e.trim().toLowerCase();
const publicUser = ({ passwordHash, salt, ...rest }) => rest;
const INVALID = "Invalid email or password.";

async function hashPassword(password, salt) {
    const data = new TextEncoder().encode(`${salt}:${password}`);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function buildCredentials(password) {
    const salt = crypto.randomUUID();
    return { salt, passwordHash: await hashPassword(password, salt) };
}

function startSession(remember) {
    // Keyinchalik: backend bergan JWT shu yerda saqlanadi
    storage.setSession({ isAuthenticated: true, remember, token: crypto.randomUUID(), createdAt: Date.now() });
}

function getSnapshot() {
    const session = storage.getSession();
    const user = storage.get(KEYS.user);
    if (!session?.isAuthenticated || !user) return { user: null, business: null, preferences: null };
    return {
        user: publicUser(user),
        business: storage.get(KEYS.business),
        preferences: storage.get(KEYS.preferences),
    };
}

async function seedDemo() {
    storage.set(KEYS.user, { ...DEMO_USER, ...(await buildCredentials(DEMO_PASSWORD)) });
    storage.set(KEYS.business, DEMO_BUSINESS);
    storage.set(KEYS.preferences, DEMO_PREFERENCES);
}

export const authService = {
    async getCurrentUser() {
        return getSnapshot();
    },

    async register({ fullName, email, password }) {
        await wait();
        const clean = normEmail(email);
        if (storage.get(KEYS.user)?.email === clean) {
            throw new AuthError("An account with this email already exists. Try signing in.");
        }
        // Demo cheklov: bitta brauzerda bitta akkaunt saqlanadi
        storage.set(KEYS.user, {
            id: crypto.randomUUID(),
            fullName: fullName.trim(),
            email: clean,
            role: "Business Owner",
            createdAt: new Date().toISOString(),
            ...(await buildCredentials(password)),
        });
        storage.remove(KEYS.business);
        storage.remove(KEYS.preferences);
        startSession(true);
        return getSnapshot();
    },

    async login({ email, password, remember }) {
        await wait();
        const clean = normEmail(email);
        if (clean === DEMO_USER.email && password === DEMO_PASSWORD) await seedDemo();
        const stored = storage.get(KEYS.user);
        if (!stored || stored.email !== clean) throw new AuthError(INVALID);
        if ((await hashPassword(password, stored.salt)) !== stored.passwordHash) throw new AuthError(INVALID);
        startSession(remember);
        return getSnapshot();
    },

    async logout() {
        await wait(250);
        storage.clearSession();
    },

    async saveBusiness(business) {
        await wait(350);
        storage.set(KEYS.business, business);
        return business;
    },

    async savePreferences(preferences) {
        await wait(350);
        storage.set(KEYS.preferences, preferences);
        return preferences;
    },

    async updateProfile({ user, business }) {
        await wait(400);
        const stored = storage.get(KEYS.user);
        if (user) storage.set(KEYS.user, { ...stored, ...user, email: normEmail(user.email ?? stored.email) });
        if (business) storage.set(KEYS.business, { ...storage.get(KEYS.business), ...business });
        return getSnapshot();
    },

    async changePassword({ currentPassword, newPassword }) {
        await wait(450);
        const stored = storage.get(KEYS.user);
        if ((await hashPassword(currentPassword, stored.salt)) !== stored.passwordHash) {
            throw new AuthError("Current password is incorrect.");
        }
        storage.set(KEYS.user, { ...stored, ...(await buildCredentials(newPassword)) });
    },

    async requestPasswordReset() {
        await wait(600); // Email bor-yo'qligi oshkor qilinmaydi
        return true;
    },
};