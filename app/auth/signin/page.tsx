"use client";
import GoogleBtn from "@/components/GoogleBtn";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/hook/useAuth";
import Link from "next/link";
import { useState } from "react";
import GuardGuest from "@/guards/GuardGuest";

const SignInPage = () => {
  const { login, loading } = useAuth();
  const supabase = createClient();
  const [formMsg, setFormMsg] = useState<string | null>(null);

  const handleSignInGoggle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      setFormMsg(result.error);
    }
  };
  return (
    <GuardGuest>
      <main className="flex flex-col justify-center items-center bg-background min-h-screen">
        <div className="space-y-8 bg-card shadow-lg p-8 rounded-lg w-full max-w-md">
          <h1 className="font-bold text-title text-2xl text-center">Sign In</h1>
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-description text-sm"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block bg-background shadow-sm px-3 py-2 border border-border focus:border-ring rounded-md focus:outline-none focus:ring-ring w-full text-title sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 font-medium text-description text-sm"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block bg-background shadow-sm px-3 py-2 border border-border focus:border-ring rounded-md focus:outline-none focus:ring-ring w-full text-title sm:text-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <Link
                href="/auth/signup"
                className="text-primary text-sm hover:underline"
              >
                Don&apos;t have an account? Sign Up
              </Link>
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full font-bold text-white"
            >
              Sign In
            </button>
            <GoogleBtn
              onClick={handleSignInGoggle}
              disabled={loading}
              type="signin"
            />
            {formMsg && <p className="mt-5 text-error text-sm">{formMsg}</p>}
          </form>
        </div>
      </main>
    </GuardGuest>
  );
};

export default SignInPage;
