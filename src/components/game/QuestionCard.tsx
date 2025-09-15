
import { useState, useEffect } from "react";
import { Question } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  timeRemaining: number;
  totalTime: number;
  onAnswer: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({
  question,
  timeRemaining,
  totalTime,
  onAnswer,
  questionNumber,
  totalQuestions
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
  }, [question]);

  const handleOptionClick = (option: string) => {
    if (selectedAnswer || showFeedback) return; // Prevent multiple answers
    
    setSelectedAnswer(option);
    const correct = option === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Show feedback briefly before moving to next question
    setTimeout(() => {
      onAnswer(option);
    }, 1200); // Increased feedback time slightly
  };

  // Calculate time progress percentage
  const timeProgress = (timeRemaining / totalTime) * 100;
  
  return (
    <Card className="w-full max-w-2xl genie-card animate-scale-in">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <CardDescription>
            Question {questionNumber} of {totalQuestions}
          </CardDescription>
          <CardDescription className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-genie-red" />
            {timeRemaining}s
          </CardDescription>
        </div>
        <Progress value={timeProgress} className="h-2 bg-gray-200" />
        <CardTitle className="text-xl">{question.text}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {question.options.map((option) => (
          <Button
            key={option}
            variant="outline"
            className={cn(
              "w-full justify-start text-left h-auto py-3 px-4 font-normal",
              selectedAnswer === option && isCorrect && "bg-green-100 border-green-500",
              selectedAnswer === option && !isCorrect && "bg-red-100 border-red-500",
              option === question.correctAnswer && showFeedback && "bg-green-100 border-green-500"
            )}
            onClick={() => handleOptionClick(option)}
            disabled={showFeedback}
          >
            <div className="flex w-full items-center justify-between">
              <span>{option}</span>
              {selectedAnswer === option && isCorrect && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              {selectedAnswer === option && !isCorrect && (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              {option === question.correctAnswer && showFeedback && selectedAnswer !== option && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
            </div>
          </Button>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription className="italic text-xs">
          {question.difficulty} · {question.category}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
