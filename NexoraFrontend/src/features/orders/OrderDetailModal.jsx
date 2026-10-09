import Modal from "../../components/ui/Modal";
import { SelectField } from "../../components/ui/Field";
import { StatusBadge } from "../../components/ui/Badge";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import { ORDER_STATUSES } from "../../data/options";
import { orderTotal } from "../../utils/calculateMetrics";
import { formatCurrency, formatOrderId } from "../../utils/formatCurrency";

export default function OrderDetailModal({ orderId, onClose }) {
  const { orders, customersById, productsById, setOrderStatus } = useData();
  const toast = useToast();
  const order = orderId ? orders.find((o) => o.id === orderId) : null;
  const customer = order ? customersById.get(order.customerId) : null;

  const changeStatus = (e) => {
    setOrderStatus(order.id, e.target.value);
    toast.success(`${formatOrderId(order.id)} marked as ${e.target.value}. Totals updated.`);
  };

  return (
    <Modal open={Boolean(order)} onClose={onClose} wide title={order ? `Order ${formatOrderId(order.id)}` : ""}>
      {order && (
        <>
          <dl className="info info--cols">
            <div className="info__row"><dt>Customer</dt><dd>{customer?.name ?? "Unknown customer"}</dd></div>
            <div className="info__row"><dt>Email</dt><dd>{customer?.email ?? "—"}</dd></div>
            <div className="info__row"><dt>Country</dt><dd>{customer?.country ?? "—"}</dd></div>
            <div className="info__row"><dt>Date</dt><dd>{order.date}</dd></div>
            <div className="info__row"><dt>Status</dt><dd><StatusBadge status={order.status} /></dd></div>
          </dl>
          <SelectField label="Change status (demo)" value={order.status} onChange={changeStatus} options={ORDER_STATUSES}
            hint="Only completed orders count toward revenue." />
          <table className="table table--plain">
            <thead><tr><th>Product</th><th className="is-right">Qty</th><th className="is-right">Price</th><th className="is-right">Subtotal</th></tr></thead>
            <tbody>
              {order.items.map((i) => (
                <tr key={i.productId}>
                  <td>{productsById.get(i.productId)?.name ?? i.name}</td>
                  <td className="is-right">{i.quantity}</td>
                  <td className="is-right">{formatCurrency(i.unitPrice)}</td>
                  <td className="is-right">{formatCurrency(i.quantity * i.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot><tr><th colSpan={3} className="is-right">Total</th><th className="is-right">{formatCurrency(orderTotal(order))}</th></tr></tfoot>
          </table>
        </>
      )}
    </Modal>
  );
}