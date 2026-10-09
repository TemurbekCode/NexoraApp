import { useId } from "react";

export default function Input({ label, error, hint, endAdornment, className = "", id, ...rest }) {
    const auto = useId();
    const inputId = id ?? auto;
    const errId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
        <div className={`field ${error ? "field--error" : ""} ${className}`.trim()}>
            <label className="field__label" htmlFor={inputId}>{label}</label>
            <div className="field__control">
                <input
                    id={inputId}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? errId : hint ? hintId : undefined}
                    {...rest}
                />
                {endAdornment}
            </div>
            {error ? (
                <p id={errId} className="field__error" role="alert">{error}</p>
            ) : hint ? (
                <p id={hintId} className="field__hint">{hint}</p>
            ) : null}
        </div>
    );
}