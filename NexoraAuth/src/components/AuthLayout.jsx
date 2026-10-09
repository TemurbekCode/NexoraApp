import Logo from "./Logo";

export default function AuthLayout({ variant = "split", children }) {
    if (variant === "centered") {
        return (
            <div className="shell shell--centered">
                <header className="shell__top"><Logo /></header>
                <main className="shell__main">{children}</main>
            </div>
        );
    }
    return (
        <div className="shell shell--split">
            <aside className="brand-panel">
                <Logo />
                <div className="brand-panel__body">
                    <h1>Know where your revenue comes from.</h1>
                    <p>Turn your business data into decisions.</p>
                </div>
                <p className="brand-panel__note">Demo prototype. Nothing is sent or stored anywhere.</p>
            </aside>
            <main className="shell__main">{children}</main>
        </div>
    );
}