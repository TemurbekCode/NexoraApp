export default function LoadingState({ label = "Loading your data…" }) {
    return (
        <div className="empty" role="status">
            <span className="spinner spinner--lg" aria-hidden="true" />
            <p>{label}</p>
        </div>
    );
}