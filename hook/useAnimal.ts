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
  getSpecificAnimal: (animalId: string, userId?: string) => Promise<void>;
  getAnimalBookings: (animalId: string) => Promise<void>;
  createBooking: (
    formData: FormData,
    animalId: string,
    userId: string,
  ) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
};
interface FormData {
  name: string;
  email: string;
  date: string;
  time: string;
}

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

      getAnimalBookings(animalId);
    } catch (err) {
      console.error("Error fetching animal:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const getAnimalBookings = async (animalId: string) => {
    try {
      setError(null);
      setLoading(true);
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select("*")
        .eq("animal_id", animalId)
        .order("visit_datetime", {
          ascending: false,
        });
      if (bookingError) throw bookingError;

      setBookings((bookingData as Booking[]) ?? null);
    } catch (err) {
      console.error("Error fetching animal:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (
    formData: FormData,
    animalId: string,
    userId: string,
  ) => {
    try {
      setError(null);
      setLoading(true);
      const visit_datetime = `${formData.date}T${formData.time}`;
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          user_id: userId,
          animal_id: animalId,
          guest_name: formData.name,
          guest_email: formData.email,
          visit_datetime: visit_datetime,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (bookingError) throw bookingError;

      setBookings((prevBookings) => [
        bookingData as Booking,
        ...(prevBookings || []),
      ]);
    } catch (err) {
      console.error("Error creating booking:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      setError(null);
      setLoading(true);
      const { error: deleteError } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);
      if (deleteError) throw deleteError;
      setBookings((prevBookings) =>
        prevBookings ? prevBookings.filter((b) => b.id !== bookingId) : null,
      );
    } catch (err) {
      console.error("Error canceling booking:", err);
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
    getAnimalBookings,
    createBooking,
    cancelBooking,
  };
}
