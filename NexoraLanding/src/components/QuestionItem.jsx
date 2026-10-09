import { memo } from "react";

function QuestionItem({ title, description }) {
    return (
        <li className="question-item">
            <h3>{title}</h3>
            <p>{description}</p>
        </li>
    );
}

export default memo(QuestionItem);