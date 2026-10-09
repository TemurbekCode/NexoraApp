export default function SectionHeading({ id, title, description }) {
    return (
        <div className="section-heading">
            <h2 id={id}>{title}</h2>
            {description && <p>{description}</p>}
        </div>
    );
}