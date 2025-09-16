import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import GameContainer from "@/components/game/GameContainer";

export default function GamePage() {
  const { user, isLoading } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
      .then(({ data }) => {
        setQuestions(data || []);
        setLoading(false);
      });
  }, [user]);

  if (isLoading || loading) return <div>Loading...</div>;
  if (!user) return <div>Please login to play!</div>;

  return <GameContainer questions={questions} userId={user.id} />;
}
