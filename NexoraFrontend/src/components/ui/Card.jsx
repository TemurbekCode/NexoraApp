export default function Card({ title, hint, action, className = "", children, ...rest }) {
    return (
        <section className={`card ${className}`.trim()} {...rest}>
            {(title || action) && (
                <header className="card__head">
                    <h2 className="card__title">{title}{hint && <small>{hint}</small>}</h2>
                    {action}
                </header>
            )}
            {children}
        </section>
    );
}