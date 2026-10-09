import { Check } from "lucide-react";

export default function Checkbox({ label, error, ...rest }) {
    return (
        <div className={`check-wrap ${error ? "field--error" : ""}`}>
            <label className="check">
                <input type="checkbox" aria-invalid={Boolean(error)} {...rest} />
                <span className="check__box" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                <span className="check__label">{label}</span>
            </label>
            {error && <p className="field__error" role="alert">{error}</p>}
        </div>
    );
}