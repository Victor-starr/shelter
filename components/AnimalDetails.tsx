import { Animal } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
type animalDetailsProps = {
  animal: Animal;
  isAuth: boolean;
  isAdmin: boolean;
  toogleAnimalList: boolean;
  onToggleVisitList: () => void;
  onToggleVisitForm: () => void;
  onDelete: () => void;
};
const AnimalDetails = ({
  animal,
  isAuth,
  isAdmin,
  toogleAnimalList,
  onToggleVisitList,
  onToggleVisitForm,
  onDelete,
}: animalDetailsProps) => {
  return (
    <div className="items-start gap-10 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-4xl">
      <div className="w-full">
        <Image
          src={animal?.image_url || ""}
          alt={animal?.name || "Animal Image"}
          width={600}
          height={600}
          className="shadow-lg rounded-lg w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-col h-full">
        <h2 className="mb-4 font-bold text-title text-4xl">{animal?.name}</h2>
        <div className="space-y-2 mb-4">
          <p className="text-description text-lg">
            <span className="font-semibold text-primary">Type:</span>{" "}
            {animal?.type}
          </p>
          <p className="text-description text-lg">
            <span className="font-semibold text-primary">Age:</span>{" "}
            {animal?.age}
          </p>
        </div>
        <p className="mb-6 text-description text-lg">{animal?.description}</p>
        <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-description border-t">
          {isAuth && !isAdmin && (
            <button
              onClick={onToggleVisitForm}
              className="bg-primary hover:bg-blue-600 shadow-md px-6 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-transform transform"
            >
              Visit Me
            </button>
          )}
          {isAdmin && (
            <>
              {/* <Link href={`/animals/${animal.id}/edit`} className="btn-primary">
                Edit
              </Link> */}
              <button
                onClick={onDelete}
                className="bg-red-600 hover:bg-red-700 shadow-md px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-transform transform"
              >
                Delete
              </button>
            </>
          )}
          <button onClick={onToggleVisitList} className="btn-secondary">
            {toogleAnimalList ? "Hide Visits" : "View Visits"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;

export const AnimalDetailsSkeleton = () => {
  return (
    <div className="items-start gap-10 grid grid-cols-1 md:grid-cols-2 bg-gray-300/20 mx-auto px-6 py-4 w-4xl animate-pulse">
      <div className="w-full">
        <div className="bg-gray-300/50 rounded-lg w-full h-80"></div>
      </div>
      <div className="flex flex-col h-full">
        <div className="bg-gray-300/50 my-6 rounded-lg w-full h-15"></div>
        <div className="bg-gray-300/50 mt-4 rounded-lg w-full h-8"></div>
        <div className="bg-gray-300/50 mt-3 rounded-lg w-full h-8"></div>
        <div className="bg-gray-300/50 mt-5 rounded-lg w-full h-25"></div>
      </div>
    </div>
  );
};
