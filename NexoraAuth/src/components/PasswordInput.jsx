import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "./Input";

export default function PasswordInput(props) {
    const [show, setShow] = useState(false);
    const Icon = show ? EyeOff : Eye;
    return (
        <Input
            {...props}
            type={show ? "text" : "password"}
            endAdornment={
                <button
                    type="button"
                    className="field__toggle"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                    aria-pressed={show}
                >
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                </button>
            }
        />
    );
}