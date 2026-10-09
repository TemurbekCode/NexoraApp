import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import ProgressSteps from "../components/ProgressSteps";
import SegmentedControl from "../components/SegmentedControl";
import Select from "../components/Select";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { PATHS } from "../config/appConfig";
import { CURRENCIES, DASHBOARD_VIEWS, NOTIFICATION_OPTIONS, THEMES } from "../data/options";
import { useAuth } from "../context/AuthContext";
import { useFormState } from "../hooks/useFormState";
import { useSubmit } from "../hooks/useSubmit";

export default function Preferences() {
    const { business, preferences, savePreferences } = useAuth();
    const navigate = useNavigate();
    const form = useFormState({
        theme: preferences?.theme ?? "dark",
        currency: preferences?.currency ?? business?.currency ?? "USD",
        dashboardView: preferences?.dashboardView ?? "overview",
        notifications: preferences?.notifications ?? { revenueAlerts: false, dailySummary: false, weeklyReports: false },
    });
    const { values, set } = form;

    const submit = useSubmit(async () => {
        await savePreferences({ ...values, onboarded: true });
        navigate(PATHS.dashboard);
    });

    return (
        <AuthLayout variant="centered">
            <AuthCard wide title="Customize your workspace" subtitle="You can change these any time in settings.">
                <ProgressSteps step={2} total={2} label="Preferences" />
                <form onSubmit={submit.onSubmit} className="form">
                    <Alert>{submit.error}</Alert>
                    <SegmentedControl legend="Theme" name="theme" value={values.theme} onChange={(v) => set("theme", v)} options={THEMES} />
                    <Select label="Default currency" options={CURRENCIES} value={values.currency}
                        onChange={(e) => set("currency", e.target.value)} />
                    <SegmentedControl legend="Default dashboard view" name="dashboardView" value={values.dashboardView}
                        onChange={(v) => set("dashboardView", v)} options={DASHBOARD_VIEWS} />
                    <fieldset className="fieldset">
                        <legend className="field__label">Notifications</legend>
                        {NOTIFICATION_OPTIONS.map((n) => (
                            <Checkbox key={n.key} label={n.label} checked={values.notifications[n.key]}
                                onChange={(e) => set("notifications", { ...values.notifications, [n.key]: e.target.checked })} />
                        ))}
                    </fieldset>
                    <div className="form__footer">
                        <Button variant="ghost" onClick={() => navigate(PATHS.setup)}>Back</Button>
                        <Button type="submit" loading={submit.loading} loadingText="Saving...">Finish setup</Button>
                    </div>
                </form>
            </AuthCard>
        </AuthLayout>
    );
}