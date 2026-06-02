"use client";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@/utils/types";

const Nav = () => {
  const supabase = createClient();
  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserData(user);
    };
    fetchUser();
  }, [supabase]);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="top-0 z-50 fixed flex justify-between items-center bg-primary px-8 w-full h-16">
      <Link href="/" className="font-bold text-foreground text-xl">
        Animal Shelter
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/about"
          className="text-muted-foreground hover:text-muted transition-colors"
        >
          About
        </Link>

        <Link
          href="/contact"
          className="text-muted-foreground hover:text-muted transition-colors"
        >
          Contact
        </Link>
        {!!userData ? (
          <button
            className="text-muted-foreground hover:text-muted transition-colors"
            onClick={handleSignIn}
          >
            Sign Google
          </button>
        ) : (
          <button
            className="text-muted-foreground hover:text-muted transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
