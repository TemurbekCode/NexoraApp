import SectionHeading from "../components/SectionHeading";
import { trustSection as data } from "../data/landingData";

export default function TrustSection() {
    return (
        <section className="section section--bordered" id="trust" aria-labelledby="trust-title">
            <div className="container">
                <SectionHeading id="trust-title" title={data.title} description={data.description} />
                <div className="trust">
                    {data.items.map((item) => (
                        <article key={item.title}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}