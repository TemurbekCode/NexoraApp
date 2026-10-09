import Modal from "../Modal";
import Button from "../Button";
import Alert from "../Alert";
import { useAuth } from "../../context/AuthContext";
import { useSubmit } from "../../hooks/useSubmit";

export default function SignOutModal({ open, onClose }) {
    const { logout } = useAuth();
    const submit = useSubmit(logout); // logout'dan keyin ProtectedRoute /login ga yuboradi

    return (
        <Modal open={open} onClose={onClose} title="Sign out of Nexora?"
            description="You'll need to sign in again to access your dashboard.">
            <form onSubmit={submit.onSubmit} className="form">
                <Alert>{submit.error}</Alert>
                <div className="modal__actions">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button type="submit" loading={submit.loading} loadingText="Signing out...">Sign out</Button>
                </div>
            </form>
        </Modal>
    );
}