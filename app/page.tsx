import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import type { Animal } from "@/utils/types";
import AnimalCard from "./components/AnimalCard";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: animals, error } = (await supabase
    .from("animals")
    .select()) as { data: Animal[] | null; error: Error | null };
  if (error) throw error;
  console.log("ANIMALS: ", animals);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="mb-12 font-bold text-4xl">Animals</h1>
      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {animals?.map((animal) => (
          <AnimalCard key={animal.id} {...animal} />
        ))}
      </div>
    </main>
  );
}
