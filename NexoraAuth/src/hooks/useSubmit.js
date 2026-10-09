import { useCallback, useRef, useState } from "react";

// Loading, umumiy xato va double-submit himoyasi bitta joyda
export function useSubmit(handler) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const locked = useRef(false);

    const onSubmit = useCallback(
        async (event) => {
            event?.preventDefault();
            if (locked.current) return;
            locked.current = true;
            setLoading(true);
            setError("");
            try {
                await handler();
            } catch (err) {
                setError(err?.message || "Something went wrong. Please try again.");
            } finally {
                locked.current = false;
                setLoading(false);
            }
        },
        [handler]
    );

    return { onSubmit, loading, error, setError };
}