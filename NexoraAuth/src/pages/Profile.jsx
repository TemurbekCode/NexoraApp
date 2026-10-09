import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import EditProfileModal from "../components/modals/EditProfileModal";
import ChangePasswordModal from "../components/modals/ChangePasswordModal";
import SignOutModal from "../components/modals/SignOutModal";
import { PATHS } from "../config/appConfig";
import { NOTIFICATION_OPTIONS } from "../data/options";
import { useAuth } from "../context/AuthContext";

const label = (options, value) => options.find((o) => o.value === value)?.label ?? "—";

function InfoList({ title, rows }) {
    return (
        <section className="profile-card">
            <h2>{title}</h2>
            <dl className="info">
                {rows.map(([k, v]) => (
                    <div key={k} className="info__row">
                        <dt>{k}</dt>
                        <dd>{v || "—"}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}

export default function Profile() {
    const { user, business, preferences } = useAuth();
    const [modal, setModal] = useState(null); // "edit" | "password" | "signout" | null
    const close = useCallback(() => setModal(null), []);

    const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const enabled = NOTIFICATION_OPTIONS.filter((n) => preferences?.notifications?.[n.key]).map((n) => n.label);

    return (
        <AuthLayout variant="centered">
            <div className="profile">
                <Link to={PATHS.dashboard} className="back-link">
                    <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" /> Back to dashboard
                </Link>

                <header className="profile__head">
                    <div className="avatar" aria-hidden="true">
                        {user.fullName.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
                    </div>
                    <div>
                        <h1>{user.fullName}</h1>
                        <p className="muted">{user.email}</p>
                    </div>
                </header>

                <div className="profile__grid">
                    <InfoList title="User" rows={[["Full name", user.fullName], ["Email", user.email], ["Role", user.role], ["Member since", memberSince]]} />
                    <InfoList title="Business" rows={[["Business name", business?.name], ["Business type", business?.type], ["Country", business?.country], ["Currency", business?.currency], ["Business size", business?.size]]} />
                    <InfoList title="Account" rows={[
                        ["Account status", "Active"],
                        ["Theme", label([{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }, { value: "system", label: "System" }], preferences?.theme)],
                        ["Default dashboard", preferences?.dashboardView && preferences.dashboardView[0].toUpperCase() + preferences.dashboardView.slice(1)],
                        ["Notifications", enabled.length ? enabled.join(", ") : "None"],
                    ]} />
                </div>

                <div className="profile__actions">
                    <Button onClick={() => setModal("edit")}>Edit profile</Button>
                    <Button variant="secondary" onClick={() => setModal("password")}>Change password</Button>
                    <Button variant="ghost" onClick={() => setModal("signout")}>Sign out</Button>
                </div>
            </div>

            {modal === "edit" && <EditProfileModal open onClose={close} />}
            {modal === "password" && <ChangePasswordModal open onClose={close} />}
            {modal === "signout" && <SignOutModal open onClose={close} />}
        </AuthLayout>
    );
}