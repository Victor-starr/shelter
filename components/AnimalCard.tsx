import { Animal } from "@/lib/types";
import Image from "next/image";

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
      <button className="mt-6 w-full btn-primary"> Learn More </button>{" "}
    </div>
  );
};
export default AnimalCard;
