export default function SegmentedControl({ legend, name, value, onChange, options }) {
    return (
        <fieldset className="segmented">
            <legend className="field__label">{legend}</legend>
            <div className="segmented__options">
                {options.map((o) => (
                    <label key={o.value} className="segmented__option">
                        <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
                        <span>{o.label}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
}