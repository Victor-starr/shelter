"use client";

import GuardAuth from "@/guards/GuardAuth";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import type { Animal } from "@/lib/types";
import AnimalCard from "@/components/AnimalCard";

export default function Catalog() {
  const supabase = createClient();
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      const { data, error } = await supabase
        .from("animals")
        .select("*")
        .limit(100);
      if (error) {
        console.error("Error fetching animals:", error);
      } else {
        console.log("Fetched animals:", data);
        setAnimals(data || []);
      }
    };
    fetchAnimals();
  }, [supabase]);
  return (
    <GuardAuth>
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
              {animals?.map((animal) => (
                <AnimalCard key={animal.id} {...animal} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </GuardAuth>
  );
}
