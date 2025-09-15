
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface GameResult {
  date: string;
  score: number;
  totalQuestions: number;
  timeTaken: number; // in seconds
  accuracy: number; // percentage
}

interface GameContextType {
  questions: Question[];
  currentQuestionIndex: number;
  gameActive: boolean;
  gameResults: GameResult[];
  timeRemaining: number;
  isLoading: boolean;
  startGame: () => void;
  endGame: (result: GameResult) => void;
  nextQuestion: () => void;
  answerQuestion: (answer: string) => boolean;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Sample questions (in a real app, these would come from a database)
const sampleQuestions: Question[] = [
  {
    id: "q1",
    text: "If a train travels at 60 mph, how long will it take to travel 150 miles?",
    options: ["1.5 hours", "2 hours", "2.5 hours", "3 hours"],
    correctAnswer: "2.5 hours",
    category: "math",
    difficulty: "easy"
  },
  {
    id: "q2",
    text: "If 8 workers can build a wall in 10 days, how many days will it take 5 workers to build the same wall?",
    options: ["12 days", "13 days", "16 days", "18 days"],
    correctAnswer: "16 days",
    category: "math",
    difficulty: "medium"
  },
  {
    id: "q3",
    text: "Which number is missing in the sequence? 2, 6, 12, 20, 30, __",
    options: ["38", "40", "42", "45"],
    correctAnswer: "42",
    category: "sequence",
    difficulty: "medium"
  },
  {
    id: "q4",
    text: "A car depreciates 15% per year. If it costs $20,000 new, what is its value after 3 years?",
    options: ["$12,251", "$14,535", "$15,000", "$17,000"],
    correctAnswer: "$12,251",
    category: "math",
    difficulty: "medium"
  },
  {
    id: "q5",
    text: "If the angles in a triangle are in the ratio 1:2:3, what is the measure of the largest angle?",
    options: ["30°", "60°", "90°", "108°"],
    correctAnswer: "90°",
    category: "geometry",
    difficulty: "medium"
  },
  {
    id: "q6",
    text: "Complete the analogy: Hand is to Glove as Foot is to ___",
    options: ["Toe", "Sock", "Shoe", "Leg"],
    correctAnswer: "Shoe",
    category: "verbal",
    difficulty: "easy"
  },
  {
    id: "q7",
    text: "What is the next letter in the sequence: A, C, F, J, O, ?",
    options: ["S", "T", "U", "V"],
    correctAnswer: "U",
    category: "sequence",
    difficulty: "hard"
  },
  {
    id: "q8",
    text: "If 3/5 of a number is 24, what is the number?",
    options: ["35", "40", "45", "50"],
    correctAnswer: "40",
    category: "math",
    difficulty: "easy"
  },
  {
    id: "q9",
    text: "A pump can fill a tank in 2 hours, while pump B can fill it in 3 hours. How long will it take both pumps to fill the tank?",
    options: ["1.2 hours", "1.5 hours", "2.5 hours", "5 hours"],
    correctAnswer: "1.2 hours",
    category: "math",
    difficulty: "hard"
  },
  {
    id: "q10",
    text: "Find the odd one out: Lion, Tiger, Leopard, Wolf, Cheetah",
    options: ["Lion", "Tiger", "Wolf", "Cheetah"],
    correctAnswer: "Wolf",
    category: "logical",
    difficulty: "easy"
  },
  {
    id: "q11",
    text: "If a cube has a volume of 27 cubic cm, what is the length of each edge?",
    options: ["3 cm", "6 cm", "9 cm", "27 cm"],
    correctAnswer: "3 cm",
    category: "geometry",
    difficulty: "easy"
  },
  {
    id: "q12",
    text: "Two trains starting at the same time from points A and B, 300 km apart, travel toward each other at 60 km/h and 40 km/h. How long until they meet?",
    options: ["2 hours", "3 hours", "4 hours", "5 hours"],
    correctAnswer: "3 hours",
    category: "math",
    difficulty: "medium"
  },
  {
    id: "q13",
    text: "If the sum of five consecutive integers is 45, what is the middle integer?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "9",
    category: "math",
    difficulty: "medium"
  },
  {
    id: "q14",
    text: "Which word does NOT belong in the group? Maple, Oak, Pine, Birch, Bush",
    options: ["Maple", "Oak", "Pine", "Bush"],
    correctAnswer: "Bush",
    category: "logical",
    difficulty: "easy"
  },
  {
    id: "q15",
    text: "What comes next in the pattern? 1, 4, 9, 16, 25, __",
    options: ["30", "36", "49", "64"],
    correctAnswer: "36",
    category: "sequence",
    difficulty: "easy"
  },
  {
    id: "q16",
    text: "A store offers a 20% discount on an item. If the discounted price is $40, what was the original price?",
    options: ["$45", "$48", "$50", "$60"],
    correctAnswer: "$50",
    category: "math",
    difficulty: "easy"
  },
  {
    id: "q17",
    text: "If 4 shirts and 3 pairs of pants cost $148, and 2 shirts and 1 pair of pants cost $62, how much does 1 shirt cost?",
    options: ["$15", "$18", "$20", "$22"],
    correctAnswer: "$20",
    category: "math",
    difficulty: "hard"
  },
  {
    id: "q18",
    text: "Which shape has the most sides? Pentagon, Hexagon, Octagon, Decagon",
    options: ["Pentagon", "Hexagon", "Octagon", "Decagon"],
    correctAnswer: "Decagon",
    category: "geometry",
    difficulty: "easy"
  },
  {
    id: "q19",
    text: "What is the probability of rolling a sum of 7 with two fair dice?",
    options: ["1/6", "1/8", "1/12", "1/36"],
    correctAnswer: "1/6",
    category: "probability",
    difficulty: "medium"
  },
  {
    id: "q20",
    text: "Complete the analogy: Book is to Reading as Fork is to ___",
    options: ["Kitchen", "Eating", "Cooking", "Plate"],
    correctAnswer: "Eating",
    category: "verbal",
    difficulty: "easy"
  },
  {
    id: "q21",
    text: "If the perimeter of a square is 24 cm, what is its area?",
    options: ["36 cm²", "24 cm²", "16 cm²", "64 cm²"],
    correctAnswer: "36 cm²",
    category: "geometry",
    difficulty: "medium"
  },
  {
    id: "q22",
    text: "If 3 people can paint 3 rooms in 3 hours, how many people are needed to paint 6 rooms in 6 hours?",
    options: ["3 people", "6 people", "9 people", "18 people"],
    correctAnswer: "3 people",
    category: "logical",
    difficulty: "hard"
  },
  {
    id: "q23",
    text: "What comes next? O, T, T, F, F, S, S, __",
    options: ["E", "N", "T", "X"],
    correctAnswer: "E",
    category: "sequence",
    difficulty: "hard"
  },
  {
    id: "q24",
    text: "A rectangular garden is 10 meters by 15 meters. What is the length of the diagonal?",
    options: ["15 meters", "18 meters", "20 meters", "25 meters"],
    correctAnswer: "18 meters",
    category: "geometry",
    difficulty: "medium"
  },
  {
    id: "q25",
    text: "If a water tank is 2/3 full and 30 gallons are added, it becomes 5/6 full. What is the capacity of the tank?",
    options: ["90 gallons", "120 gallons", "180 gallons", "240 gallons"],
    correctAnswer: "180 gallons",
    category: "math",
    difficulty: "hard"
  }
];

export function GameProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds per question
  const [isLoading, setIsLoading] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  // Load game results from localStorage
  useEffect(() => {
    if (user) {
      const storedResults = localStorage.getItem(`aptitude-genie-results-${user.id}`);
      if (storedResults) {
        setGameResults(JSON.parse(storedResults));
      }
    }
  }, [user]);

  // Save game results to localStorage when they change
  useEffect(() => {
    if (user && gameResults.length > 0) {
      localStorage.setItem(`aptitude-genie-results-${user.id}`, JSON.stringify(gameResults));
    }
  }, [gameResults, user]);

  // Timer logic when game is active
  useEffect(() => {
    let timer: number | undefined;
    
    if (gameActive && timerActive && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up, move to the next question
            clearInterval(timer);
            setTimeout(() => nextQuestion(), 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } 
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameActive, timerActive, timeRemaining]);

  const startGame = useCallback(() => {
    setIsLoading(true);
    console.log("Starting game...");
    
    // Shuffle and select 10 questions
    const shuffled = [...sampleQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10);
    
    console.log(`Selected ${selectedQuestions.length} questions`);
    
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setGameActive(true);
    setTimeRemaining(30);
    setTimerActive(true);
    setIsLoading(false);
  }, []);

  const endGame = useCallback((result: GameResult) => {
    console.log("Game ended with result:", result);
    setGameActive(false);
    setTimerActive(false);
    setGameResults(prev => [result, ...prev]);

    // Update user streak logic would go here
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      const lastPlayed = user.lastPlayed;
      
      // This is a simplified streak logic - in a real app you'd handle this on the backend
      // and check if the last play was exactly 1 day ago for consecutive streaks
      if (lastPlayed !== today) {
        const updatedUser = {
          ...user,
          lastPlayed: today,
          // If they played yesterday, increase streak, otherwise reset to 1
          streakDays: lastPlayed ? 
            (new Date(lastPlayed).getTime() > Date.now() - 86400000 * 2 ? 
              user.streakDays + 1 : 1) 
            : 1,
          // Add points based on result
          points: user.points + Math.round(result.accuracy * 10)
        };
        
        // Level up logic (very simple)
        if (updatedUser.points > updatedUser.level * 100) {
          updatedUser.level += 1;
        }
        
        // Save updated user to localStorage
        localStorage.setItem("aptitude-genie-user", JSON.stringify(updatedUser));
      }
    }
  }, [user]);

  const nextQuestion = useCallback(() => {
    setTimerActive(false);
    if (currentQuestionIndex < questions.length - 1) {
      console.log(`Moving to question ${currentQuestionIndex + 1} of ${questions.length}`);
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeRemaining(30); // Reset timer for next question
      // Small delay before activating timer for next question
      setTimeout(() => setTimerActive(true), 300);
    } else {
      // End of game - handled by the component that renders the game
      console.log("Reached end of questions");
      setGameActive(false);
    }
  }, [currentQuestionIndex, questions.length]);

  const answerQuestion = useCallback((answer: string): boolean => {
    setTimerActive(false);
    const correct = questions[currentQuestionIndex].correctAnswer === answer;
    console.log(`Answer selected: ${answer}, Correct: ${correct}`);
    return correct;
  }, [currentQuestionIndex, questions]);

  const resetGame = useCallback(() => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setGameActive(false);
    setTimerActive(false);
    setTimeRemaining(30);
  }, []);

  return (
    <GameContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        gameActive,
        gameResults,
        timeRemaining,
        isLoading,
        startGame,
        endGame,
        nextQuestion,
        answerQuestion,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
