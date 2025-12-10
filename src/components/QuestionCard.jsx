export default function QuestionCard({ q, answers, setAnswers }) {
  const handleSelect = (qid, oid, text) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: { option_id: oid, text_answer: text }
    }));
  };

  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h3 className="font-semibold">{q.prompt}</h3>

      {q.question_type !== "text" &&
        q.options.map((opt) => (
          <label
            key={opt.id}
            className="block mt-2 p-2 border rounded cursor-pointer hover:bg-gray-100"
          >
            <input
              type="radio"
              name={q.id}
              className="mr-2"
              onChange={() => handleSelect(q.id, opt.id, opt.text)}
            />
            {opt.text}
          </label>
        ))}

      {q.question_type === "text" && (
        <input
          className="mt-2 p-2 border w-full rounded"
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
