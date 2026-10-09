import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { PATHS } from "../config/appConfig";
import { useAuth } from "../context/AuthContext";
import { useFormState } from "../hooks/useFormState";
import { useSubmit } from "../hooks/useSubmit";
import { compact, hasErrors, validateEmail, validateNewPassword } from "../utils/validators";

export default function Register() {
    const { register } = useAuth();
    const form = useFormState({ fullName: "", email: "", password: "", confirm: "", terms: false });

    // Muvaffaqiyatdan keyin PublicOnlyRoute avtomatik /setup ga yo'naltiradi
    const submit = useSubmit(async () => {
        const v = form.values;
        const errors = compact({
            fullName: !v.fullName.trim() && "Full name is required",
            email: validateEmail(v.email),
            password: validateNewPassword(v.password),
            confirm: v.confirm !== v.password && "Passwords do not match",
            terms: !v.terms && "Please accept the Terms",
        });
        if (hasErrors(errors)) return form.setErrors(errors);
        await register({ fullName: v.fullName, email: v.email, password: v.password });
    });

    return (
        <AuthLayout>
            <AuthCard title="Create your Nexora account" subtitle="Start understanding where your revenue comes from.">
                <form onSubmit={submit.onSubmit} noValidate className="form">
                    <Alert>{submit.error}</Alert>
                    <Input label="Full name" autoComplete="name" {...form.bind("fullName")} />
                    <Input label="Email" type="email" autoComplete="email" {...form.bind("email")} />
                    <PasswordInput label="Password" autoComplete="new-password" {...form.bind("password")} />
                    <PasswordInput label="Confirm password" autoComplete="new-password" {...form.bind("confirm")} />
                    <Checkbox label={<>I agree to the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a></>} {...form.bindCheck("terms")} />
                    <Button type="submit" block loading={submit.loading} loadingText="Creating account...">Create account</Button>
                </form>
                <p className="auth-card__switch">Already have an account? <Link to={PATHS.login}>Sign in</Link></p>
            </AuthCard>
        </AuthLayout>
    );
}