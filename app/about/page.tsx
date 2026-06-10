import StatsSection from "@/components/StatsSection";
import Image from "next/image";

export default function About() {
  return (
    <main className="flex flex-col justify-start items-center bg-background min-h-screen">
      {/* Hero Section */}
      <header className="relative flex flex-col justify-center items-center w-full h-80 overflow-hidden">
        <div className="z-10 absolute inset-0 bg-linear-to-b from-black/50 dark:from-black/40 to-black/30 dark:to-black/20" />
        <Image
          src="/bg.png"
          alt="About Background"
          fill
          priority
          className="object-cover"
        />
        <div className="z-20 relative space-y-2 text-center">
          <h1 className="drop-shadow-lg font-bold text-white text-5xl md:text-6xl">
            About Us
          </h1>
          <p className="drop-shadow-md px-4 max-w-2xl text-white/90 text-lg">
            Our mission to rescue and rehome animals
          </p>
        </div>
      </header>

      {/* Content Section */}
      <div className="px-4 py-12 md:py-16 w-full">
        <div className="space-y-12 mx-auto max-w-4xl">
          {/* Mission Section */}
          <section className="space-y-4">
            <h2 className="font-bold text-title text-3xl md:text-4xl">
              Our Mission
            </h2>
            <p className="text-description text-lg leading-relaxed">
              We are dedicated to providing safe shelter and care for abandoned
              and rescue animals. Our goal is to find loving homes for every
              animal in our care and make a positive impact on their lives.
            </p>
          </section>

          {/* Stats Section */}
          <StatsSection />

          {/* Values Section */}
          <section className="space-y-6">
            <h2 className="font-bold text-title text-3xl md:text-4xl">
              Our Values
            </h2>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
              <div className="bg-card p-6 border border-border rounded-lg">
                <h3 className="mb-3 font-semibold text-title text-xl">
                  Compassion
                </h3>
                <p className="text-description">
                  We treat every animal with compassion and respect, ensuring
                  their wellbeing is our top priority.
                </p>
              </div>
              <div className="bg-card p-6 border border-border rounded-lg">
                <h3 className="mb-3 font-semibold text-title text-xl">Care</h3>
                <p className="text-description">
                  Every animal receives medical care, nutrition, and attention
                  from our dedicated team.
                </p>
              </div>
              <div className="bg-card p-6 border border-border rounded-lg">
                <h3 className="mb-3 font-semibold text-title text-xl">
                  Community
                </h3>
                <p className="text-description">
                  We believe in building a community of animal lovers who share
                  our passion for rescue and adoption.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="space-y-4 text-center">
            <h2 className="font-bold text-title text-3xl md:text-4xl">
              Get Involved
            </h2>
            <p className="text-description text-lg">
              Whether you{`&apos`}re looking to adopt, volunteer, or donate,
              there are many ways to support our mission. Join us in making a
              difference in the lives of animals in need.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
