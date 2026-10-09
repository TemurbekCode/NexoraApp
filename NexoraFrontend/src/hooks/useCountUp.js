import { useEffect, useRef, useState } from "react";

export function useCountUp(target, duration = 600) {
    const [value, setValue] = useState(0);
    const from = useRef(0);

    useEffect(() => {
        if (target == null) return undefined;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            from.current = target;
            setValue(target);
            return undefined;
        }
        const start = from.current;
        const t0 = performance.now();
        let raf;
        const tick = (now) => {
            const p = Math.min((now - t0) / duration, 1);
            const next = start + (target - start) * (1 - (1 - p) ** 3);
            from.current = next;
            setValue(next);
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);

    return value;
}