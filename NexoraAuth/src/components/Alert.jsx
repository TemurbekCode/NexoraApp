import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function Alert({ variant = "error", children }) {
    if (!children) return null;
    const Icon = variant === "success" ? CheckCircle2 : AlertCircle;
    return (
        <div className={`alert alert--${variant}`} role={variant === "error" ? "alert" : "status"}>
            <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>{children}</span>
        </div>
    );
}