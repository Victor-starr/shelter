"use client";
import { useAnimal } from "@/hook/useAnimal";
import { FormEvent, useState } from "react";

type AnimalVisitFormProps = {
  name?: string;
  email?: string;
  userId?: string;
  animalId: string;
  onClose: () => void;
  onSuccess: () => void;
};

const AnimalVisitForm = ({
  name,
  email,
  userId,
  animalId,
  onClose,
  onSuccess,
}: AnimalVisitFormProps) => {
  const { createBooking, loading } = useAnimal();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      date: string;
      time: string;
    };
    data.name = name || "";
    data.email = email || "";

    if (!userId) {
      console.error("User ID is missing. Please log in again.");
      setError("User ID is missing. Please log in again.");
      return;
    }
    try {
      await createBooking(data, animalId, userId);
      onSuccess();
      onClose();
    } catch (err) {
      setError("Failed to schedule visit. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="z-10 fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="z-11 flex flex-col gap-4 bg-card shadow-md px-8 py-5 rounded-lg w-full max-w-md">
        <h2 className="font-bold text-title text-2xl">Schedule a Visit</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="font-medium text-description">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-description"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="font-medium text-description">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              required
              className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-description"
            />
          </div>
          <div className="flex flex-row gap-4 pt-2">
            <button
              type="submit"
              className="w-full btn-primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimalVisitForm;
