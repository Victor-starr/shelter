import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import type { Animal } from "@/utils/types";
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
    <main className="flex flex-col justify-start items-center min-h-screen">
      <header className="relative flex flex-col justify-center items-center w-full h-100">
        <div className="z-1 absolute inset-0 bg-black/60" />
        <Image
          src="/image.png"
          alt="Background Image"
          fill
          className="z-0 object-cover"
        />
        <h1 className="z-10 relative font-bold text-white text-6xl">Animals</h1>
      </header>
      <div className="mx-auto px-4 py-8 container">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {animals?.map((animal) => (
            <AnimalCard key={animal.id} {...animal} />
          ))}
        </div>
      </div>
    </main>
  );
}
