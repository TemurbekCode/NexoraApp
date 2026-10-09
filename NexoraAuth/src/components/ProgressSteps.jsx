export default function ProgressSteps({ step, total, label }) {
    return (
        <div className="progress">
            <p className="progress__label">Step {step} of {total} · {label}</p>
            <div className="progress__bar" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step}>
                <div className="progress__fill" style={{ width: `${(step / total) * 100}%` }} />
            </div>
        </div>
    );
}