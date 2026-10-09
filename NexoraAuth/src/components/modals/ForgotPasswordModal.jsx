import { useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import Alert from "../Alert";
import { useAuth } from "../../context/AuthContext";
import { useSubmit } from "../../hooks/useSubmit";
import { validateEmail } from "../../utils/validators";

export default function ForgotPasswordModal({ open, onClose, defaultEmail = "" }) {
    const { requestPasswordReset } = useAuth();
    const [email, setEmail] = useState(defaultEmail);
    const [fieldError, setFieldError] = useState("");
    const [sent, setSent] = useState(false);

    const submit = useSubmit(async () => {
        const err = validateEmail(email);
        if (err) return setFieldError(err);
        await requestPasswordReset(email);
        setSent(true);
    });

    return (
        <Modal open={open} onClose={onClose} title="Reset your password"
            description="Enter your email and we'll send you a link to reset your password.">
            {sent ? (
                <>
                    <Alert variant="success">If this email exists, a reset link would be sent.</Alert>
                    <div className="modal__actions"><Button onClick={onClose}>Done</Button></div>
                </>
            ) : (
                <form onSubmit={submit.onSubmit} noValidate className="form">
                    <Alert>{submit.error}</Alert>
                    <Input label="Email" type="email" autoComplete="email" value={email} error={fieldError}
                        onChange={(e) => { setEmail(e.target.value); setFieldError(""); }} />
                    <div className="modal__actions">
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button type="submit" loading={submit.loading} loadingText="Sending...">Send reset link</Button>
                    </div>
                </form>
            )}
        </Modal>
    );
}