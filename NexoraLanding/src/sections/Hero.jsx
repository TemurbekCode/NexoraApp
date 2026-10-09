import { ArrowRight, TrendingUp } from "lucide-react";
import Button from "../components/Button";
import RevenueChart from "../components/RevenueChart";
import ProductBars from "../components/ProductBars";
import { ROUTES } from "../config/appConfig";
import { hero, revenueSample, topProducts } from "../data/landingData";

export default function Hero() {
    return (
        <section className="hero" id="top" aria-labelledby="hero-title">
            <div className="container hero__grid">
                <div className="hero__content">
                    <h1 id="hero-title" className="reveal" style={{ "--d": "60ms" }}>
                        {hero.title}
                    </h1>
                    <p className="hero__subtitle reveal" style={{ "--d": "140ms" }}>
                        {hero.subtitle}
                    </p>
                    <div className="hero__actions reveal" style={{ "--d": "220ms" }}>
                        <Button href={ROUTES.register}>
                            Get started <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
                        </Button>
                        <Button href="#questions" variant="ghost">
                            See what it answers
                        </Button>
                    </div>
                    <p className="hero__note reveal" style={{ "--d": "300ms" }}>
                        {hero.note}
                    </p>
                </div>

                <div className="card hero__card slide-in" aria-label="Sample analytics dashboard">
                    <div className="hero__card-head">
                        <div>
                            <p className="muted">{revenueSample.label}</p>
                            <p className="hero__total">{revenueSample.total}</p>
                        </div>
                        <span className="badge">
                            <TrendingUp size={14} strokeWidth={1.75} aria-hidden="true" />
                            {revenueSample.change}
                        </span>
                    </div>
                    <RevenueChart series={revenueSample.series} />
                    <ProductBars products={topProducts} />
                </div>
            </div>
        </section>
    );
}