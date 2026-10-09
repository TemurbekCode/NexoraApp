import { Inbox } from "lucide-react";

export default function EmptyState({ icon: Icon = Inbox, title, description, action }) {
    return (
        <div className="empty">
            <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            {action}
        </div>
    );
}