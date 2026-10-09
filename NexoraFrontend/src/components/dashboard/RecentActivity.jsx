import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";
import { StatusBadge } from "../ui/Badge";
import { formatCurrency, formatOrderId } from "../../utils/formatCurrency";
import { orderTotal } from "../../utils/calculateMetrics";

export default function RecentActivity({ orders, customersById, onOpen }) {
    return (
        <Card title="Recent activity" className="span-2">
            {orders.length === 0 ? (
                <EmptyState title="No orders yet" description="New orders will appear here." />
            ) : (
                <ul className="activity">
                    {orders.map((o) => (
                        <li key={o.id}>
                            <button type="button" onClick={() => onOpen(o.id)}>
                                <span className="activity__main">
                                    <strong>{formatOrderId(o.id)}</strong> · {customersById.get(o.customerId)?.name ?? "Unknown customer"}
                                    <small>{o.date}</small>
                                </span>
                                <span className="activity__amount">{formatCurrency(orderTotal(o))}</span>
                                <StatusBadge status={o.status} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
}