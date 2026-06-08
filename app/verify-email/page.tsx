"use client";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { useAuth } from "@/hook/useAuth";
import GuardVerify from "@/guards/GuardVerify";

export default function VerifyEmail() {
  const { user, isResending, resendMessage, handleResendEmail } = useAuth();

  return (
    <GuardVerify>
      <section className="flex flex-col justify-center items-center bg-background px-4 py-12 min-h-screen">
        <div className="w-full max-w-md">
          {/* Success Card */}
          <div className="space-y-6 card">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="inline-flex justify-center items-center bg-success/20 border-2 border-success rounded-full w-20 h-20">
                <FaCheck className="text-success" size={40} />
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-3 text-center">
              <h2 className="font-bold text-title text-3xl">
                Check Your Email
              </h2>
              <p className="text-description text-base leading-relaxed">
                We{`&apos`}ve sent a verification link to{" "}
                <span className="font-semibold">{user?.email}</span>. Please
                click the link to activate your account.
              </p>
            </div>

            {/* Help Section */}
            <div className="space-y-3 bg-muted p-5 rounded-lg">
              <h3 className="font-semibold text-title-2 text-sm">
                Can&apos;t find the email?
              </h3>
              <ul className="space-y-2 text-description text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-primary">•</span>
                  <span>Check your spam or junk folder</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-primary">•</span>
                  <span>Make sure you entered the correct email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-primary">•</span>
                  <span>Wait a few minutes - emails can take time</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-border border-t">
              <button
                onClick={handleResendEmail}
                disabled={isResending || !user?.email}
                className="disabled:opacity-50 w-full disabled:cursor-not-allowed btn-primary"
              >
                {isResending ? "Sending..." : "Resend Verification Email"}
              </button>
              <Link href="/auth/signin" passHref>
                <button type="button" className="w-full btn-secondary">
                  Back to Login
                </button>
              </Link>
            </div>

            {/* Feedback Message */}
            {resendMessage && (
              <div
                className={`rounded-lg p-3 text-sm text-center font-medium ${
                  resendMessage.includes("Failed")
                    ? "bg-error/10 text-error border border-error"
                    : "bg-success/10 text-success border border-success"
                }`}
              >
                {resendMessage}
              </div>
            )}
          </div>
        </div>
      </section>
    </GuardVerify>
  );
}
