import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import './index.css';

const SavedQuestions = () => {
    const [savedQuestions, setSavedQuestions] = useState([]);
    const [error, setError] = useState(null);
    const { user, token } = useContext(AuthContext);

    useEffect(() => {
        const loadSavedQuestions = async () => {
            if (!user || !token) {
                setError('Please log in to view saved questions.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/questions/saved/${user.userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setSavedQuestions(data || []);
            } catch (err) {
                console.error('Error fetching saved questions:', err);
                setError('Failed to load saved questions.');
            }
        };

        loadSavedQuestions();
    }, [user, token]);

    return (
        <div className="question-container-wrapper">
            <div className="question-container">
                <h2>Your Saved Questions</h2>
                {error ? (
                    <p>{error}</p>
                ) : savedQuestions.length > 0 ? (
                    savedQuestions.map((q, index) => (
                        <div key={q.id || index} className="question-card">
                            <p>
                                <strong>Q{index + 1}:</strong> {q.question}
                            </p>
                            <p>
                                <strong>A:</strong> {q.answer}
                            </p>
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