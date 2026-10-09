import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { TextField } from "../../components/ui/Field";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";

// Parent faqat kerak bo'lganda render qiladi: product=null -> "Add", aks holda "Edit"
export default function ProductFormModal({ product, categories, onClose }) {
    const { saveProduct } = useData();
    const toast = useToast();
    const [v, setV] = useState({
        name: product?.name ?? "", sku: product?.sku ?? "", category: product?.category ?? "",
        price: product ? String(product.price) : "", stock: product?.stock == null ? "" : String(product.stock),
    });
    const [errors, setErrors] = useState({});
    const set = (k) => (e) => { setV((s) => ({ ...s, [k]: e.target.value })); setErrors((x) => ({ ...x, [k]: undefined })); };

    const submit = (e) => {
        e.preventDefault();
        const err = {};
        const price = Number(v.price);
        const stock = v.stock === "" ? null : Number(v.stock);
        if (!v.name.trim()) err.name = "Product name is required";
        if (!v.category.trim()) err.category = "Category is required";
        if (v.price === "" || !Number.isFinite(price) || price <= 0) err.price = "Enter a price greater than 0";
        if (stock !== null && (!Number.isInteger(stock) || stock < 0)) err.stock = "Use a whole number, 0 or more";
        if (Object.keys(err).length) return setErrors(err);

        const uid = Date.now().toString(36).toUpperCase();
        saveProduct({
            id: product?.id ?? `PROD-${uid}`, sku: v.sku.trim() || `SKU-${uid}`, name: v.name.trim(),
            category: v.category.trim(), price, stock, currency: "USD",
        });
        toast.success(product ? "Product updated." : "Product added.");
        return onClose();
    };

    return (
        <Modal open onClose={onClose} title={product ? "Edit product" : "Add product"}>
            <form className="form" onSubmit={submit} noValidate>
                <TextField label="Product name" value={v.name} onChange={set("name")} error={errors.name} />
                <div className="grid-2">
                    <TextField label="SKU (optional)" value={v.sku} onChange={set("sku")} />
                    <TextField label="Category" list="category-list" value={v.category} onChange={set("category")} error={errors.category} />
                </div>
                <div className="grid-2">
                    <TextField label="Price (USD)" type="number" min="0" step="0.01" inputMode="decimal" value={v.price} onChange={set("price")} error={errors.price} />
                    <TextField label="Stock (optional)" type="number" min="0" step="1" value={v.stock} onChange={set("stock")} error={errors.stock} />
                </div>
                <datalist id="category-list">{categories.map((c) => <option key={c} value={c} />)}</datalist>
                <div className="modal__actions">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button type="submit">{product ? "Save changes" : "Add product"}</Button>
                </div>
            </form>
        </Modal>
    );
}