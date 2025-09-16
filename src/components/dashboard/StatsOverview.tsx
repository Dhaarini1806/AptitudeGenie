
import { useAuth } from "@/context/AuthContext";
import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Clock, CheckCircle, Award } from "lucide-react";

export function StatsOverview() {
  const { user } = useAuth();
  const { gameResults } = useGame();
  
  if (!user) return null;

  // Calculate stats
  const totalGames = gameResults.length;
  const averageAccuracy = totalGames > 0
    ? Math.round(gameResults.reduce((acc, game) => acc + game.accuracy, 0) / totalGames)
    : 0;
  const totalCorrect = gameResults.reduce(
    (acc, game) => acc + Math.round((game.accuracy / 100) * game.totalQuestions), 
    0
  );
  const totalQuestions = gameResults.reduce((acc, game) => acc + game.totalQuestions, 0);
    
  return (
    <Card className="w-full genie-card animate-scale-in">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Statistics Overview</CardTitle>
        <CardDescription>Your aptitude journey so far</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-muted-foreground">Games Played</span>
            <div className="flex items-center">
              <BarChart className="h-4 w-4 mr-1 text-genie-purple" />
              <span className="text-2xl font-bold">{totalGames}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-xs text-muted-foreground">Avg. Accuracy</span>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-2xl font-bold">{averageAccuracy}%</span>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-xs text-muted-foreground">Correct Answers</span>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-genie-blue" />
              <span className="text-2xl font-bold">{totalCorrect}/{totalQuestions}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-xs text-muted-foreground">Current Streak</span>
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-1 text-amber-500" />
              <span className="text-2xl font-bold">{user.streak_days}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
