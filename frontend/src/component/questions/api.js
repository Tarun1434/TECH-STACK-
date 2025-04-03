import axios from "axios";

const API_URL = "http://localhost:5000/api/questions";

export const fetchQuestions = async (language) => {
  const response = await axios.get(`${API_URL}/${language}`);
  return response.data;
};