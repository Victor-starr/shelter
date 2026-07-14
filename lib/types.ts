import { User as supabaseUser } from "@supabase/supabase-js";

export const ANIMAL_TYPES = ["Dog", "Cat", "Bird", "Rabbit", "Other"] as const;
export type AnimalType = (typeof ANIMAL_TYPES)[number];

export type Animal = {
  id: string;
  name: string;
  type: AnimalType;
  age: number;
  description: string;
  image_url: string;
  created_at: string;
};

export type Booking = {
  id: string;
  user_id: string;
  animal_id: string;
  guest_name: string;
  guest_email: string;
  visit_datetime: string;
  created_at: string;
};

export type User = supabaseUser;
