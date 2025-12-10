import { useEffect, useState } from "react";
import { getQuizzes } from "../api/quizApi";
import { Link } from "react-router-dom";
import { Clock, User, Briefcase } from "lucide-react";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizzes().then((res) => setQuizzes(res.data));
  }, []);

  return (
    <div className="app-container">
      <h2 className="text-3xl font-bold text-center mb-2">Available Interviews</h2>
      <p className="text-gray-500 text-center mb-8">
        Choose an interview to begin the assessment. Each test is timed and auto-evaluated.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Link
            key={quiz.id}
            to={`/quiz/${quiz.id}`}
            className="quiz-card p-5 rounded-xl shadow relative transition hover:scale-[1.02]"
          >
            <div className="absolute top-3 right-3 flex items-center gap-1 text-sm text-indigo-600 font-medium">
              <Clock size={16} />
              <span>{quiz.time_limit || 10} mins</span>
            </div>

            <h3 className="text-xl font-semibold">Title: {quiz.title}</h3>

       
            <p className="muted text-sm mt-1">Description: {quiz.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
