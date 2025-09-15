
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star, BarChart, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function ProfileCard() {
  const { user } = useAuth();

  if (!user) return null;

  // Calculate progress to next level (simplified)
  const nextLevelPoints = user.level * 100;
  const progress = (user.points / nextLevelPoints) * 100;
  const pointsToNextLevel = nextLevelPoints - user.points;

  return (
    <Card className="w-full genie-card animate-scale-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-amber-500 mr-2" />
              <span className="font-medium">Level {user.level}</span>
            </div>
            <Badge variant="secondary" className="font-medium">
              {user.points} points
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {pointsToNextLevel} points to Level {user.level + 1}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background/40 p-3 rounded-lg flex items-center space-x-3">
            <div className="p-2 bg-genie-purple/10 rounded-full">
              <Award className="h-5 w-5 text-genie-purple" />
            </div>
            <div>
              <p className="text-sm font-medium">Current Streak</p>
              <p className="text-2xl font-bold">{user.streakDays} days</p>
            </div>
          </div>
          
          <div className="bg-background/40 p-3 rounded-lg flex items-center space-x-3">
            <div className="p-2 bg-amber-500/10 rounded-full">
              <Star className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Achievements</p>
              <p className="text-2xl font-bold">{Math.floor(user.points / 50)}</p>
            </div>
          </div>
          
          <div className="bg-background/40 p-3 rounded-lg flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <BarChart className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Points</p>
              <p className="text-2xl font-bold">{user.points}</p>
            </div>
          </div>
          
          <div className="bg-background/40 p-3 rounded-lg flex items-center space-x-3">
            <div className="p-2 bg-green-500/10 rounded-full">
              <Calendar className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Last Played</p>
              <p className="text-sm font-medium">
                {user.lastPlayed 
                  ? new Date(user.lastPlayed).toLocaleDateString() 
                  : "Never"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
