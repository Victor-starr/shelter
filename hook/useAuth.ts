"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { validateEmail } from "@/utils/validation";
import axios from "axios";

export interface useAuthReturn {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (formData: FormData) => Promise<{ error?: string } | undefined>;
  signup: (formData: FormData) => Promise<{ error?: string } | undefined>;
  logout: () => Promise<void>;
  userDelete: () => Promise<void>;
  handleResendEmail: () => Promise<void>;
  isResending: boolean;
  resendMessage: string | null;
}

type UserWithRole = User & {
  role: string;
};
export function useAuth(): useAuthReturn {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async (authUser: User) => {
      if (!authUser?.id) return { role: "user" };

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", authUser.id)
        .single();

      return { role: profile?.role ?? "user" };
    };

    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { role } = await fetchProfile(user);
      setUser({ ...user, role });
      setLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { role } = await fetchProfile(session.user);
      setUser({ ...session.user, role });
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function login(formData: FormData) {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    if (!data.email || !data.password) {
      return { error: "All fields are required" };
    }
    if (data.password.length < 6) {
      return { error: "Password must be at least 6 characters long" };
    }
    const isValidEmail = validateEmail(data.email);
    if (!isValidEmail) {
      return { error: "Please enter a valid email address." };
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      return { error: error.message };
    }

    router.push("/");
  }

  async function signup(formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validation checks - return errors instead of throwing
    if (!username || !email || !password || !confirmPassword) {
      return { error: "All fields are required." };
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters long" };
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      return { error: "Please enter a valid email address." };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      return { error: error.message };
    }

    // Create profile for newly registered users
    if (data.user && !data.user.email_confirmed_at) {
      try {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            username: username,
            avatar_url: null,
          },
        ]);

        if (profileError && !profileError.message.includes("duplicate key")) {
          console.error("Profile creation error:", profileError);
        }
      } catch (profileErr) {
        console.error("Fallback profile creation failed:", profileErr);
      }
    }
    router.push("/verify-email");
  }

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!user?.email) return;

    setIsResending(true);
    setResendMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user.email,
      });

      if (error) {
        setResendMessage("Failed to resend email. Please try again.");
      } else {
        setResendMessage("Verification email sent! Please check your inbox.");
      }
    } catch {
      setResendMessage("Failed to resend email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const userDelete = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await axios.delete("/auth/delete", {
        data: {
          user,
        },
      });
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    signup,
    logout,
    userDelete,
    handleResendEmail,
    isResending,
    resendMessage,
  };
}
