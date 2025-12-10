import { useEffect, useState } from "react";
import { getQuizzes } from "../api/quizApi";
import { Link } from "react-router-dom";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizzes().then((res) => setQuizzes(res.data));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Available Interviews</h2>

      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <Link
            to={`/quiz/${quiz.id}`}
            key={quiz.id}
            className="block p-4 bg-white shadow rounded-lg hover:bg-gray-50"
          >
            <h3 className="text-xl font-semibold">{quiz.title}</h3>
            <p className="text-gray-600">{quiz.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
