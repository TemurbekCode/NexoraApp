import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import { FRONTEND_URL, PATHS } from "../config/appConfig";
import { useAuth } from "../context/AuthContext";

// Vaqtinchalik. Keyin shu route NexoraFrontend'ga ulanadi.
export default function DashboardPlaceholder() {
    const { user, business } = useAuth();
    return (
        <AuthLayout variant="centered">
            <section className="placeholder">
                <h1>Welcome to Nexora Dashboard</h1>
                <p className="muted">
                    Signed in as {user.fullName}{business?.name ? ` · ${business.name}` : ""}.
                </p>
                <div className="placeholder__actions">
                    <Button href={FRONTEND_URL}>Open dashboard</Button>
                    <Link className="btn btn--ghost" to={PATHS.profile}>Profile</Link>
                </div>
            </section>
        </AuthLayout>
    );
}