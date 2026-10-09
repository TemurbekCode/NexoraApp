import { useId } from "react";
import { Search } from "lucide-react";

function Wrapper({ id, label, hideLabel, error, hint, className, children }) {
    return (
        <div className={`field ${error ? "field--error" : ""} ${className ?? ""}`.trim()}>
            <label htmlFor={id} className={`field__label ${hideLabel ? "sr-only" : ""}`}>{label}</label>
            {children}
            {error ? <p className="field__error" role="alert">{error}</p> : hint ? <p className="field__hint">{hint}</p> : null}
        </div>
    );
}

export function TextField({ label, hideLabel, error, hint, className, id, ...rest }) {
    const auto = useId();
    const fid = id ?? auto;
    return (
        <Wrapper id={fid} {...{ label, hideLabel, error, hint, className }}>
            <input id={fid} className="input" aria-invalid={Boolean(error)} {...rest} />
        </Wrapper>
    );
}

export function SelectField({ label, hideLabel, options, error, hint, className, id, ...rest }) {
    const auto = useId();
    const fid = id ?? auto;
    return (
        <Wrapper id={fid} {...{ label, hideLabel, error, hint, className }}>
            <select id={fid} className="input" aria-invalid={Boolean(error)} {...rest}>
                {options.map((o) => {
                    const opt = typeof o === "string" ? { value: o, label: o } : o;
                    return <option key={opt.value} value={opt.value}>{opt.label}</option>;
                })}
            </select>
        </Wrapper>
    );
}

export function SearchInput({ label, ...rest }) {
    return (
        <div className="search">
            <Search size={18} aria-hidden="true" />
            <input type="search" className="input" aria-label={label} placeholder={label} {...rest} />
        </div>
    );
}