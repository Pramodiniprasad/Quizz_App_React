import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAttempt } from "../api/quizApi";
import Loader from "../components/Loader";

export default function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    getAttempt(id).then((res) => setResult(res.data));
  }, [id]);

  if (!result) return <div className="p-6"><Loader /></div>;

  return (
    <div className="app-container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-white">Your Result</h1>

      <p className="text-xl mb-6">Score: <span className="font-bold">{result.score}</span></p>

      <div className="result-grid">
        {result.attempt_answers.map((ans) => {
          // determine the displayed answers (flexible to API shape)
          const yourAnswer = ans.text_answer ?? ans.option_text ?? ans.option_id ?? String(ans.option_id ?? '');
          const correctAnswer = ans.correct_option_text ?? ans.correct_answer ?? ans.correct_text ?? ans.correctOption ?? ans.correct_option ?? null;
          return (
            <div key={ans.id} className={`quiz-card p-4 ${ans.correct ? 'correct-card' : 'wrong-card'}`}>
              <div className="status-inline mb-2">
                <div className={`dot ${ans.correct ? 'correct' : 'wrong'}`} />
                <p className="font-semibold">Question #{ans.question_id}</p>
              </div>

              <p className="muted">Your answer: <span className="text-sm text-gray-700">{yourAnswer}</span></p>

              {ans.correct ? (
                <p className="text-green-600 font-bold mt-2">✔ Correct</p>
              ) : (
                <>
                  <p className="text-red-600 font-bold mt-2">❌ Wrong</p>
                  <p className="mt-2 muted">Correct answer: <span className="font-semibold text-gray-700">{correctAnswer ?? 'Not provided'}</span></p>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <Link to="/quizzes" className="inline-block btn-ghost">Back to Quizzes</Link>
      </div>
    </div>
  );
}
