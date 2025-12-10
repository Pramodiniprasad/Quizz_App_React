import { useParams, useNavigate } from "react-router-dom";
import { getQuiz, submitAttempt } from "../api/quizApi";
import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    getQuiz(id).then((res) => setQuiz(res.data));
  }, []);

  const handleSubmit = async () => {
    const attemptPayload = {
      quiz_id: quiz.id,
      taker_name: "Guest",
      answers: Object.keys(answers).map((qid) => ({
        question_id: Number(qid),
        option_id: answers[qid].option_id,
        text_answer: answers[qid].text_answer
      }))
    };

    const res = await submitAttempt(attemptPayload);
    navigate(`/result/${res.data.attempt_id}`);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{quiz.title}</h2>

      {quiz.questions.map((q) => (
        <QuestionCard
          key={q.id}
          q={q}
          answers={answers}
          setAnswers={setAnswers}
        />
      ))}

      <button
        className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg"
        onClick={handleSubmit}
      >
        Submit Answers
      </button>
    </div>
  );
}
