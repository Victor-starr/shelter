import Link from "next/link";

function PageNotFound() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="mb-12 font-bold text-4xl">404 - Page Not Found</h1>
      <p className="text-description text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-primary mt-6 px-6 py-4 rounded-2xl font-bold text-white text-2xl"
      >
        Go back to Home
      </Link>
    </main>
  );
}

export default PageNotFound;
