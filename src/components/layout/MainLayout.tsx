
import { ReactNode, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ProfileCard } from "../profile/ProfileCard";
import { StreakCalendar } from "../dashboard/StreakCalendar";
import { StatsOverview } from "../dashboard/StatsOverview";
import { RecentResults } from "../dashboard/RecentResults";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { GameContainer } from "../game/GameContainer";
import { AuthContainer } from "../auth/AuthContainer";
import { Award, BarChart, ArrowRight } from "lucide-react";

type View = "dashboard" | "profile" | "game";

export function MainLayout() {
  const { user, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<View>("dashboard");
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header onViewProfile={() => setCurrentView("profile")} />
        <main className="flex-1 py-8 px-4 md:px-8 max-w-5xl mx-auto w-full flex items-center justify-center">
          <AuthContainer onAuthSuccess={() => setCurrentView("dashboard")} />
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onViewProfile={() => setCurrentView("profile")} />
      
      <main className="flex-1 py-8 px-4 md:px-8 max-w-5xl mx-auto w-full">
        {currentView === "dashboard" && (
          <Dashboard onStartGame={() => setCurrentView("game")} />
        )}
        
        {currentView === "profile" && (
          <Profile onBackToDashboard={() => setCurrentView("dashboard")} />
        )}
        
        {currentView === "game" && (
          <div className="flex flex-col items-center justify-center">
            <GameContainer onGoHome={() => setCurrentView("dashboard")} />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

function Dashboard({ onStartGame }: { onStartGame: () => void }) {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button 
          onClick={onStartGame}
          className="genie-gradient text-white"
        >
          Start Challenge
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StreakCalendar />
        <StatsOverview />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RecentResults limit={5} />
      </div>
    </div>
  );
}

function Profile({ onBackToDashboard }: { onBackToDashboard: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Profile</h2>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileCard />
        
        <div className="space-y-6">
          <StreakCalendar />
          <StatsOverview />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RecentResults />
      </div>
    </div>
  );
}
