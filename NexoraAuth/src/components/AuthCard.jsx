export default function AuthCard({ title, subtitle, wide = false, children }) {
    return (
        <section className={`auth-card ${wide ? "auth-card--wide" : ""}`}>
            <h2 className="auth-card__title">{title}</h2>
            {subtitle && <p className="auth-card__subtitle">{subtitle}</p>}
            {children}
        </section>
    );
}