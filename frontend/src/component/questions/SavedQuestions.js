import React, { useEffect, useState } from "react";
import { fetchSavedQuestions } from "./api";
import "./index.css";

const SavedQuestions = ({ userId }) => {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSavedQuestions = async () => {
      try {
        const data = await fetchSavedQuestions(userId);
        setSavedQuestions(data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching saved questions:", err);
        setError("Failed to load saved questions.");
      }
    };

    if (userId) {
      loadSavedQuestions();
    }
  }, [userId]);

  return (
    <div className="question-container-wrapper">
      <div className="question-container">
        <h2>Your Saved Questions</h2>
        {error ? (
          <p>{error}</p>
        ) : savedQuestions.length > 0 ? (
          savedQuestions.map((q, index) => (
            <div key={q.id || index} className="question-card">
              <p><strong>Q{index + 1}:</strong> {q.question}</p>
              <p><strong>A:</strong> {q.answer}</p>
              {q.matter && <p><strong>Explanation:</strong> {q.matter}</p>}
              {q.code && (
                <div className="code-display">
                  <strong>Code:</strong>
                  <pre className="code-block">
                    <code>{q.code}</code>
                  </pre>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No saved questions found.</p>
        )}
      </div>
    </div>
  );
};

export default SavedQuestions;