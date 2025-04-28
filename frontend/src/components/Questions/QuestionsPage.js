import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchQuestions, saveQuestion, fetchSavedQuestions, searchQuestions } from './api';
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
        const loadQuestions = async () => {
            try {
                const data = await fetchQuestions(language, token);
                setQuestions(data);
                setFilteredQuestions(data);
            } catch (err) {
                setError('Failed to load questions.');
            }
        };

        const loadSaved = async () => {
            if (user) {
                try {
                    const data = await fetchSavedQuestions(user.userId, token);
                    setSavedQuestions(new Set(data.map((q) => q.id)));
                } catch (err) {
                    console.error('Error fetching saved questions:', err);
                }
            }
        };

        if (token) {
            loadQuestions();
            loadSaved();
        } else {
            navigate('/login');
        }
    }, [language, user, token, navigate]);

    useEffect(() => {
        if (searchQuery) {
            const fetchSearch = async () => {
                try {
                    const data = await searchQuestions(searchQuery, token);
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
            const response = await saveQuestion(user.userId, questionId, token);
            if (response.success) {
                setSavedQuestions((prev) => new Set(prev).add(questionId));
                toast.success('Question saved successfully!');
            } else {
                toast.error(`Failed to save question: ${response.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error saving question:', error);
            toast.error(`Error saving question: ${error.message}`);
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
                                    title={savedQuestions.has(q.id) ? 'Saved' : 'Save question'}
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
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default QuestionsPage;