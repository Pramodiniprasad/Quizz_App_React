import axios from "axios";

const BASE = "http://localhost:3000/api";

export const getQuizzes = () => axios.get(`${BASE}/quizzes`);

export const getQuiz = (id) => axios.get(`${BASE}/quizzes/${id}`);

export const submitAttempt = (payload) =>
  axios.post(`${BASE}/attempts`, payload);

export const getAttempt = (id) => axios.get(`${BASE}/attempts/${id}`);

