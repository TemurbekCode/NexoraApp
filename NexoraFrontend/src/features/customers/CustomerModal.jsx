import Modal from "../../components/ui/Modal";
import { StatusBadge } from "../../components/ui/Badge";
import { orderTotal, byNewest } from "../../utils/calculateMetrics";
import { formatCurrency, formatOrderId } from "../../utils/formatCurrency";

// orders: tanlangan davrdagi buyurtmalar
export default function CustomerModal({ customer, orders, onClose }) {
    const mine = customer ? orders.filter((o) => o.customerId === customer.id).sort(byNewest) : [];
    const spent = mine.filter((o) => o.status === "completed").reduce((s, o) => s + orderTotal(o), 0);

    return (
        <Modal open={Boolean(customer)} onClose={onClose} wide title={customer?.name ?? ""} description={customer?.email}>
            {customer && (
                <>
                    <dl className="info info--cols">
                        <div className="info__row"><dt>Country</dt><dd>{customer.country}</dd></div>
                        <div className="info__row"><dt>Orders in period</dt><dd>{mine.length}</dd></div>
                        <div className="info__row"><dt>Total spent (completed)</dt><dd>{formatCurrency(spent)}</dd></div>
                    </dl>
                    <ul className="activity activity--modal">
                        {mine.slice(0, 8).map((o) => (
                            <li key={o.id}>
                                <div>
                                    <span className="activity__main"><strong>{formatOrderId(o.id)}</strong><small>{o.date}</small></span>
                                    <span className="activity__amount">{formatCurrency(orderTotal(o))}</span>
                                    <StatusBadge status={o.status} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </Modal>
    );
}