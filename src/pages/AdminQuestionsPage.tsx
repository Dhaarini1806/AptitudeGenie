import { useAuth } from "@/context/AuthContext";
import useAdminQuestions from "@/hooks/useAdminQuestions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminQuestionsPage() {
  const { user, isLoading } = useAuth();
  const { questions, loading, addQuestion, updateQuestion, deleteQuestion } = useAdminQuestions();

  if (isLoading) return <div>Loading...</div>;
  if (!user?.is_admin) return <div>Access denied. Only admins can manage questions.</div>;

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="font-bold text-2xl mb-4">Manage Questions</h1>
      <Card className="mb-2">
        {loading && <div>Loading questions...</div>}
        {questions.map((q) => (
          <div key={q.id} className="flex justify-between p-2 border-b">
            <div>
              <strong>{q.question_text}</strong>
              <div className="text-xs text-muted">Correct: {q.correct_answer}</div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => updateQuestion(q)}>Edit</Button>
              <Button
                onClick={() => deleteQuestion(q.id)}
                variant="destructive"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </Card>
      <Button onClick={addQuestion} className="genie-gradient text-white">
        Add Question
      </Button>
    </main>
  );
}
