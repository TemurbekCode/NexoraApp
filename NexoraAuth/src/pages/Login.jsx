import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Alert from "../components/Alert";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import { PATHS } from "../config/appConfig";
import { DEMO_PASSWORD, DEMO_USER } from "../data/demoData";
import { useAuth } from "../context/AuthContext";
import { useFormState } from "../hooks/useFormState";
import { useSubmit } from "../hooks/useSubmit";
import { compact, hasErrors, validateEmail } from "../utils/validators";

export default function Login() {
    const { login } = useAuth();
    const [forgotOpen, setForgotOpen] = useState(false);
    const closeForgot = useCallback(() => setForgotOpen(false), []);
    const form = useFormState({ email: "", password: "", remember: true });

    const submit = useSubmit(async () => {
        const v = form.values;
        const errors = compact({
            email: validateEmail(v.email),
            password: !v.password && "Password is required",
        });
        if (hasErrors(errors)) return form.setErrors(errors);
        await login({ email: v.email, password: v.password, remember: v.remember });
    });

    const fillDemo = () => {
        form.set("email", DEMO_USER.email);
        form.set("password", DEMO_PASSWORD);
    };

    return (
        <AuthLayout>
            <AuthCard title="Welcome back" subtitle="Sign in to continue to your Nexora dashboard.">
                <form onSubmit={submit.onSubmit} noValidate className="form">
                    <Alert>{submit.error}</Alert>
                    <Input label="Email" type="email" autoComplete="email" {...form.bind("email")} />
                    <PasswordInput label="Password" autoComplete="current-password" {...form.bind("password")} />
                    <div className="form__row">
                        <Checkbox label="Remember me" {...form.bindCheck("remember")} />
                        <button type="button" className="link-btn" onClick={() => setForgotOpen(true)}>Forgot password?</button>
                    </div>
                    <Button type="submit" block loading={submit.loading} loadingText="Signing in...">Sign in</Button>
                </form>
                <p className="auth-card__switch">
                    Don&apos;t have an account? <Link to={PATHS.register}>Create one</Link>
                </p>
                <button type="button" className="link-btn link-btn--muted" onClick={fillDemo}>Use demo account</button>
            </AuthCard>
            <ForgotPasswordModal open={forgotOpen} onClose={closeForgot} defaultEmail={form.values.email} />
        </AuthLayout>
    );
}