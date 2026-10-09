import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import LoadingState from "../ui/LoadingState";
import EmptyState from "../ui/EmptyState";
import Button from "../ui/Button";
import { AlertTriangle } from "lucide-react";
import { useData } from "../../context/DataContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../../config/appConfig";

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useLocalStorage(STORAGE_KEYS.sidebar, false);
    const [drawer, setDrawer] = useState(false);
    const { status, retry, resetDemo } = useData();

    useEffect(() => {
        if (!drawer) return undefined;
        const onKey = (e) => e.key === "Escape" && setDrawer(false);
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [drawer]);

    return (
        <div className={`app ${collapsed ? "app--collapsed" : ""}`}>
            <a className="skip-link" href="#main">Skip to content</a>
            {drawer && <div className="scrim" onClick={() => setDrawer(false)} aria-hidden="true" />}
            <Sidebar open={drawer} collapsed={collapsed} onToggleCollapse={() => setCollapsed((v) => !v)} onClose={() => setDrawer(false)} />
            <div className="content">
                <div className="mobile-bar">
                    <button type="button" className="icon-btn" onClick={() => setDrawer(true)} aria-label="Open menu" aria-expanded={drawer} aria-controls="app-sidebar"><Menu size={20} /></button>
                    <span className="brand">Nex<span className="brand__o">o</span>ra</span>
                </div>
                <main id="main" className="main" tabIndex={-1}>
                    {status === "loading" && <LoadingState />}
                    {status === "error" && (
                        <EmptyState icon={AlertTriangle} title="We couldn't load your data"
                            description="Your saved demo data may be unreadable."
                            action={<div className="row"><Button onClick={retry}>Try again</Button><Button variant="ghost" onClick={resetDemo}>Reset demo data</Button></div>} />
                    )}
                    {status === "ready" && <Outlet />}
                </main>
            </div>
        </div>
    );
}