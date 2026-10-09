import Button from "../components/Button";
import { ROUTES } from "../config/appConfig";
import { ctaSection as data } from "../data/landingData";

export default function DashboardCTA() {
    return (
        <section className="cta-wrap" aria-labelledby="cta-title">
            <div className="container">
                <div className="cta">
                    <h2 id="cta-title">{data.title}</h2>
                    <p>{data.description}</p>
                    <Button href={ROUTES.register}>Get started</Button>
                </div>
            </div>
        </section>
    );
}