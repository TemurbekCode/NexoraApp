import { useState } from "react";
import Modal from "../Modal";
import PasswordInput from "../PasswordInput";
import Button from "../Button";
import Alert from "../Alert";
import { useAuth } from "../../context/AuthContext";
import { useFormState } from "../../hooks/useFormState";
import { useSubmit } from "../../hooks/useSubmit";
import { compact, hasErrors, validateNewPassword } from "../../utils/validators";

export default function ChangePasswordModal({ open, onClose }) {
    const { changePassword } = useAuth();
    const [done, setDone] = useState(false);
    const form = useFormState({ currentPassword: "", newPassword: "", confirm: "" });

    const submit = useSubmit(async () => {
        const v = form.values;
        const errors = compact({
            currentPassword: !v.currentPassword && "Current password is required",
            newPassword: validateNewPassword(v.newPassword),
            confirm: v.confirm !== v.newPassword && "Passwords do not match",
        });
        if (hasErrors(errors)) return form.setErrors(errors);
        await changePassword({ currentPassword: v.currentPassword, newPassword: v.newPassword });
        setDone(true);
    });

    return (
        <Modal open={open} onClose={onClose} title="Change password">
            {done ? (
                <>
                    <Alert variant="success">Your password has been updated.</Alert>
                    <div className="modal__actions"><Button onClick={onClose}>Done</Button></div>
                </>
            ) : (
                <form onSubmit={submit.onSubmit} noValidate className="form">
                    <Alert>{submit.error}</Alert>
                    <PasswordInput label="Current password" autoComplete="current-password" {...form.bind("currentPassword")} />
                    <PasswordInput label="New password" autoComplete="new-password" {...form.bind("newPassword")} />
                    <PasswordInput label="Confirm new password" autoComplete="new-password" {...form.bind("confirm")} />
                    <div className="modal__actions">
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button type="submit" loading={submit.loading} loadingText="Saving...">Update password</Button>
                    </div>
                </form>
            )}
        </Modal>
    );
}