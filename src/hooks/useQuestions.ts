import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function useQuestions(limit = 10) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("questions")
      .select("*")
      .limit(limit)
      .then(({ data }) => {
        setQuestions(data || []);
        setLoading(false);
      });
  }, [limit]);

  return { questions, loading };
}
