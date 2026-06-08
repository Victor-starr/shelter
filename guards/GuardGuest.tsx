"use client";
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GuardGuest = ({ children }: { children: React.ReactNode }) => {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-primary border-t-4 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GuardGuest;
