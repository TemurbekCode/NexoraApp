import { useEffect } from "react";

export default function PageHeader({ title, subtitle, children }) {
    useEffect(() => { document.title = `${title} · Nexora`; }, [title]);
    return (
        <header className="page-header">
            <div>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>
            {children && <div className="page-header__actions">{children}</div>}
        </header>
    );
}