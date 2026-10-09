import { useMemo, useState } from "react";
import { Copy, Download } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import DateRangePicker from "../components/ui/DateRangePicker";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import FilterChips from "../components/ui/FilterChips";
import { useAnalytics } from "../hooks/useAnalytics";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";
import { buildReport } from "../features/reports/buildReport";
import { downloadFile, toCsv } from "../utils/csv";
import { formatCurrency, formatNumber, formatPercent } from "../utils/formatCurrency";

const TABS = [{ value: "orders", label: "orders" }, { value: "customers", label: "customers" }, { value: "products", label: "products" }];

export default function ReportsPage() {
    const { current, summary: s, from, to } = useAnalytics();
    const { customers, products, customersById } = useData();
    const toast = useToast();
    const [kind, setKind] = useState("orders");

    const report = useMemo(() => buildReport(kind, { orders: current, customers, products, customersById }), [kind, current, customers, products, customersById]);
    const csv = useMemo(() => toCsv(report.columns, report.rows), [report]);

    const copy = async () => {
        try { await navigator.clipboard.writeText(csv); toast.success("CSV copied to clipboard."); }
        catch { toast.error("Couldn't copy. Use Download CSV instead."); }
    };

    return (
        <>
            <PageHeader title="Reports" subtitle="Export your data as CSV"><DateRangePicker /></PageHeader>
            <div className="page-body">
                <Card title="Summary" hint={`${from} to ${to}`}>
                    <dl className="info info--cols">
                        <div className="info__row"><dt>Revenue (completed)</dt><dd>{formatCurrency(s.revenue)}</dd></div>
                        <div className="info__row"><dt>Orders</dt><dd>{formatNumber(s.orders)}</dd></div>
                        <div className="info__row"><dt>Cancel rate</dt><dd>{formatPercent(s.cancelRate)}</dd></div>
                        <div className="info__row"><dt>Active customers</dt><dd>{formatNumber(s.activeCustomers)}</dd></div>
                    </dl>
                </Card>
                <Card>
                    <div className="toolbar">
                        <FilterChips label="Report type" options={TABS} value={kind} onChange={setKind} />
                        <Button onClick={() => { downloadFile(`nexora-${kind}-${from}_${to}.csv`, csv); toast.success("Download started."); }}><Download size={16} aria-hidden="true" /> Download CSV</Button>
                        <Button variant="ghost" onClick={copy}><Copy size={16} aria-hidden="true" /> Copy CSV</Button>
                    </div>
                    <p className="muted">{report.rows.length} rows for {from} to {to}.</p>
                    <label className="sr-only" htmlFor="csv-preview">CSV preview</label>
                    <textarea id="csv-preview" className="csv" readOnly value={csv} rows={12} />
                </Card>
            </div>
        </>
    );
}