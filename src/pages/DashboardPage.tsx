import { useAuth } from "@/context/AuthContext";
import StatsOverview from "@/components/dashboard/StatsOverview";
import RecentResults from "@/components/dashboard/RecentResults";
import StreakCalendar from "@/components/dashboard/StreakCalendar";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in.</div>;

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      <StatsOverview userId={user.id} />
      <StreakCalendar userId={user.id} streakDays={user.streak_days} />
      <RecentResults userId={user.id} />
    </main>
  );
}
