"use client";
import { useAuth } from "@/hook/useAuth";
import Link from "next/link";

const Nav = () => {
  const { isAuthenticated, loading, logout } = useAuth();

  return (
    <nav className="top-0 z-50 fixed flex justify-between items-center bg-primary px-8 w-full h-16">
      <Link href="/" className="font-bold text-title text-xl">
        Animal Shelter
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/about"
          className="text-title hover:text-description transition-colors"
        >
          About
        </Link>
        {loading || isAuthenticated ? (
          <>
            <Link
              href="/contact"
              className="text-title hover:text-description transition-colors"
            >
              Dashboard
            </Link>
            <button
              className="text-title hover:text-description transition-colors"
              onClick={logout}
              disabled={loading}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            className="text-title hover:text-description transition-colors"
            href="/auth/signin"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
