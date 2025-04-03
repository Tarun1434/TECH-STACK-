import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestions } from "./api";
import "./index.css";  // Import CSS file

const QuestionCard = () => {
    const { language } = useParams();
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                console.log(`Fetching questions for ${language}`);
                const data = await fetchQuestions(language);
                console.log("Data received:", data);
                setQuestions(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setError(error.message);
            }
        };
        loadQuestions();
    }, [language]);

    return (
        <div className="question-container">
            <h2>{language} Questions</h2>
            {error ? (
                <p>Error: {error}</p>
            ) : questions.length > 0 ? (
                questions.map((q, index) => (
                    <div key={index} className="question-card">
                        <p><strong>Q{index + 1}:</strong> {q.question}</p>
                        <p><strong>A:</strong> {q.answer}</p>
                    </div>
                ))
            ) : (
                <p>No questions available for {language}.</p>
            )}
        </div>
    );
};

export default QuestionCard;
