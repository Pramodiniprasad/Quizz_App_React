import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="app-container mx-auto">
        <div className="big-hero p-8">
          <div className="app-header mb-6">
            <div>
              <h1 className="text-4xl font-bold">Welcome to Interview Practice</h1>
              <p className="muted mt-2">Sharpen your skills with short, focused quizzes</p>
            </div>

          </div>

          <div className="mt-6">
            <Link to="/quizzes" className="btn-primary inline-block">
              Browse Interviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
