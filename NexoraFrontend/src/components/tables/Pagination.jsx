import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button";

export default function Pagination({ page, pageCount, total, pageSize, onChange }) {
    if (total === 0) return null;
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);
    return (
        <nav className="pagination" aria-label="Pagination">
            <p>Showing {start}–{end} of {total}</p>
            <div>
                <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Previous page"><ChevronLeft size={16} /></Button>
                <span aria-current="page">Page {page} of {pageCount}</span>
                <Button variant="ghost" size="sm" disabled={page >= pageCount} onClick={() => onChange(page + 1)} aria-label="Next page"><ChevronRight size={16} /></Button>
            </div>
        </nav>
    );
}