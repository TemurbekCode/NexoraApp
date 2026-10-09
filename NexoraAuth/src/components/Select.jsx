import { useId } from "react";

export default function Select({ label, options, placeholder = "Select…", error, className = "", id, ...rest }) {
    const auto = useId();
    const selectId = id ?? auto;
    const errId = `${selectId}-error`;
    return (
        <div className={`field ${error ? "field--error" : ""} ${className}`.trim()}>
            <label className="field__label" htmlFor={selectId}>{label}</label>
            <div className="field__control">
                <select id={selectId} aria-invalid={Boolean(error)} aria-describedby={error ? errId : undefined} {...rest}>
                    <option value="">{placeholder}</option>
                    {options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                    ))}
                </select>
            </div>
            {error && <p id={errId} className="field__error" role="alert">{error}</p>}
        </div>
    );
}