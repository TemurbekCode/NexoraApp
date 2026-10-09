export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const MIN_PASSWORD = 8;

export function validateEmail(value) {
    if (!value.trim()) return "Email is required";
    if (!isEmail(value)) return "Enter a valid email address";
}

export function validateNewPassword(value) {
    if (!value) return "Password is required";
    if (value.length < MIN_PASSWORD) return `Use at least ${MIN_PASSWORD} characters`;
}

export const compact = (errors) => Object.fromEntries(Object.entries(errors).filter(([, v]) => v));
export const hasErrors = (errors) => Object.keys(errors).length > 0;