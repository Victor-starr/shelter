import { User as supabaseUser } from "@supabase/supabase-js";

export type Animal = {
  id: string;
  name: string;
  type: string;
  age: number;
  description: string;
  image_url: string;
  created_at: string;
};

export type User = supabaseUser;
