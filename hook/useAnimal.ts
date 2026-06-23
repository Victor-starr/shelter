"use client";
import type { Animal, Booking } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

type useAnimalReturnType = {
  animals: Animal[] | null;
  setAnimals: (animals: Animal[] | null) => void;
  getAnimals: (lengthAnimals?: number | null) => Promise<void>;
  loading: boolean;
  error: Error | null;
  bookings: Booking[] | null;
  setBookings: (bookings: Booking[] | null) => void;
  getSpecificAnimal: (animalId: string) => Promise<void>;
};

export function useAnimal(): useAnimalReturnType {
  const supabase = createClient();
  const [animals, setAnimals] = useState<Animal[] | null>(null);
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getAnimals = async (lengthAnimals?: number | null) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from("animals").select("*");
      if (typeof lengthAnimals === "number") {
        query = query.limit(lengthAnimals);
      }

      const { data: animalsData, error: queryError } = await query;
      if (queryError) throw queryError;

      setAnimals((animalsData as Animal[]) ?? null);
    } catch (err) {
      console.error("Error fetching animals:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  const getSpecificAnimal = async (animalId: string) => {
    try {
      setError(null);
      setLoading(true);
      const { data: animalData, error: animalError } = await supabase
        .from("animals")
        .select("*")
        .eq("id", animalId)
        .single();
      if (animalError) throw animalError;

      setAnimals(animalData ? [animalData as Animal] : null);

      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select("*")
        .eq("animal_id", animalId)
        .order("visit_date", { ascending: false });
      if (bookingError) throw bookingError;

      setBookings((bookingData as Booking[]) ?? null);
    } catch (err) {
      console.error("Error fetching animal:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    animals,
    setAnimals,
    getAnimals,
    loading,
    error,
    bookings,
    setBookings,
    getSpecificAnimal,
  };
}
