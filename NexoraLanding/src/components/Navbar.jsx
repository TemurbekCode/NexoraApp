import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import { ROUTES } from "../config/appConfig";
import { brand, navLinks } from "../data/landingData";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const close = () => setOpen(false);

    return (
        <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="container navbar__inner">
                <a href="#top" className="navbar__brand" aria-label={`${brand.name} home`}>
                    {brand.name}
                </a>

                <nav
                    id="primary-nav"
                    className={`navbar__nav ${open ? "is-open" : ""}`}
                    aria-label="Primary"
                >
                    <ul className="navbar__links">
                        {navLinks.map((l) => (
                            <li key={l.href}>
                                <a href={l.href} onClick={close}>
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="navbar__actions">
                        <a className="navbar__signin" href={ROUTES.login}>
                            Sign in
                        </a>
                        <Button href={ROUTES.register}>Get started</Button>
                    </div>
                </nav>

                <button
                    type="button"
                    className="navbar__toggle"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    aria-controls="primary-nav"
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
                </button>
            </div>
        </header>
    );
}