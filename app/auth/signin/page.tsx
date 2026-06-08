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
      <main className="flex flex-col justify-center items-center bg-background px-4 py-12 min-h-screen">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <div className="mb-10 text-center">
            <h1 className="mb-2 font-bold text-primary text-4xl">Shelter</h1>
            <p className="text-description text-lg">
              Welcome back to your companion
            </p>
          </div>

          {/* Card Container */}
          <div className="space-y-8 card">
            <div>
              <h2 className="font-bold text-title text-2xl text-center">
                Sign In
              </h2>
              <p className="mt-2 text-muted text-sm text-center">
                Access your account to browse animals
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block font-semibold text-title text-sm"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                  className="input-field"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block font-semibold text-title text-sm"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  className="input-field"
                />
              </div>

              {/* Sign In Button */}
              <button type="submit" className="w-full btn-primary">
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="border-border border-t w-full"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button */}
            <GoogleBtn
              onClick={handleSignInGoggle}
              disabled={loading}
              type="signin"
            />

            {/* Error Message */}
            {formMsg && (
              <div className="bg-error/10 p-3 border border-error rounded-lg text-error text-sm">
                {formMsg}
              </div>
            )}

            {/* Sign Up Link */}
            <div className="pt-4 border-border border-t text-center">
              <p className="text-description text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-semibold text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </GuardGuest>
  );
};

export default SignInPage;
