import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import Alert from "../Alert";
import BusinessFields from "../BusinessFields";
import { useAuth } from "../../context/AuthContext";
import { useFormState } from "../../hooks/useFormState";
import { useSubmit } from "../../hooks/useSubmit";
import { compact, hasErrors, validateEmail } from "../../utils/validators";

export default function EditProfileModal({ open, onClose }) {
    const { user, business, updateProfile } = useAuth();
    const form = useFormState({
        fullName: user.fullName,
        email: user.email,
        name: business?.name ?? "",
        type: business?.type ?? "",
        size: business?.size ?? "",
        country: business?.country ?? "",
        currency: business?.currency ?? "",
    });

    const submit = useSubmit(async () => {
        const v = form.values;
        const errors = compact({
            fullName: !v.fullName.trim() && "Full name is required",
            email: validateEmail(v.email),
            name: !v.name.trim() && "Business name is required",
        });
        if (hasErrors(errors)) return form.setErrors(errors);
        await updateProfile({
            user: { fullName: v.fullName.trim(), email: v.email },
            business: { name: v.name.trim(), type: v.type, size: v.size, country: v.country, currency: v.currency },
        });
        onClose();
    });

    return (
        <Modal open={open} onClose={onClose} title="Edit profile">
            <form onSubmit={submit.onSubmit} noValidate className="form">
                <Alert>{submit.error}</Alert>
                <Input label="Full name" autoComplete="name" {...form.bind("fullName")} />
                <Input label="Email" type="email" autoComplete="email" {...form.bind("email")} />
                <BusinessFields bind={form.bind} />
                <div className="modal__actions">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button type="submit" loading={submit.loading} loadingText="Saving...">Save changes</Button>
                </div>
            </form>
        </Modal>
    );
}