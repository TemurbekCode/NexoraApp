import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import { SelectField, TextField } from "../components/ui/Field";
import { useSettings } from "../context/SettingsContext";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";
import { BUSINESS_SIZES, BUSINESS_TYPES, DEFAULT_VIEWS, NOTIFICATION_OPTIONS, THEMES } from "../data/options";

export default function SettingsPage() {
    const { profile, preferences, setPreference, setNotification, updateBusiness } = useSettings();
    const { resetDemo } = useData();
    const toast = useToast();
    const [biz, setBiz] = useState(profile.business);
    const [error, setError] = useState("");
    const [confirmReset, setConfirmReset] = useState(false);
    const set = (k) => (e) => setBiz((b) => ({ ...b, [k]: e.target.value }));

    const saveBusiness = (e) => {
        e.preventDefault();
        if (!biz.name.trim()) return setError("Business name is required");
        setError("");
        updateBusiness({ ...biz, name: biz.name.trim() });
        return toast.success("Business information saved.");
    };

    return (
        <>
            <PageHeader title="Settings" subtitle="Theme and preferences" />
            <div className="page-body page-body--narrow">
                <Card title="Preferences" hint="saved in this browser">
                    <div className="form-grid">
                        <SelectField label="Theme" value={preferences.theme} onChange={(e) => setPreference("theme", e.target.value)} options={THEMES} />
                        <SelectField label="Default dashboard view" value={preferences.defaultView} onChange={(e) => setPreference("defaultView", e.target.value)} options={DEFAULT_VIEWS} />
                        <SelectField label="Currency" value="USD" disabled options={["USD"]}
                            hint="Exchange-rate conversion isn't available yet, so all amounts stay in USD." />
                    </div>
                    <fieldset className="fieldset">
                        <legend className="field__label">Notifications</legend>
                        {NOTIFICATION_OPTIONS.map((n) => (
                            <label key={n.key} className="check">
                                <input type="checkbox" checked={preferences.notifications[n.key]} onChange={(e) => setNotification(n.key, e.target.checked)} />
                                <span>{n.label}</span>
                            </label>
                        ))}
                    </fieldset>
                </Card>

                <Card title="Business information">
                    <form className="form" onSubmit={saveBusiness} noValidate>
                        <TextField label="Business name" value={biz.name} onChange={set("name")} error={error} />
                        <div className="form-grid">
                            <SelectField label="Business type" value={biz.type} onChange={set("type")} options={BUSINESS_TYPES} />
                            <SelectField label="Business size" value={biz.size} onChange={set("size")} options={BUSINESS_SIZES} />
                            <TextField label="Country" value={biz.country} onChange={set("country")} />
                        </div>
                        <div><Button type="submit">Save changes</Button></div>
                    </form>
                </Card>

                <Card title="Demo data">
                    <p className="muted">Everything here lives in this browser. Reset to regenerate the sample orders, customers and products.</p>
                    <div className="spaced"><Button variant="ghost" onClick={() => setConfirmReset(true)}>Reset demo data</Button></div>
                </Card>
            </div>
            <ConfirmModal open={confirmReset} onClose={() => setConfirmReset(false)} tone="danger" confirmLabel="Reset"
                title="Reset demo data?" description="Your changes to orders and products will be replaced with fresh sample data."
                onConfirm={() => { setConfirmReset(false); resetDemo(); toast.success("Demo data reset."); }} />
        </>
    );
}