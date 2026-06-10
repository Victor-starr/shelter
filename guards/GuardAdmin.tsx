"use client";

import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GuardAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace("/auth/signin");
      return;
    }
    if (!user?.email_confirmed_at) {
      router.replace("/verify-email");
      return;
    }
    if (!isAdmin) {
      router.replace("/animals/catalog");
      return;
    }
  }, [isAuthenticated, loading, router, user]);

  if (loading || !isAuthenticated || !user?.email_confirmed_at || !isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-primary border-t-4 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GuardAdmin;
