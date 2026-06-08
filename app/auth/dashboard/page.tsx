import GuardAuth from "@/guards/GuardAuth";

export default function Dashboard() {
  return (
    <GuardAuth>
      <main className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="mb-4 font-bold text-4xl">Welcome to the Dashboard</h1>
        <p className="text-description text-lg">
          This is a protected page. Only authenticated users can see this.
        </p>
      </main>
    </GuardAuth>
  );
}
