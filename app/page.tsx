"use client";

import AnimalCard, { AnimalCardSkeleton } from "@/components/AnimalCard";
import { useAnimal } from "@/hook/useAnimal";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { animals, loading, getAnimals } = useAnimal();

  useEffect(() => {
    getAnimals(3);
  }, []);

  return (
    <main className="flex flex-col justify-start items-center bg-background min-h-screen">
      <header className="relative flex flex-col justify-center items-center w-full h-96 overflow-hidden">
        <div className="z-10 absolute inset-0 bg-linear-to-b from-black/50 dark:from-black/40 to-black/30 dark:to-black/20" />
        <Image
          src="/bg.png"
          alt="Background Image"
          fill
          priority
          className="object-cover"
        />
        <div className="z-20 relative space-y-4 text-center">
          <h1 className="drop-shadow-lg font-bold text-white text-5xl md:text-6xl lg:text-7xl">
            Find Your Perfect Companion
          </h1>
          <p className="drop-shadow-md px-4 max-w-2xl text-white/90 text-lg md:text-xl">
            Discover wonderful animals waiting for a loving home
          </p>
        </div>
      </header>
      <div className="px-4 py-12 md:py-16 w-full">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="mb-2 font-bold text-title text-3xl md:text-4xl">
              Available Animals
            </h2>
            <p className="text-description text-lg">
              Meet some of our wonderful animals looking for their forever homes
            </p>
          </div>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {!loading ? (
              animals === null ? (
                <h2 className="text-description text-lg">
                  No available animals right now
                </h2>
              ) : (
                animals?.map((animal) => (
                  <AnimalCard key={animal.id} {...animal} />
                ))
              )
            ) : (
              Array.from({ length: 3 }).map((_, index) => (
                <AnimalCardSkeleton key={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
