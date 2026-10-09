import { useCallback, useState } from "react";

export function useFormState(initial) {
    const [values, setValues] = useState(initial);
    const [errors, setErrors] = useState({});

    const set = useCallback((name, value) => {
        setValues((v) => ({ ...v, [name]: value }));
        setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
    }, []);

    const bind = (name) => ({
        name,
        value: values[name] ?? "",
        error: errors[name],
        onChange: (e) => set(name, e.target.value),
    });

    const bindCheck = (name) => ({
        name,
        checked: Boolean(values[name]),
        error: errors[name],
        onChange: (e) => set(name, e.target.checked),
    });

    return { values, errors, setErrors, set, bind, bindCheck };
}