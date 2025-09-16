import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

export function StreakCalendar() {
  const { user } = useAuth();
  if (!user) return null;

  const today = new Date();
  const dayOfWeek = today.getDay();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek);

  // Correct property: last_played
  const lastPlayedDate = user.last_played ? user.last_played.split('T')[0] : null;

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      isToday: date.toDateString() === today.toDateString(),
      isActive: lastPlayedDate === date.toISOString().split('T')[0]
    };
  });

  // Correct property/case for streak_days
  const streakDays = typeof user.streak_days === 'number' ? user.streak_days : 0;
  const streakMessages = [
    "Start your streak today!",
    "Great start! Keep going!",
    "You're building momentum!",
    "Impressive consistency!",
    "You're on fire!",
    "Unstoppable streak!",
    "Legendary dedication!"
  ];

  const streakMessage = streakMessages[
    Math.min(Math.floor(streakDays / 2), streakMessages.length - 1)
  ];

  return (
    <Card className="w-full genie-card animate-scale-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Your Streak</CardTitle>
          <CardDescription>{streakMessage}</CardDescription>
        </div>
        <Award 
          className={`h-5 w-5 ${streakDays > 0 ? "text-amber-500" : "text-muted-foreground"}`} 
        />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          {days.map((day, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">{day.name}</span>
              <div
                className={`
                  w-8 h-8 mt-1 rounded-full flex items-center justify-center text-sm
                  ${day.isToday ? 'border border-primary' : ''}
                  ${day.isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'}
                `}
              >
                {day.date}
              </div>
            </div>
          ))}
        </div>

        {streakDays > 0 && (
          <div className="mt-4 flex items-center justify-center">
            <div className="px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium flex items-center">
              <Award className="h-4 w-4 mr-1" />
              {streakDays} day{streakDays !== 1 ? 's' : ''} streak
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
