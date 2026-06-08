"use client";
import GoogleBtn from "@/components/GoogleBtn";
import GuardGuest from "@/guards/GuardGuest";
import { useAuth } from "@/hook/useAuth";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useState } from "react";

const SignUpPage = () => {
  const { signup, loading } = useAuth();
  const supabase = createClient();
  const [formMsg, setFormMsg] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);
    if (result?.error) {
      setFormMsg(result.error);
    }
  };

  const handleSignInGoggle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  return (
    <GuardGuest>
      <main className="flex flex-col justify-center items-center bg-background px-4 py-12 min-h-screen">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <div className="mb-10 text-center">
            <h1 className="mb-2 font-bold text-primary text-4xl">Shelter</h1>
            <p className="text-description text-lg">
              Join us in finding homes for animals
            </p>
          </div>

          {/* Card Container */}
          <div className="space-y-8 card">
            <div>
              <h2 className="font-bold text-title text-2xl text-center">
                Create Account
              </h2>
              <p className="mt-2 text-muted text-sm text-center">
                Start your journey to find a companion
              </p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-5">
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
                  disabled={loading}
                  required
                  className="disabled:opacity-50 disabled:cursor-not-allowed input-field"
                />
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block font-semibold text-title text-sm"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="your_username"
                  disabled={loading}
                  required
                  className="disabled:opacity-50 disabled:cursor-not-allowed input-field"
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
                  disabled={loading}
                  required
                  className="disabled:opacity-50 disabled:cursor-not-allowed input-field"
                />
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block font-semibold text-title text-sm"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  disabled={loading}
                  required
                  className="disabled:opacity-50 disabled:cursor-not-allowed input-field"
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className="disabled:opacity-50 w-full disabled:cursor-not-allowed btn-primary"
              >
                {loading ? "Creating Account..." : "Sign Up"}
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
              type="signup"
            />

            {/* Error Message */}
            {formMsg && (
              <div className="bg-error/10 p-3 border border-error rounded-lg text-error text-sm">
                {formMsg}
              </div>
            )}

            {/* Sign In Link */}
            <div className="pt-4 border-border border-t text-center">
              <p className="text-description text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-semibold text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </GuardGuest>
  );
};

export default SignUpPage;
