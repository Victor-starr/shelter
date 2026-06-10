import GuardAdmin from "@/guards/GuardAdmin";

export default function Dashboard() {
  return (
    <GuardAdmin>
      <main className="flex flex-col justify-start items-center bg-background px-4 py-12 min-h-screen">
        <div className="w-full max-w-4xl">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="mb-3 font-bold text-title text-4xl md:text-5xl">
              Welcome to Your Dashboard
            </h1>
            <p className="text-description text-lg">
              Manage your profile, saved animals, and adoptions
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Saved Animals */}
            <div className="space-y-4 hover:shadow-xl transition-shadow cursor-pointer card">
              <div className="flex justify-center items-center bg-primary/20 rounded-lg w-12 h-12 text-primary">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="font-bold text-title text-xl">Saved Animals</h3>
              <p className="text-description text-sm">
                View all the animals you{`&apos`}ve saved for later
              </p>

              <button className="mt-2 font-semibold text-primary hover:text-primary/80 text-sm transition-colors">
                View Saved →
              </button>
            </div>

            {/* Card 2: My Adoptions */}
            <div className="space-y-4 hover:shadow-xl transition-shadow cursor-pointer card">
              <div className="flex justify-center items-center bg-secondary/20 rounded-lg w-12 h-12 text-secondary">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-bold text-title text-xl">My Adoptions</h3>
              <p className="text-description text-sm">
                Track and manage your adopted animals
              </p>
              <button className="mt-2 font-semibold text-primary hover:text-primary/80 text-sm transition-colors">
                View Adoptions →
              </button>
            </div>

            {/* Card 3: My Profile */}
            <div className="space-y-4 hover:shadow-xl transition-shadow cursor-pointer card">
              <div className="flex justify-center items-center bg-accent/20 rounded-lg w-12 h-12 text-accent">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="font-bold text-title text-xl">My Profile</h3>
              <p className="text-description text-sm">
                Update your personal information
              </p>
              <button className="mt-2 font-semibold text-primary hover:text-primary/80 text-sm transition-colors">
                Edit Profile →
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12">
            <h2 className="mb-6 font-bold text-title text-2xl">
              Recent Activity
            </h2>
            <div className="space-y-4 card">
              <p className="py-8 text-description text-center">
                No recent activity yet. Start exploring animals to get started!
              </p>
            </div>
          </div>
        </div>
      </main>
    </GuardAdmin>
  );
}
