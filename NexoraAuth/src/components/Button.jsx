export default function Button({
    variant = "primary", loading = false, loadingText, disabled, href, block,
    type = "button", className = "", children, ...rest
}) {
    const cls = `btn btn--${variant} ${block ? "btn--block" : ""} ${className}`.trim();
    if (href) return <a className={cls} href={href} {...rest}>{children}</a>;
    return (
        <button type={type} className={cls} disabled={disabled || loading} aria-busy={loading} {...rest}>
            {loading && <span className="spinner" aria-hidden="true" />}
            {loading && loadingText ? loadingText : children}
        </button>
    );
}