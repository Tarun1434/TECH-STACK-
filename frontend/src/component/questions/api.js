import axios from "axios";

const API_URL = "http://192.168.1.38:5000/api/questions"; // Use laptop IP

export const fetchQuestions = async (language) => {
    const response = await axios.get(`${API_URL}/${language}`);
    return response.data;
};