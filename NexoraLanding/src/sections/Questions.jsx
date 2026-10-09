import SectionHeading from "../components/SectionHeading";
import QuestionItem from "../components/QuestionItem";
import { questionsSection as data } from "../data/landingData";

export default function Questions() {
    return (
        <section className="section" id="questions" aria-labelledby="questions-title">
            <div className="container">
                <SectionHeading id="questions-title" title={data.title} description={data.description} />
                <ul className="questions">
                    {data.items.map((q) => (
                        <QuestionItem key={q.title} {...q} />
                    ))}
                </ul>
            </div>
        </section>
    );
}