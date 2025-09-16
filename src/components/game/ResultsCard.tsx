import { GameResult } from "@/context/GameContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Clock, CheckCircle, BarChart, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Celebration } from "./Celebration";

interface ResultsCardProps {
  result: GameResult;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export function ResultsCard({ result, onPlayAgain, onGoHome }: ResultsCardProps) {
  const { user } = useAuth();
  const [showAnimation, setShowAnimation] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  
  useEffect(() => {
    // Start animations with a slight delay
    const timer1 = setTimeout(() => setShowAnimation(true), 500);
    const timer2 = setTimeout(() => setShowStreak(true), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  
  // Calculate metrics
  const accuracyColor = 
    result.accuracy >= 80 ? "text-green-500" : 
    result.accuracy >= 50 ? "text-amber-500" : 
    "text-red-500";
  
  // Format time
  const minutes = Math.floor(result.timeTaken / 60);
  const seconds = result.timeTaken % 60;
  const formattedTime = `${minutes}m ${seconds}s`;


  // Determine if we should show celebration
  const shouldCelebrate = result.accuracy >= 70;

  const streakDays = user?.streak_days || 0;

  return (
    <Card className="w-full max-w-2xl genie-card">
      {shouldCelebrate && <Celebration trigger={showAnimation} />}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Game Results</CardTitle>
        <CardDescription>
          Well done on completing your aptitude challenge!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Section */}
        <div className="text-center py-4">
          <h3 className="text-lg font-medium mb-2">Your Score</h3>
          <div className="text-4xl font-bold text-primary mb-2 animate-pulse-glow">
            {showAnimation ? result.score : "0"}/{result.totalQuestions}
          </div>
          <Progress 
            value={result.accuracy} 
            className="h-2 w-3/4 mx-auto"
          />
          <p className={`mt-2 ${accuracyColor}`}>
            {result.accuracy}% Accuracy
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background/50 p-4 rounded-lg shadow-sm flex flex-col items-center animate-scale-in animation-delay-100">
            <Clock className="h-6 w-6 text-genie-blue mb-2" />
            <h3 className="text-sm font-medium">Time Taken</h3>
            <p className="text-lg font-semibold">{formattedTime}</p>
          </div>
          
          <div className="bg-background/50 p-4 rounded-lg shadow-sm flex flex-col items-center animate-scale-in animation-delay-200">
            <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
            <h3 className="text-sm font-medium">Correct Answers</h3>
            <p className="text-lg font-semibold">
              {showAnimation ? Math.round(result.accuracy * result.totalQuestions / 100) : "0"}
            </p>
          </div>
          
          <div className="bg-background/50 p-4 rounded-lg shadow-sm flex flex-col items-center animate-scale-in animation-delay-300">
            <BarChart className="h-6 w-6 text-genie-purple-dark mb-2" />
            <h3 className="text-sm font-medium">Points Earned</h3>
            <p className="text-lg font-semibold">
              {showAnimation ? Math.round(result.accuracy * 10) : "0"}
            </p>
          </div>
          
          <div className="bg-background/50 p-4 rounded-lg shadow-sm flex flex-col items-center animate-scale-in animation-delay-400">
            <Star className="h-6 w-6 text-amber-500 mb-2" />
            <h3 className="text-sm font-medium">Your Level</h3>
            <p className="text-lg font-semibold">{user?.level || 1}</p>
          </div>
        </div>
        
        {/* Streak Display */}
        {user && showStreak && (
          <div className="text-center py-6 animate-slide-up">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-7 w-7 text-amber-500 mr-2" />
              <h3 className="text-lg font-medium">Streak</h3>
            </div>
            <div className="flex justify-center space-x-1">
              {[...Array(Math.min(streakDays, 7))].map((_, i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 bg-genie-purple-vivid rounded-full flex items-center justify-center text-white font-bold animate-scale-in"
                  style={{ animationDelay: `${i * 100 + 500}ms` }}
                >
                  {i + 1}
                </div>
              ))}
              {streakDays > 7 && (
                <div className="w-10 h-10 bg-genie-purple-vivid rounded-full flex items-center justify-center text-white font-bold animate-scale-in"
                  style={{ animationDelay: `800ms` }}>
                  +{streakDays - 7}
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {streakDays} {streakDays === 1 ? 'day' : 'days'} streak
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex space-x-4 justify-center">
        <Button variant="outline" onClick={onGoHome}>
          Home
        </Button>
        <Button className="genie-gradient text-white" onClick={onPlayAgain}>
          Play Again
        </Button>
      </CardFooter>
    </Card>
  );
}
