import ConfirmModal from "../ui/ConfirmModal";
import { AUTH_LOGIN_URL } from "../../config/appConfig";

// Demo rejim: haqiqiy sessiya yo'q. Hozircha faqat NexoraAuth login sahifasiga yo'naltiradi.
export default function SignOutModal({ open, onClose }) {
    return (
        <ConfirmModal open={open} onClose={onClose} title="Sign out of Nexora?"
            description="You'll be taken to the sign-in page." confirmLabel="Sign out"
            onConfirm={() => window.location.assign(AUTH_LOGIN_URL)} />
    );
}