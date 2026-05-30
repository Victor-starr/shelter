import { Animal } from "@/utils/types";
import Image from "next/image";

const AnimalCard = (animal: Animal) => {
  return (
    <div
      key={animal.id}
      className="bg-primary shadow-md rounded-lg overflow-hidden"
    >
      <Image
        src={animal.image_url}
        alt={animal.name}
        className="w-full h-[50%] object-center object-cover"
        width={300}
        height={300}
      />
      <div className="p-4">
        <h2 className="mb-2 font-bold text-title text-xl">{animal.name}</h2>

        <p className="mb-2 text-muted text-lg">Type: {animal.type}</p>
        <p className="mb-2 text-muted text-lg">Age: {animal.age}</p>
        <p className="text-description text-md">{animal.description}</p>
      </div>
    </div>
  );
};

export default AnimalCard;
