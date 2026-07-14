"use client";
import GuardAdmin from "@/guards/GuardAdmin";
import { useAnimal } from "@/hook/useAnimal";
import { ANIMAL_TYPES, AnimalType } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateAnimalPage = () => {
  const { createAnimal, loading, error } = useAnimal();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedAnimalType, setSelectedAnimalType] =
    useState<AnimalType | null>(null);
  const [animalAge, setAnimalAge] = useState<number>(0);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!selectedAnimalType) {
        throw new Error("Animal type is required");
      }

      const formData = new FormData(e.currentTarget);
      const imageFile = formData.get("image") as File | null;

      if (!imageFile || imageFile.size === 0) {
        throw new Error("Image is required");
      }

      const animalData = {
        name: formData.get("name") as string,
        type: selectedAnimalType,
        age: Number(animalAge),
        description: formData.get("description") as string,
        base64Image: imageFile,
      };

      const data = await createAnimal(animalData);
      if (data) {
        router.push(`/animals`);
      }
    } catch (error) {
      console.error("Error creating animal:", error);
    }
  };

  return (
    <GuardAdmin>
      <div className="fixed inset-0 flex justify-center items-center bg-black/50">
        <div className="flex flex-col gap-4 bg-card shadow-md px-8 py-6 rounded-lg w-full max-w-md">
          <h2 className="font-bold text-title text-2xl">Create Animal</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <p className="bg-error/55 px-4 py-2 border-2 border-error rounded-2xl font-bold text-title">
                {error.message}
              </p>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-medium text-description">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-description"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="type" className="font-medium text-description">
                Type
              </label>

              <div className="flex flex-row flex-wrap gap-3">
                {ANIMAL_TYPES.map((type) => (
                  <p
                    key={type}
                    onClick={() => setSelectedAnimalType(type)}
                    className={`cursor-pointer rounded-md px-4 py-2 select-none border ${
                      selectedAnimalType === type
                        ? "card border-primary"
                        : "btn-primary p-4 border-gray-300"
                    }`}
                  >
                    {type}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="age"
                className="flex justify-between items-center font-medium text-description"
              >
                <span>Age</span>
                <span
                  id="age-value"
                  className="bg-primary/10 px-3 py-1 rounded-full min-w-10 font-semibold text-primary text-sm text-center"
                >
                  {animalAge}
                </span>
              </label>

              <input
                type="range"
                id="age"
                name="age"
                min="0"
                max="40"
                required
                value={animalAge}
                onChange={(e) => setAnimalAge(Number(e.target.value))}
                className="bg-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40 w-full h-2 accent-primary appearance-none cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="font-medium text-description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-description"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="image" className="font-medium text-description">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                required
                onChange={handleImageChange}
                className="file:bg-primary file:mr-3 px-3 file:px-3 py-2 file:py-1 border border-border file:border-0 rounded-md file:rounded-md text-description file:text-white"
              />
              {preview && (
                <Image
                  src={preview}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="border rounded-md w-full h-48 object-cover"
                />
              )}
            </div>

            <div className="flex flex-row gap-4 pt-2">
              <button
                type="submit"
                className="w-full btn-primary"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="w-full btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </GuardAdmin>
  );
};

export default CreateAnimalPage;
