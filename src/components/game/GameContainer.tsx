
import { useState, useEffect } from "react";
import { useGame, GameResult } from "@/context/GameContext";
import { QuestionCard } from "./QuestionCard";
import { ResultsCard } from "./ResultsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

interface GameContainerProps {
  onGoHome: () => void;
}

export function GameContainer({ onGoHome }: GameContainerProps) {
  const {
    questions,
    currentQuestionIndex,
    gameActive,
    timeRemaining,
    startGame,
    endGame,
    nextQuestion,
    answerQuestion,
    resetGame,
    isLoading
  } = useGame();

  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [answers, setAnswers] = useState<{ correct: boolean; time: number }[]>([]);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      resetGame();
    };
  }, [resetGame]);

  const handleStartGame = () => {
    startGame();
    setGameStartTime(Date.now());
    setAnswers([]);
    setGameResult(null);
    console.log("Game started");
  };

  const handleAnswer = (answer: string) => {
    const isCorrect = answerQuestion(answer);
    setAnswers(prev => [...prev, { correct: isCorrect, time: 30 - timeRemaining }]);
    
    if (currentQuestionIndex === questions.length - 1) {
      // Last question - end the game
      const totalTimeTaken = Math.floor((Date.now() - (gameStartTime || 0)) / 1000);
      const correctAnswersCount = [...answers, { correct: isCorrect, time: 30 - timeRemaining }]
        .filter(a => a.correct).length;
      
      // Check if we have 10 questions
      console.log(`Game ended. Total questions: ${questions.length}, Current index: ${currentQuestionIndex}`);
      console.log(`Correct answers: ${correctAnswersCount} out of ${questions.length}`);
      
      const accuracy = (correctAnswersCount / questions.length) * 100;
      
      const result: GameResult = {
        date: new Date().toISOString(),
        score: correctAnswersCount,
        totalQuestions: questions.length,
        timeTaken: totalTimeTaken,
        accuracy: Math.round(accuracy)
      };
      
      console.log("Final result:", result);
      setGameResult(result);
      endGame(result);
    } else {
      // Move to next question
      nextQuestion();
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    handleStartGame();
  };

  // Render start screen if game is not active and no result
  if (!gameActive && !gameResult) {
    return (
      <Card className="w-full max-w-md mx-auto genie-card animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Aptitude Genie</CardTitle>
          <CardDescription>
            Challenge your mind with timed aptitude questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="py-6">
            <div className="w-24 h-24 rounded-full genie-gradient mx-auto flex items-center justify-center shadow-lg mb-4">
              <img 
                src="/placeholder.svg" 
                alt="Genie" 
                className="w-16 h-16 object-contain animate-float" 
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              10 questions • Timed challenge • Test your skills
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">How to play:</p>
            <ul className="text-sm text-left list-disc pl-6">
              <li>Answer 10 aptitude questions</li>
              <li>Each question has a 30-second time limit</li>
              <li>Get points based on accuracy</li>
              <li>Build a streak by playing daily</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={handleStartGame} 
            className="genie-gradient text-white px-8 shadow-md"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Start Game"}
            {!isLoading && <Play className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Render result screen
  if (gameResult) {
    return (
      <ResultsCard 
        result={gameResult} 
        onPlayAgain={handlePlayAgain} 
        onGoHome={onGoHome} 
      />
    );
  }

  // Render active game
  return (
    <div className="w-full">
      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          timeRemaining={timeRemaining}
          totalTime={30}
          onAnswer={handleAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
}
