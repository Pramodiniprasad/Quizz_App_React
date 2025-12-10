import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAttempt } from "../api/quizApi";

export default function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    getAttempt(id).then((res) => setResult(res.data));
  }, []);

  if (!result) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Result</h1>

      <p className="text-xl mb-6">
        Score: <span className="font-bold">{result.score}</span>
      </p>

      <div className="space-y-4">
        {result.attempt_answers.map((ans) => (
          <div
            key={ans.id}
            className="p-4 bg-white shadow rounded border-l-4"
          >
            <p className="font-semibold mb-2">
              Question #{ans.question_id}
            </p>

            <p>Your answer: {ans.text_answer || ans.option_id}</p>

            {ans.correct ? (
              <p className="text-green-600 font-bold mt-2">✔ Correct</p>
            ) : (
              <p className="text-red-600 font-bold mt-2">❌ Wrong</p>
            )}
          </div>
        ))}
      </div>

      <Link
        to="/quizzes"
        className="block mt-6 text-blue-600 underline"
      >
        Back to Quizzes
      </Link>
    </div>
  );
}
