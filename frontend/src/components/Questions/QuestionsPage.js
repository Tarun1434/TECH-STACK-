import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import './QuestionsPage.css';

const QuestionsPage = () => {
    const { language } = useParams();
    const [questions, setQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [savedQuestions, setSavedQuestions] = useState(new Set());
    const [error, setError] = useState('');
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/questions/language/${language}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setQuestions(data);
                setFilteredQuestions(data);
            } catch (err) {
                setError('Failed to load questions.');
            }
        };

        const fetchSaved = async () => {
            if (user) {
                try {
                    const res = await fetch(`http://localhost:5000/api/questions/saved/${user.userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const data = await res.json();
                    setSavedQuestions(new Set(data.map((q) => q.id)));
                } catch (err) {
                    console.error('Error fetching saved questions:', err);
                }
            }
        };

        if (token) {
            fetchQuestions();
            fetchSaved();
        } else {
            navigate('/login');
        }
    }, [language, user, token, navigate]);

    useEffect(() => {
        if (searchQuery) {
            const fetchSearch = async () => {
                try {
                    const res = await fetch(
                        `http://localhost:5000/api/questions/search?query=${encodeURIComponent(searchQuery)}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    const data = await res.json();
                    setFilteredQuestions(data);
                } catch (err) {
                    setError('Failed to search questions.');
                }
            };
            fetchSearch();
        } else {
            setFilteredQuestions(questions);
        }
    }, [searchQuery, questions, token]);

    const handleSave = async (questionId) => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/questions/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userId: user.userId, questionId }),
            });
            const data = await res.json();
            if (data.success) {
                setSavedQuestions((prev) => new Set(prev).add(questionId));
                alert('Question saved successfully!');
            } else {
                alert('Failed to save question.');
            }
        } catch (error) {
            alert('Error saving question.');
        }
    };

    return (
        <div className="questions-page">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by language or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="questions-grid">
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q, index) => (
                        <div key={q.id || index} className="question-card">
                            <div className="question-header">
                                <p>
                                    <strong>Q{index + 1}:</strong> {q.question}
                                </p>
                                <span
                                    className={`saved-symbol ${savedQuestions.has(q.id) ? 'saved' : ''}`}
                                    onClick={() => handleSave(q.id)}
                                >
                                    {savedQuestions.has(q.id) ? <FaBookmark /> : <FaRegBookmark />}
                                </span>
                            </div>
                            {q.answer && (
                                <p>
                                    <strong>A:</strong> {q.answer}
                                </p>
                            )}
                            {q.matter && (
                                <p>
                                    <strong>Explanation:</strong> {q.matter}
                                </p>
                            )}
                            {q.code && (
                                <div className="code-display">
                                    <strong>Code:</strong>
                                    <CodeMirror
                                        value={q.code}
                                        extensions={[javascript()]}
                                        theme="dark"
                                        readOnly={true}
                                        height="200px"
                                    />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No questions found.</p>
                )}
            </div>
        </div>
    );
};

export default QuestionsPage;