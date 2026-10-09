export default function Button({ variant = "primary", size, loading = false, disabled, href, type = "button", className = "", children, ...rest }) {
    const cls = `btn btn--${variant} ${size ? `btn--${size}` : ""} ${className}`.trim();
    if (href) return <a className={cls} href={href} {...rest}>{children}</a>;
    return (
        <button type={type} className={cls} disabled={disabled || loading} aria-busy={loading} {...rest}>
            {loading && <span className="spinner" aria-hidden="true" />}
            {children}
        </button>
    );
}