import { Animal } from "@/lib/types";
import Image from "next/image";

const AnimalCard = (animal: Animal) => {
  return (
    <div
      key={animal.id}
      className="bg-primary shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 transform"
    >
      <div className="relative w-full h-64">
        <Image
          src={animal.image_url}
          alt={animal.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="mb-2 font-bold text-title text-2xl">{animal.name}</h2>

        <p className="mb-2 text-description text-lg">Type: {animal.type}</p>
        <p className="mb-4 text-description text-lg">Age: {animal.age}</p>
        <p className="text-description text-base">{animal.description}</p>
      </div>
    </div>
  );
};

export default AnimalCard;
