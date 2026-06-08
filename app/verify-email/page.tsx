"use client";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { useAuth } from "@/hook/useAuth";
import GuardVerify from "@/guards/GuardVerify";

export default function VerifyEmail() {
  const { user, isResending, resendMessage, handleResendEmail } = useAuth();

  return (
    <GuardVerify>
      <section className="flex flex-col justify-center items-center mx-auto px-4 py-8 min-h-[calc(100vh-140px)] container">
        <div className="flex flex-col justify-center items-center bg-card shadow-lg mt-8 mb-8 p-8 border border-border rounded-2xl w-full max-w-md text-center">
          <div className="inline-flex justify-center items-center bg-success mb-6 rounded-full w-16 h-16">
            <FaCheck className="mx-4 my-4 text-title" size={32} />
          </div>
          <h2 className="mb-2 font-bold text-title text-3xl md:text-4xl lg:text-5xl text-center">
            Check Your Email
          </h2>
          <p className="mt-1 mb-6 px-2 text-description text-base md:text-lg text-center">
            Please check your inbox and click the verification link to activate
            your account.
          </p>

          <div className="bg-background mb-6 p-4 border border-border rounded-lg w-full">
            <h3 className="mb-2 text-title-2 text-lg">
              Can&apos;t find the email?
            </h3>
            <ul className="space-y-1 mb-4 text-muted text-sm text-left">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure you entered the correct email address</li>
              <li>• Wait a few minutes - emails can take time to arrive</li>
              <li>
                • If you have already verified your email but are not
                redirected, try logging in:
              </li>
            </ul>
            <div className="flex flex-row gap-3">
              <button
                onClick={handleResendEmail}
                disabled={isResending || !user?.email}
                className="bg-primary disabled:bg-muted hover:opacity-80 px-4 py-2 rounded-lg text-title text-sm transition disabled:cursor-not-allowed"
              >
                {isResending ? "Sending..." : "Resend Verification Email"}
              </button>
              <Link href="/auth/signin" passHref>
                <button
                  type="button"
                  className="bg-secondary hover:opacity-80 active:opacity-90 px-4 py-2 rounded-lg text-title text-sm transition"
                >
                  Login
                </button>
              </Link>
            </div>

            {resendMessage && (
              <p
                className={`text-sm mt-2 ${
                  resendMessage.includes("Failed")
                    ? "text-error"
                    : "text-success"
                }`}
              >
                {resendMessage}
              </p>
            )}
          </div>
        </div>
      </section>
    </GuardVerify>
  );
}
