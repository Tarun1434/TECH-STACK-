import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { FaBookmark } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSavedQuestions, unsaveQuestion } from './api';
import './index.css'

const SavedQuestions = () => {
    const [savedQuestions, setSavedQuestions] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user, token, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const loadSavedQuestions = async () => {
            if (loading) return; // Wait for AuthContext to initialize

            if (!user || !token) {
                setError('Please log in to view saved questions.');
                navigate('/login');
                return;
            }

            setIsLoading(true);
            try {
                const data = await fetchSavedQuestions(user.userId, token);
                console.log('Fetched saved questions:', data);
                setSavedQuestions(data || []);
            } catch (err) {
                console.error('Error fetching saved questions:', err);
                setError(err.message || 'Failed to load saved questions.');
                if (err.message.includes('Session expired')) {
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadSavedQuestions();
    }, [user, token, loading, navigate]);

    const handleUnsave = async (questionId) => {
        if (!user || !token) {
            setError('Please log in to unsave questions.');
            navigate('/login');
            return;
        }

        try {
            console.log('Unsaving question:', { userId: user.userId, questionId });
            const response = await unsaveQuestion(user.userId, questionId, token);
            console.log('Unsave response:', response);
            if (response.success) {
                setSavedQuestions((prev) => prev.filter((q) => q.id !== questionId));
                toast.success('Question unsaved successfully!');
            } else {
                toast.error(`Failed to unsave question: ${response.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error unsaving question:', error);
            toast.error(`Error unsaving question: ${error.message}`);
            if (error.message.includes('Session expired')) {
                navigate('/login');
            }
        }
    };

    return (
        <div className="question-container-wrapper">
            <div className="question-container">
                <h2>Your Saved Questions</h2>
                {isLoading || loading ? (
                    <p className="loading">Loading...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : savedQuestions.length > 0 ? (
                    savedQuestions.map((q, index) => (
                        <div key={q.id || index} className="question-card">
                            <div className="question-header">
                                <p>
                                    <strong>Q{index + 1}:</strong> {q.question}
                                </p>
                                <span
                                    className="saved-symbol saved"
                                    onClick={() => handleUnsave(q.id)}
                                    title="Unsave question"
                                >
                                    <FaBookmark />
                                </span>
                            </div>
                            {q.answer && (
                                <p>
                                    <strong>A:</strong> {q.answer}
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
                    <p>No saved questions found.</p>
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

export default SavedQuestions;