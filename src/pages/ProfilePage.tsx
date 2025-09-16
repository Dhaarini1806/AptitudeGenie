import { useAuth } from "@/context/AuthContext";
import ProfileCard from "@/components/profile/ProfileCard";
import Badge from "@/components/ui/badge";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in.</div>;

  return (
    <main className="max-w-xl mx-auto p-4">
      <ProfileCard user={user} />
      <section className="mt-8">
        <h2 className="mb-2 text-xl font-bold">Badges</h2>
        {/* This is where you'll render user badges from Supabase */}
        <div className="flex flex-wrap gap-2">
          {/* Example: <Badge key={badge.id}>{badge.name}</Badge> */}
        </div>
      </section>
    </main>
  );
}
