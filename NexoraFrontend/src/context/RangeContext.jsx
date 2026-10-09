import { createContext, useContext, useMemo, useState } from "react";
import { daysBetween, presetRange, previousRange } from "../utils/dateUtils";

const RangeContext = createContext(null);

export function RangeProvider({ children }) {
    const [range, setRange] = useState(() => presetRange(30));

    const value = useMemo(() => ({
        ...range,
        days: daysBetween(range.from, range.to),
        previous: previousRange(range.from, range.to),
        setPreset: (days) => setRange(presetRange(days)),
        setFrom: (from) => setRange((r) => ({ from, to: from > r.to ? from : r.to })),
        setTo: (to) => setRange((r) => ({ from: to < r.from ? to : r.from, to })),
    }), [range]);

    return <RangeContext.Provider value={value}>{children}</RangeContext.Provider>;
}

export function useRange() {
    const ctx = useContext(RangeContext);
    if (!ctx) throw new Error("useRange must be used inside <RangeProvider>");
    return ctx;
}