import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { NAV_ITEMS } from "../../data/navigation";
import UserMenu from "./UserMenu";
import SignOutModal from "./SignOutModal";

export default function Sidebar({ open, collapsed, onToggleCollapse, onClose }) {
    const [signOut, setSignOut] = useState(false);
    const CollapseIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

    return (
        <aside id="app-sidebar" className={`sidebar ${open ? "sidebar--open" : ""}`} aria-label="Sidebar">
            <div className="sidebar__top">
                <NavLink to="/" className="brand" aria-label="Nexora" onClick={onClose}>
                    N<span className="brand__rest">ex<span className="brand__o">o</span>ra</span>
                </NavLink>
                <button type="button" className="icon-btn sidebar__collapse" onClick={onToggleCollapse}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-pressed={collapsed}>
                    <CollapseIcon size={18} aria-hidden="true" />
                </button>
                <button type="button" className="icon-btn sidebar__close" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
            </div>

            <nav aria-label="Main">
                <ul className="nav">
                    {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                        <li key={to}>
                            <NavLink to={to} onClick={onClose} title={collapsed ? label : undefined}
                                className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`}>
                                <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                                <span className="nav__label">{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <UserMenu onNavigate={onClose} onSignOut={() => setSignOut(true)} />
            <SignOutModal open={signOut} onClose={() => setSignOut(false)} />
        </aside>
    );
}