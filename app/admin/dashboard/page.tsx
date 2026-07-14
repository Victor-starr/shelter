import GuardAdmin from "@/guards/GuardAdmin";
import { IoCreateOutline } from "react-icons/io5";
import Link from "next/link";

export default function Dashboard() {
  return (
    <GuardAdmin>
      <main className="flex flex-col justify-start items-center bg-background px-4 py-12 min-h-screen">
        <div className="w-full max-w-4xl">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="mb-3 font-bold text-title text-4xl md:text-5xl">
              Welcome to Admin Dashboard
            </h1>
            <p className="text-description text-lg">
              Manage animals, bookings, and user activities from this
              centralized dashboard.
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Saved Animals */}
            <div className="space-y-4 hover:shadow-xl px-3 py-3 transition-shadow cursor-pointer card">
              <div className="flex justify-center items-center bg-primary/20 rounded-lg w-12 h-12 text-primary">
                <IoCreateOutline size={24} />
              </div>
              <h3 className="font-bold text-title text-xl">Create Animal</h3>
              <p className="text-description text-sm">
                Add new animals to the shelter
              </p>

              <Link
                href="/animals/create"
                className="mt-2 font-semibold text-primary hover:text-primary/80 text-sm transition-colors"
              >
                Create Animal
              </Link>
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
