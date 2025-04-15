import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestions, saveQuestion } from "./api";
import "./index.css";

const QuestionCard = ({ userId = "demoUser123" }) => {
    const { language } = useParams();
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                console.log(`Fetching questions for ${language}`);
                const data = await fetchQuestions(language);
                console.log("Data received:", data);
                setQuestions(data || []);
                setError(null);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setError(error.message);
            }
        };
        loadQuestions();
    }, [language]);

    const handleSave = async (questionId) => {
        try {
            const data = await saveQuestion(userId, questionId);
            if (data.success) {
                alert("✅ Question saved successfully!");
            } else {
                alert("⚠️ Failed to save question.");
            }
        } catch (error) {
            console.error("Error saving question:", error);
            alert("🚫 Error saving question.");
        }
    };

    return (
        <div className="question-container-wrapper">
            <div className="question-container">
                <h2>{language} Questions</h2>
                {error ? (
                    <p>Error: {error}</p>
                ) : Array.isArray(questions) && questions.length > 0 ? (
                    questions.map((q, index) => (
                        <div key={q.id || index} className="question-card">
                            <p><strong>Q{index + 1}:</strong> {q.question || 'No question'}</p>
                            {q.answer && <p><strong>A:</strong> {q.answer}</p>}
                            {q.matter && <p><strong>Explanation:</strong> {q.matter}</p>}
                            {q.code && (
                                <div className="code-display">
                                    <strong>Code:</strong>
                                    <pre className="code-block">
                                        <code>{q.code}</code>
                                    </pre>
                                </div>
                            )}
                            <button
                                className="save-btn"
                                onClick={() => handleSave(q.id)}
                            >
                                💾 Save this Question
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No questions available for {language}.</p>
                )}
            </div>
        </div>
    );
};

export default QuestionCard;