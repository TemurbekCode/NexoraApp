import Input from "./Input";
import Select from "./Select";
import { BUSINESS_SIZES, BUSINESS_TYPES, COUNTRIES, CURRENCIES } from "../data/options";

export default function BusinessFields({ bind }) {
    return (
        <>
            <Input label="Business name" autoComplete="organization" {...bind("name")} />
            <div className="grid-2">
                <Select label="Business type" options={BUSINESS_TYPES} placeholder="Select type" {...bind("type")} />
                <Select label="Business size" options={BUSINESS_SIZES} placeholder="Select size" {...bind("size")} />
            </div>
            <div className="grid-2">
                <Input label="Country" list="country-list" autoComplete="country-name" placeholder="Start typing…" {...bind("country")} />
                <Select label="Currency" options={CURRENCIES} placeholder="Select currency" {...bind("currency")} />
            </div>
            <datalist id="country-list">
                {COUNTRIES.map((c) => <option key={c} value={c} />)}
            </datalist>
        </>
    );
}