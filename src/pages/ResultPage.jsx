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
        
          return (
            <div key={ans.id} className={`quiz-card p-4 ${ans.correct ? 'correct-card' : 'wrong-card'}`}>
              <div className="status-inline mb-2">
                <div className={`dot ${ans.correct ? 'correct' : 'wrong'}`} />
                <p className="font-semibold">Question #{ans.question_id}</p>
              </div>

              {ans.correct ? (
                <p className="text-green-600 font-bold mt-2">✔ Correct</p>
              ) : (
                <>
                  <p className="text-red-600 font-bold mt-2">❌ Wrong</p>
                  
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
