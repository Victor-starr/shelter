import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import type { Animal } from "@/lib/types";
import AnimalCard from "@/components/AnimalCard";
import Image from "next/image";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: animals, error } = (await supabase
    .from("animals")
    .select()
    .limit(3)) as { data: Animal[] | null; error: Error | null };
  if (error) throw error;

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
            {animals?.map((animal) => (
              <AnimalCard key={animal.id} {...animal} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
