import axios from "axios";

const API_URL = "http://192.168.1.40:5000/api/questions";

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