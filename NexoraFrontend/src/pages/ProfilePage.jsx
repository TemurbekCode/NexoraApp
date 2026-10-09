import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import SignOutModal from "../components/layout/SignOutModal";
import { useSettings } from "../context/SettingsContext";
import { DEFAULT_VIEWS, THEMES } from "../data/options";

const label = (opts, v) => opts.find((o) => o.value === v)?.label ?? "—";
const Rows = ({ rows }) => (
    <dl className="info">
        {rows.map(([k, v]) => <div key={k} className="info__row"><dt>{k}</dt><dd>{v || "—"}</dd></div>)}
    </dl>
);

export default function ProfilePage() {
    const { profile: p, preferences: pref } = useSettings();
    const [signOut, setSignOut] = useState(false);
    const close = useCallback(() => setSignOut(false), []);
    const b = p.business;
    const since = new Date(p.memberSince).toLocaleDateString("en-US", { month: "long", year: "numeric" });

    return (
        <>
            <PageHeader title="Profile" subtitle="Your account and business" />
            <div className="grid-3">
                <Card title="User"><Rows rows={[["Full name", p.fullName], ["Email", p.email], ["Role", p.role], ["Member since", since]]} /></Card>
                <Card title="Business"><Rows rows={[["Business name", b.name], ["Type", b.type], ["Country", b.country], ["Currency", b.currency], ["Size", b.size]]} /></Card>
                <Card title="Account preferences">
                    <Rows rows={[["Theme", label(THEMES, pref.theme)], ["Default view", label(DEFAULT_VIEWS, pref.defaultView)],
                    ["Notifications", Object.values(pref.notifications).filter(Boolean).length + " enabled"]]} />
                </Card>
            </div>
            <div className="row spaced">
                <Link className="btn btn--primary" to="/settings">Edit in settings</Link>
                <Button variant="ghost" onClick={() => setSignOut(true)}>Sign out</Button>
            </div>
            <SignOutModal open={signOut} onClose={close} />
        </>
    );
}