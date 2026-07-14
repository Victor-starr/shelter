"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hook/useAuth";
import AnimalDetails, {
  AnimalDetailsSkeleton,
} from "@/components/AnimalDetails";
import Link from "next/link";
import { useAnimal } from "@/hook/useAnimal";
import AnimalVisitForm from "@/components/AnimalVisitForm";
import AnimalVisitList from "@/components/AnimalVisitList";
import { createGoogleCalendarUrl } from "@/utils/createGoogleCalendarUrl";
import ConfirmAction from "@/components/ConfirmAction";

function AnimalPage() {
  const { animalId } = useParams();
  const { user, isAdmin, isAuthenticated } = useAuth();
  const userId = user?.id;
  const router = useRouter();
  const {
    getSpecificAnimal,
    getAnimalBookings,
    deleteAnimal,
    cancelBooking,
    animals: currentAnimal,
    bookings,
    loading,
  } = useAnimal();
  const [toggleAnimalList, setToggleAnimalList] = useState<boolean>(false);
  const [toggleVisitForm, setToggleVisitForm] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [toggleConfirmDelete, setToggleConfirmDelete] = useState(false);

  useEffect(() => {
    if (typeof animalId === "string") {
      getSpecificAnimal(animalId, userId);
    }
  }, [animalId]);

  const animal = currentAnimal?.[0];
  const handleSuccess = () => {
    setShowSuccessMessage(true);
    setToggleAnimalList(true);
    getAnimalBookings(animalId as string);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };
  const handleAddToGoogle = () => {
    if (!animal || !bookings || bookings.length === 0) return;
    const url = createGoogleCalendarUrl(animal, bookings?.[0]);
    window.open(url, "_blank");
  };

  const handleDeleteAnimal = () => {
    if (animal) {
      deleteAnimal(animal.id);
      setToggleConfirmDelete(false);
      router.push("/animals");
    }
  };
  return (
    <main className="flex flex-col justify-start items-center bg-background px-4 py-12 min-h-screen">
      {toggleConfirmDelete && (
        <ConfirmAction
          message="Are you sure you want to delete this animal?"
          onConfirm={() => handleDeleteAnimal()}
          onCancel={() => setToggleConfirmDelete(false)}
        />
      )}
      {isAuthenticated && !isAdmin && toggleVisitForm && animal && (
        <AnimalVisitForm
          name={user?.user_metadata?.full_name}
          email={user?.email}
          userId={userId}
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
              <p className="bg-success/50 mt-4 px-4 py-2 rounded-md text-title">
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
            onDelete={() => setToggleConfirmDelete(true)}
            onToggleVisitList={() => setToggleAnimalList((prev) => !prev)}
            onToggleVisitForm={() => setToggleVisitForm(true)}
          />
          {toggleAnimalList && (
            <AnimalVisitList
              bookings={bookings || []}
              isAdmin={isAdmin}
              userId={userId || ""}
              cancelBooking={cancelBooking}
              onVisitCanceled={() => getAnimalBookings(animalId as string)}
              addCalendar={handleAddToGoogle}
            />
          )}
        </>
      ) : (
        <div className="text-center">
          <p>
            We Couldn&apos;t found the animal you are looking for! Please{" "}
            <Link href="/animals" className="text-primary hover:underline">
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
