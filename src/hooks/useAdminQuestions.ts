import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function useAdminQuestions() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = useCallback(() => {
    setLoading(true);
    supabase
      .from("questions")
      .select("*")
      .then(({ data }) => {
        setQuestions(data || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const addQuestion = async () => {
    // You should show a dialog/form in your UI to collect question fields
    const question = prompt("Enter the question text");
    if (!question) return;
    const { error } = await supabase.from("questions").insert([
      { question_text: question, options: JSON.stringify({ A: "", B: "", C: "", D: "" }), correct_answer: "A" }
    ]);
    if (!error) fetchQuestions();
  };

  const updateQuestion = async (q: any) => {
    // Simple example: prompt for text
    const question = prompt("Edit question", q.question_text);
    if (!question) return;
    const { error } = await supabase.from("questions").update({ question_text: question }).eq("id", q.id);
    if (!error) fetchQuestions();
  };

  const deleteQuestion = async (id: string) => {
    const { error } = await supabase.from("questions").delete().eq("id", id);
    if (!error) fetchQuestions();
  };

  return { questions, loading, addQuestion, updateQuestion, deleteQuestion };
}
