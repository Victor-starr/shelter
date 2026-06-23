import { Animal } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const AnimalCard = (animal: Animal) => {
  return (
    <div className="group flex flex-col hover:shadow-xl h-full overflow-hidden transition-all duration-300 card">
      <div className="relative mb-4 rounded-lg w-full h-64 overflow-hidden">
        <Image
          src={animal.image_url}
          alt={animal.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />{" "}
      </div>{" "}
      <div className="flex-1 space-y-3">
        <h2 className="font-bold text-title text-2xl">{animal.name}</h2>{" "}
        <div className="space-y-2">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <span className="font-semibold text-primary text-sm">
              Type:
            </span>{" "}
            <span className="text-description text-sm">{animal.type}</span>{" "}
          </div>{" "}
          <div className="flex items-center gap-2">
            {" "}
            <span className="font-semibold text-primary text-sm">
              Age:
            </span>{" "}
            <span className="text-description text-sm">{animal.age}</span>{" "}
          </div>{" "}
        </div>{" "}
        <p className="text-description text-sm line-clamp-3 leading-relaxed">
          {animal.description}
        </p>{" "}
      </div>{" "}
      {/* Button */}{" "}
      <Link
        href={`/animals/${animal.id}`}
        className="mt-6 w-full text-center btn-primary"
      >
        Learn More
      </Link>
    </div>
  );
};
export default AnimalCard;

export const AnimalCardSkeleton = () => {
  return (
    <div className="group flex flex-col hover:shadow-xl h-full overflow-hidden transition-all duration-300 card">
      <div className="relative mb-4 rounded-lg w-full h-64 overflow-hidden">
        <div className="h-full w-full animate-pulse bg-gray-200" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </div>{" "}
          <div className="flex items-center gap-2">
            <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          </div>{" "}
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
      <div className="mt-6 h-11 w-full animate-pulse rounded bg-gray-200" />
    </div>
  );
};