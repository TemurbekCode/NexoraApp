import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import ProgressSteps from "../components/ProgressSteps";
import LogoUpload from "../components/LogoUpload";
import BusinessFields from "../components/BusinessFields";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { PATHS } from "../config/appConfig";
import { useAuth } from "../context/AuthContext";
import { useFormState } from "../hooks/useFormState";
import { useSubmit } from "../hooks/useSubmit";

export default function BusinessSetup() {
    const { business, saveBusiness } = useAuth();
    const navigate = useNavigate();
    const form = useFormState({
        name: business?.name ?? "",
        type: business?.type ?? "",
        size: business?.size ?? "",
        country: business?.country ?? "",
        currency: business?.currency ?? "USD",
        logo: business?.logo ?? null,
    });

    const submit = useSubmit(async () => {
        if (!form.values.name.trim()) return form.setErrors({ name: "Business name is required" });
        await saveBusiness({ ...form.values, name: form.values.name.trim() });
        navigate(PATHS.preferences);
    });

    return (
        <AuthLayout variant="centered">
            <AuthCard wide title="Tell us about your business" subtitle="This helps Nexora organize your analytics and reports.">
                <ProgressSteps step={1} total={2} label="Business" />
                <form onSubmit={submit.onSubmit} noValidate className="form">
                    <Alert>{submit.error}</Alert>
                    <LogoUpload value={form.values.logo} onChange={(v) => form.set("logo", v)} />
                    <BusinessFields bind={form.bind} />
                    <div className="form__footer">
                        <Link className="link-btn link-btn--muted" to={PATHS.preferences}>Skip for now</Link>
                        <Button type="submit" loading={submit.loading} loadingText="Saving...">Continue</Button>
                    </div>
                </form>
            </AuthCard>
        </AuthLayout>
    );
}