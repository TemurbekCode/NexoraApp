import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmModal({ open, onClose, title, description, confirmLabel = "Confirm", tone = "primary", onConfirm }) {
    return (
        <Modal open={open} onClose={onClose} title={title} description={description}>
            <div className="modal__actions">
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button variant={tone === "danger" ? "danger" : "primary"} onClick={onConfirm}>{confirmLabel}</Button>
            </div>
        </Modal>
    );
}