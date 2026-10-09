import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

// onClose'ni useCallback bilan bering
export default function Modal({ open, onClose, title, description, children }) {
    const ref = useRef(null);
    const titleId = useId();

    useEffect(() => {
        if (!open) return undefined;
        const previous = document.activeElement;
        document.body.style.overflow = "hidden";
        (ref.current?.querySelector("input,select") ?? ref.current)?.focus();

        const onKey = (e) => {
            if (e.key === "Escape") return onClose();
            if (e.key !== "Tab") return undefined;
            const items = ref.current.querySelectorAll(FOCUSABLE);
            if (!items.length) return undefined;
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            return undefined;
        };
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
            previous?.focus?.();
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} ref={ref}>
                <button type="button" className="modal__close" onClick={onClose} aria-label="Close dialog">
                    <X size={20} strokeWidth={1.75} aria-hidden="true" />
                </button>
                <h2 id={titleId} className="modal__title">{title}</h2>
                {description && <p className="modal__desc">{description}</p>}
                {children}
            </div>
        </div>
    );
}