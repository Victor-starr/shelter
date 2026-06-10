"use client";

import { GuardAuth } from "@/guards/GuardAuth";
import { useAuth } from "@/hook/useAuth";

export default function Catalog() {
  const { user } = useAuth();
  console.log("userd", user);
  return (
    <GuardAuth>
      <main className="flex flex-col justify-start items-center bg-background px-4 py-12 min-h-screen">
        <div className="w-full max-w-4xl">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="mb-3 font-bold text-title text-4xl md:text-5xl">
              Welcome to Catalog
            </h1>
            <p className="text-description text-lg">
              Browse and manage the animal catalog
            </p>
          </div>
        </div>
      </main>
    </GuardAuth>
  );
}
