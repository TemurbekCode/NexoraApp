import { useMemo } from "react";
import { useData } from "../context/DataContext";
import { useRange } from "../context/RangeContext";
import { dailySeries, filterByRange, summarize } from "../utils/calculateMetrics";

// Barcha sahifalar uchun yagona hisob-kitob manbai
export function useAnalytics() {
    const { orders } = useData();
    const { from, to, previous } = useRange();

    return useMemo(() => {
        const current = filterByRange(orders, from, to);
        const prior = filterByRange(orders, previous.from, previous.to);
        return {
            from, to, previous, current, prior,
            summary: summarize(current),
            prevSummary: summarize(prior),
            daily: dailySeries(current, from, to),
            prevDaily: dailySeries(prior, previous.from, previous.to),
        };
    }, [orders, from, to, previous]);
}