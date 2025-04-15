import axios from "axios";

const API_URL = "http://localhost:5000/api/questions";

export const fetchQuestions = async (language) => {
    try {
        const response = await axios.get(`${API_URL}/${language}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error.message, error.response ? error.response.status : 'No response');
        throw error;
    }
};

export const saveQuestion = async (userId, questionId) => {
    try {
        const response = await axios.post(`${API_URL}/save-question`, { userId, questionId });
        return response.data;
    } catch (error) {
        console.error('Error saving question:', error);
        throw error;
    }
};

export const fetchSavedQuestions = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/saved/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching saved questions:', error);
        throw error;
    }
};