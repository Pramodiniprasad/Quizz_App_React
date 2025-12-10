import axios from "axios";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";

const BASE = import.meta.env.VITE_API_BASE;

export const getQuizzes = () => axios.get(`${BASE}/quizzes`);

export const getQuiz = (id) => axios.get(`${BASE}/quizzes/${id}`);

export const submitAttempt = (payload) =>
  axios.post(`${BASE}/attempts`, payload);

export const getAttempt = (id) => axios.get(`${BASE}/attempts/${id}`);

