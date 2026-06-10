"use client";
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const GuardAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, loading } = useAuth();
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
  }, [isAuthenticated, loading, router, user]);

  if (loading || !isAuthenticated || !user?.email_confirmed_at) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-primary border-t-4 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export const GuardAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, loading } = useAuth();
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
    if (user?.user_metadata.role !== "admin") {
      router.replace("/animals/catalog");
      return;
    }
  }, [isAuthenticated, loading, router, user]);

  if (
    loading ||
    !isAuthenticated ||
    !user?.email_confirmed_at ||
    user?.user_metadata.role !== "admin"
  ) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-primary border-t-4 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
};
