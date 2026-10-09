import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import Pagination from "./Pagination";

const compare = (x, y) => {
    if (x === y) return 0;
    if (typeof x === "string" || typeof y === "string") return String(x ?? "").localeCompare(String(y ?? ""));
    return (x ?? -Infinity) - (y ?? -Infinity);
};

/** columns: [{ key, header, render(row), sortValue?(row), align? }]  Birinchi ustun bosiladigan tugma bo'ladi. */
export default function DataTable({ columns, rows, rowKey, onRowClick, pageSize = 10, initialSort = null, resetPageKey, empty, caption }) {
    const [sort, setSort] = useState(initialSort);
    const [page, setPage] = useState(1);
    const [prevKey, setPrevKey] = useState(resetPageKey);
    if (prevKey !== resetPageKey) { setPrevKey(resetPageKey); setPage(1); }

    const sorted = useMemo(() => {
        const col = columns.find((c) => c.key === sort?.key);
        if (!col?.sortValue) return rows;
        const dir = sort.dir === "asc" ? 1 : -1;
        return [...rows].sort((a, b) => compare(col.sortValue(a), col.sortValue(b)) * dir);
    }, [rows, sort, columns]);

    if (!rows.length) return empty;

    const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
    const current = Math.min(page, pageCount);
    const visible = sorted.slice((current - 1) * pageSize, current * pageSize);
    const toggle = (key) => setSort((s) => (s?.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" }));

    return (
        <>
            <table className="table table--cards">
                <caption className="sr-only">{caption}</caption>
                <thead>
                    <tr>
                        {columns.map((c) => {
                            const Icon = sort?.key === c.key ? (sort.dir === "asc" ? ArrowUp : ArrowDown) : ChevronsUpDown;
                            return (
                                <th key={c.key} scope="col" className={c.align === "right" ? "is-right" : ""}
                                    aria-sort={sort?.key === c.key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}>
                                    {c.sortValue
                                        ? <button type="button" className="th-sort" onClick={() => toggle(c.key)}>{c.header}<Icon size={14} aria-hidden="true" /></button>
                                        : c.header}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {visible.map((row) => (
                        <tr key={rowKey(row)} className={onRowClick ? "is-clickable" : ""} onClick={onRowClick ? () => onRowClick(row) : undefined}>
                            {columns.map((c, i) => (
                                <td key={c.key} data-label={c.header} className={c.align === "right" ? "is-right" : ""}>
                                    {i === 0 && onRowClick ? <button type="button" className="cell-link">{c.render(row)}</button> : c.render(row)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination page={current} pageCount={pageCount} total={sorted.length} pageSize={pageSize} onChange={setPage} />
        </>
    );
}