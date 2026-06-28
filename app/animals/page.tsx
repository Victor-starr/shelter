"use client";

import { useEffect } from "react";
import { useAnimal } from "@/hook/useAnimal";
import AnimalCard, { AnimalCardSkeleton } from "@/components/AnimalCard";

export default function Catalog() {
  const { animals, getAnimals, loading } = useAnimal();
  useEffect(() => {
    getAnimals(100);
  }, []);
  return (
    <main className="flex flex-col justify-start items-center bg-background px-4 py-12 min-h-screen">
      <div className="w-full max-w-7xl">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="mb-6 font-bold text-title text-4xl md:text-5xl">
            Welcome to Catalog
          </h1>
          <p className="mb-8 text-description text-lg">
            Browse and manage the animal catalog
          </p>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <AnimalCardSkeleton key={index} />
                ))
              : animals?.map((animal) => (
                  <AnimalCard key={animal.id} {...animal} />
                ))}
          </div>
        </div>
      </div>
    </main>
  );
}
