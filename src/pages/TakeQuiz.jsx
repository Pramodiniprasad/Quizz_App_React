import { useParams, useNavigate } from "react-router-dom";
import { getQuiz, submitAttempt } from "../api/quizApi";
import { useEffect, useState, useRef } from "react";
import QuestionCard from "../components/QuestionCard";
import Loader from "../components/Loader";

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60 * 10); // 10 minutes
  const timerRef = useRef(null);

  useEffect(() => {
    getQuiz(id).then((res) => setQuiz(res.data));
  }, [id]);

  // start countdown when quiz loads
  useEffect(() => {
    if (!quiz) return;
    // clear any existing
    if (timerRef.current) clearInterval(timerRef.current);
    setSecondsLeft(60 * 10);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quiz]);

  // auto-submit when time runs out
  useEffect(() => {
    if (secondsLeft <= 0 && quiz && !submitting) {
      // stop timer
      if (timerRef.current) clearInterval(timerRef.current);
      // call submit
      (async () => {
        setSubmitting(true);
        const attemptPayload = {
          quiz_id: quiz.id,
          taker_name: "Guest",
          answers: Object.keys(answers).map((qid) => ({
            question_id: Number(qid),
            option_id: answers[qid].option_id,
            text_answer: answers[qid].text_answer
          }))
        };

        try {
          const res = await submitAttempt(attemptPayload);
          navigate(`/result/${res.data.attempt_id}`);
        } catch (err) {
          // on failure, just navigate to result page without id or show error
          console.error('Auto-submit failed', err);
          setSubmitting(false);
        }
      })();
    }
  }, [secondsLeft, quiz, submitting, answers, navigate]);

  const handleSubmit = async () => {
    setSubmitting(true);
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

  if (!quiz) return <div className="p-10"><Loader /></div>;

  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  return (
    <div className="app-container mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-white">{quiz.title}</h2>

      {/* fixed timer placed top-left */}
      <div className="quiz-timer" role="timer" aria-live="polite">{minutes}:{seconds}</div>

      <div className="card-grid">
        {quiz.questions.map((q) => (
          <QuestionCard
            key={q.id}
            q={q}
            answers={answers}
            setAnswers={setAnswers}
          />
        ))}
      </div>

      <div className="mt-6">
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Answers'}
        </button>
      </div>
    </div>
  );
}
