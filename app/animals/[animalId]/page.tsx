"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/hook/useAuth";
import AnimalDetails, {
  AnimalDetailsSkeleton,
} from "@/components/AnimalDetails";
import Link from "next/link";
import { useAnimal } from "@/hook/useAnimal";
import AnimalVisitForm from "@/components/AnimalVisitForm";

function AnimalPage() {
  const { animalId } = useParams();
  const { isAdmin, isAuthenticated } = useAuth();
  const {
    getSpecificAnimal,
    animals: currentAnimal,
    bookings,
    loading,
  } = useAnimal();
  const [toggleAnimalList, setToggleAnimalList] = useState<boolean>(false);
  const [toggleVisitForm, setToggleVisitForm] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (typeof animalId === "string") {
      getSpecificAnimal(animalId);
    }
  }, [animalId]);

  const animal = currentAnimal?.[0];

  const handleSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <main className="flex flex-col justify-start items-center bg-background px-4 py-12 min-h-screen">
      {isAuthenticated && !isAdmin && toggleVisitForm && animal && (
        <AnimalVisitForm
          animalId={animal.id}
          onClose={() => setToggleVisitForm(false)}
          onSuccess={handleSuccess}
        />
      )}
      <div className="mb-12 w-full max-w-4xl text-center">
        {loading ? (
          <div className="flex flex-col items-center space-y-4">
            <span className="inline-block bg-gray-300/50 mb-2 rounded-md w-64 h-10 animate-pulse"></span>
            <span className="inline-block bg-gray-300/50 rounded-md w-96 h-6 animate-pulse"></span>
          </div>
        ) : (
          <>
            <h1 className="mb-2 font-bold text-title text-4xl md:text-5xl">
              Meet {animal?.name || "our friend"}
            </h1>
            <p className="text-description text-lg">
              Get to know more about this lovely animal.
            </p>
            {showSuccessMessage && (
              <p className="bg-green-100 mt-4 px-4 py-2 rounded-md text-green-600">
                Visit scheduled successfully!
              </p>
            )}
          </>
        )}
      </div>
      {loading ? (
        <AnimalDetailsSkeleton />
      ) : animal ? (
        <>
          <AnimalDetails
            isAdmin={isAdmin}
            isAuth={isAuthenticated}
            animal={animal}
            toogleAnimalList={toggleAnimalList}
            onToggleVisitList={() => setToggleAnimalList((prev) => !prev)}
            onToggleVisitForm={() => setToggleVisitForm(true)}
          />
          {toggleAnimalList && isAdmin && (
            <div className="mt-10 w-full max-w-4xl">
              <h3 className="mb-4 font-bold text-title text-2xl text-center">
                Scheduled Visits
              </h3>
              {bookings && bookings.length > 0 ? (
                <ul className="space-y-4">
                  {bookings.map((visit) => (
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
                        {new Date(visit.visit_datetime).toLocaleString()}
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
