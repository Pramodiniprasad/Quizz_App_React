import axios from "axios";

// const BASE = "http://localhost:3000/api";
const BASE = import.meta.env.VITE_API_BASE;

export const getQuizzes = () => axios.get(`${BASE}/quizzes`);

export const getQuiz = (id) => axios.get(`${BASE}/quizzes/${id}`);

export const submitAttempt = (payload) =>
  axios.post(`${BASE}/attempts`, payload);

export const getAttempt = (id) => axios.get(`${BASE}/attempts/${id}`);

