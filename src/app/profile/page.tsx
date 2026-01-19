import { Navigation } from "@/components/layout/navigation";
import { UserProfile } from "@/components/profile/user-profile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserProfile />
      </main>
    </div>
  );
}
