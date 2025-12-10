export default function QuestionCard({ q, answers, setAnswers }) {
  const handleSelect = (qid, oid, text) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: { option_id: oid, text_answer: text }
    }));
  };

  return (
    <div className="quiz-card mb-4">
      <h3 className="font-semibold text-lg mb-3">{q.prompt}</h3>

      {q.question_type !== "text" &&
        q.options.map((opt) => {
          const selected = answers[q.id] && answers[q.id].option_id === opt.id;
          return (
            <label
              key={opt.id}
              className={`option-pill mb-2 ${selected ? 'option-selected' : ''}`}
              onClick={() => handleSelect(q.id, opt.id, opt.text)}
            >
              <input
                type="radio"
                name={String(q.id)}
                checked={selected}
                onChange={() => handleSelect(q.id, opt.id, opt.text)}
                className="sr-only"
              />

              <div className={`option-circle ${selected ? 'selected' : ''}`} aria-hidden>
                <span className="letter">{String.fromCharCode(65 + (q.options.indexOf(opt) || 0))}</span>
                <svg className="check" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M1 6.5L5.2 10.5L15 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="text-left">
                <div className="font-medium">{opt.text}</div>
              </div>
            </label>
          );
        })}

      {q.question_type === "text" && (
        <textarea
          className="mt-2 p-4 w-full rounded-lg bg-white/5 h-36 resize-vertical text-sm"
          placeholder="Your answer"
          onChange={(e) =>
            setAnswers((prev) => ({
              ...prev,
              [q.id]: { text_answer: e.target.value }
            }))
          }
        />
      )}
    </div>
  );
}
