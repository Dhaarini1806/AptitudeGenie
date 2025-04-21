
import { Question } from "@/context/GameContext";

// Utility functions for game mechanics

/**
 * Shuffles an array of questions
 */
export function shuffleQuestions(questions: Question[]): Question[] {
  return [...questions].sort(() => Math.random() - 0.5);
}

/**
 * Selects a specified number of questions from an array of questions
 */
export function selectQuestions(questions: Question[], count: number): Question[] {
  const shuffled = shuffleQuestions(questions);
  return shuffled.slice(0, count);
}

/**
 * Filters questions by difficulty
 */
export function filterByDifficulty(
  questions: Question[],
  difficulties: Array<"easy" | "medium" | "hard">
): Question[] {
  return questions.filter(q => difficulties.includes(q.difficulty));
}

/**
 * Calculates points based on accuracy and difficulty
 */
export function calculatePoints(accuracy: number, difficulty: "easy" | "medium" | "hard"): number {
  const basePoints = Math.round(accuracy);
  
  const difficultyMultiplier = 
    difficulty === "easy" ? 1 :
    difficulty === "medium" ? 1.5 :
    2; // hard
    
  return Math.round(basePoints * difficultyMultiplier);
}

/**
 * Formats time in seconds to a readable format
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Returns a color based on accuracy
 */
export function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 80) return "text-green-500";
  if (accuracy >= 50) return "text-amber-500";
  return "text-red-500";
}

/**
 * Calculates level based on points
 * Simple formula: Level = 1 + Floor(Points / 100)
 */
export function calculateLevel(points: number): number {
  return 1 + Math.floor(points / 100);
}

/**
 * Returns text feedback based on accuracy
 */
export function getAccuracyFeedback(accuracy: number): string {
  if (accuracy >= 90) return "Outstanding!";
  if (accuracy >= 80) return "Excellent!";
  if (accuracy >= 70) return "Great job!";
  if (accuracy >= 60) return "Good work!";
  if (accuracy >= 50) return "Not bad!";
  if (accuracy >= 40) return "Keep practicing!";
  if (accuracy >= 30) return "You can do better!";
  return "Try again!";
}
