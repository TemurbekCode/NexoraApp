// "=", "+", "-", "@" bilan boshlanuvchi matn Excel'da formula sifatida ishlamasligi uchun
const escape = (v) => {
    let s = v == null ? "" : String(v);
    if (typeof v === "string" && /^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function toCsv(columns, rows) {
    const head = columns.map((c) => escape(c.header)).join(",");
    const body = rows.map((r) => columns.map((c) => escape(r[c.key])).join(","));
    return [head, ...body].join("\r\n");
}

export function downloadFile(filename, content, type = "text/csv;charset=utf-8") {
    const url = URL.createObjectURL(new Blob(["\uFEFF", content], { type }));
    const a = Object.assign(document.createElement("a"), { href: url, download: filename });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}