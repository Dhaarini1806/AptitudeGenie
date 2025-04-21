
import { useGame, GameResult } from "@/context/GameContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentResultsProps {
  limit?: number;
}

export function RecentResults({ limit = 5 }: RecentResultsProps) {
  const { gameResults } = useGame();
  
  // Take only the most recent results
  const recentResults = gameResults.slice(0, limit);
  
  if (recentResults.length === 0) {
    return (
      <Card className="w-full genie-card animate-scale-in">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Results</CardTitle>
          <CardDescription>No games played yet. Start playing to see your results!</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="w-full genie-card animate-scale-in">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Results</CardTitle>
        <CardDescription>Your latest aptitude challenges</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentResults.map((result, index) => (
            <ResultRow key={index} result={result} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ResultRow({ result }: { result: GameResult }) {
  // Format date
  const date = new Date(result.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Determine result color based on accuracy
  const accuracyColor = 
    result.accuracy >= 80 ? "text-green-500" : 
    result.accuracy >= 50 ? "text-amber-500" : 
    "text-red-500";
  
  return (
    <div className="flex items-center justify-between pb-2 border-b last:border-0">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${accuracyColor}`}>
          {result.score}/{result.totalQuestions}
        </div>
        <div>
          <p className="text-sm font-medium">Score: {result.score} points</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="h-3 w-3 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
      <div className={`font-medium ${accuracyColor}`}>
        {result.accuracy}%
      </div>
    </div>
  );
}
