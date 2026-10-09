import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";

const initials = (name) => name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

export default function UserMenu({ onNavigate, onSignOut }) {
    const { profile } = useSettings();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
    }, [open]);

    const go = () => { setOpen(false); onNavigate?.(); };

    return (
        <div className="usermenu" ref={ref}>
            {open && (
                <div className="usermenu__pop" role="menu">
                    <Link role="menuitem" to="/profile" onClick={go}><User size={16} aria-hidden="true" /> Profile</Link>
                    <Link role="menuitem" to="/settings" onClick={go}><Settings size={16} aria-hidden="true" /> Settings</Link>
                    <button type="button" role="menuitem" onClick={() => { setOpen(false); onSignOut(); }}><LogOut size={16} aria-hidden="true" /> Sign out</button>
                </div>
            )}
            <button type="button" className="usermenu__btn" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
                <span className="avatar" aria-hidden="true">{initials(profile.fullName)}</span>
                <span className="usermenu__text"><strong>{profile.fullName}</strong><small>{profile.role}</small></span>
                <ChevronsUpDown className="usermenu__chevron" size={16} aria-hidden="true" />
            </button>
        </div>
    );
}