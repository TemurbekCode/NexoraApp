import { useState } from "react";
import { Building2 } from "lucide-react";

const MAX_BYTES = 1024 * 1024;

export default function LogoUpload({ value, onChange }) {
    const [error, setError] = useState("");

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) return setError("Please choose an image file.");
        if (file.size > MAX_BYTES) return setError("Logo must be under 1 MB.");
        setError("");
        const reader = new FileReader();
        reader.onload = () => onChange(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <div className="logo-upload">
            <div className="logo-upload__preview">
                {value ? <img src={value} alt="Business logo preview" /> : <Building2 size={26} strokeWidth={1.5} aria-hidden="true" />}
            </div>
            <div>
                <label className="upload">
                    <input type="file" accept="image/*" className="sr-only" onChange={handleFile} />
                    <span>Upload logo (optional)</span>
                </label>
                {value && (
                    <button type="button" className="link-btn" onClick={() => onChange(null)}>Remove</button>
                )}
                {error && <p className="field__error" role="alert">{error}</p>}
            </div>
        </div>
    );
}