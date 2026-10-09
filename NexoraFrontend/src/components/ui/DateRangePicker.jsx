import { useRange } from "../../context/RangeContext";
import { todayISO } from "../../utils/dateUtils";

const PRESETS = [7, 30, 90];

export default function DateRangePicker() {
    const { from, to, days, setPreset, setFrom, setTo } = useRange();
    const today = todayISO();
    const active = to === today ? days : null;

    return (
        <div className="range" role="group" aria-label="Date range">
            {PRESETS.map((p) => (
                <button key={p} type="button" className="chip" aria-pressed={active === p} onClick={() => setPreset(p)}>{p} days</button>
            ))}
            <label className="sr-only" htmlFor="range-from">From date</label>
            <input id="range-from" className="input input--date" type="date" value={from} max={to} onChange={(e) => e.target.value && setFrom(e.target.value)} />
            <label className="sr-only" htmlFor="range-to">To date</label>
            <input id="range-to" className="input input--date" type="date" value={to} min={from} max={today} onChange={(e) => e.target.value && setTo(e.target.value)} />
        </div>
    );
}