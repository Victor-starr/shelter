"use client";
import { useAuth } from "@/hook/useAuth";
import Link from "next/link";
import { FaPaw } from "react-icons/fa";

const Nav = () => {
  const { isAuthenticated, isAdmin, loading, logout } = useAuth();

  return (
    <nav className="top-0 z-50 fixed flex justify-between items-center bg-card shadow-sm px-8 border-border border-b w-full h-16">
      <Link
        href="/"
        className="flex flex-row items-center gap-2 font-bold text-title hover:text-primary text-2xl transition-colors"
      >
        <FaPaw size={24} /> Shelter
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/about"
          className="font-medium text-description hover:text-primary transition-colors"
        >
          About
        </Link>
        {!loading && isAuthenticated ? (
          <>
            <Link
              href="/animals/catalog"
              className="font-medium text-description hover:text-primary transition-colors"
            >
              Animals
            </Link>
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="font-medium text-description hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            )}
            <button className="btn-primary" onClick={logout} disabled={loading}>
              Logout
            </button>
          </>
        ) : (
          !loading && (
            <Link className="btn-primary" href="/auth/signin">
              Sign In
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Nav;
