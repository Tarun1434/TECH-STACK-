const API_URL = 'http://localhost:5000/api/questions';

const fetchQuestions = async (language, token) => {
    try {
        const response = await fetch(`${API_URL}/language/${language}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error('Session expired. Please log in again.');
            }
            throw new Error(`Failed to fetch questions: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch questions error:', error);
        throw error;
    }
};

const saveQuestion = async (userId, questionId, token) => {
    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, questionId: Number(questionId) }),
        });
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error('Session expired. Please log in again.');
            }
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to save question: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Save question error:', error);
        throw error;
    }
};

const unsaveQuestion = async (userId, questionId, token) => {
    try {
        const response = await fetch(`${API_URL}/unsave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, questionId: Number(questionId) }),
        });
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error('Session expired. Please log in again.');
            }
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to unsave question: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Unsave question error:', error);
        throw error;
    }
};

const fetchSavedQuestions = async (userId, token) => {
    try {
        const response = await fetch(`${API_URL}/saved/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error('Session expired. Please log in again.');
            }
            throw new Error(`Failed to fetch saved questions: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch saved questions error:', error);
        throw error;
    }
};

const searchQuestions = async (query, token) => {
    try {
        const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error('Session expired. Please log in again.');
            }
            throw new Error(`Failed to search questions: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Search questions error:', error);
        throw error;
    }
};

export { fetchQuestions, saveQuestion, unsaveQuestion, fetchSavedQuestions, searchQuestions };