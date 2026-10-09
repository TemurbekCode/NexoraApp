import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [items, setItems] = useState([]);
    const dismiss = useCallback((id) => setItems((l) => l.filter((t) => t.id !== id)), []);
    const push = useCallback((tone, message) => {
        const id = crypto.randomUUID();
        setItems((l) => [...l, { id, tone, message }]);
        setTimeout(() => dismiss(id), 3500);
    }, [dismiss]);

    const api = useMemo(() => ({ success: (m) => push("success", m), error: (m) => push("error", m) }), [push]);

    return (
        <ToastContext.Provider value={api}>
            {children}
            <div className="toasts" role="status" aria-live="polite">
                {items.map((t) => (
                    <div key={t.id} className={`toast toast--${t.tone}`}>
                        {t.tone === "success" ? <CheckCircle2 size={18} aria-hidden="true" /> : <AlertCircle size={18} aria-hidden="true" />}
                        <span>{t.message}</span>
                        <button type="button" aria-label="Dismiss notification" onClick={() => dismiss(t.id)}><X size={16} /></button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
    return ctx;
}