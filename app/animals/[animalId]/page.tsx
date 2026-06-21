"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Animal, Booking } from "@/lib/types";
import { useParams } from "next/navigation";
import { useAuth } from "@/hook/useAuth";
import AnimalDetails from "@/components/AnimalDetails";
import Link from "next/link";

function AnimalPage() {
  const { animalId } = useParams();
  const { isAdmin, isAuthenticated } = useAuth();
  const supabase = createClient();
  const [toggleAnimalList, setToggleAnimalList] = useState(false);
  const [animalBooking, setAnimalBooking] = useState<Booking[]>([]);

  const [animal, setAnimal] = useState<Animal | null>(null);
  useEffect(() => {
    const fetchAnimals = async () => {
      const { data: animalData, error: animalError } = await supabase
        .from("animals")
        .select("*")
        .eq("id", animalId)
        .single();
      if (animalError) {
        console.error("Error fetching animal:", animalError);
      } else {
        console.log("Fetched animal:", animalData);
        setAnimal(animalData);
      }
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select("*")
        .eq("animal_id", animalId)
        .order("visit_date", { ascending: false });
      if (bookingError) {
        console.error("Error fetching animal bookings:", bookingError);
      } else {
        console.log("Fetched animal bookings:", bookingData);
        setAnimalBooking(bookingData);
      }
    };
    fetchAnimals();
  }, [supabase]);
  return (
    <main className="flex flex-col justify-start items-center bg-background px-4 py-12 min-h-screen">
      <div className="mb-12 w-full max-w-4xl text-center">
        <h1 className="mb-2 font-bold text-title text-4xl md:text-5xl">
          Meet {animal?.name}
        </h1>
        <p className="text-description text-lg">
          Get to know more about this lovely animal.
        </p>
      </div>
      {animal ? (
        <>
          <AnimalDetails
            isAdmin={isAdmin}
            isAuth={isAuthenticated}
            animal={animal}
            toogleAnimalList={toggleAnimalList}
            onToggleVisitList={() => setToggleAnimalList((prev) => !prev)}
          />
          {toggleAnimalList && isAdmin && (
            <div className="mt-10 w-full max-w-4xl">
              <h3 className="mb-4 font-bold text-title text-2xl text-center">
                Scheduled Visits
              </h3>
              {animalBooking.length > 0 ? (
                <ul className="space-y-4">
                  {animalBooking.map((visit) => (
                    <li
                      className="relative shadow-md p-4 rounded-lg card"
                      key={visit.id}
                    >
                      <p className="font-semibold text-primary">
                        {visit.guest_name}
                      </p>
                      <p className="text-description">{visit.guest_email}</p>
                      <p className="mt-2 text-gray-500 text-sm">
                        Visit Date:{" "}
                        {new Date(visit.visit_date).toLocaleDateString()}
                      </p>
                      <button className="top-10 right-10 absolute bg-red-600 hover:bg-red-700 shadow-md px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-transform transform">
                        Cancel Visit
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-description text-center">
                  There are no visits scheduled for this animal yet.
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <p>
            We Couldn&apos;t found the animal you are looking for! Please{" "}
            <Link
              href="/animals/catalog"
              className="text-primary hover:underline"
            >
              browse our animals
            </Link>{" "}
            to find the one you&apos;re looking for.
          </p>
        </div>
      )}
    </main>
  );
}

export default AnimalPage;
