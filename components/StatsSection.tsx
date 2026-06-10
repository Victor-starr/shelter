"use client";
import CountUp from "react-countup";

const StatsSection = () => {
  return (
    <section className="bg-muted/25 p-8 rounded-lg">
      <h2 className="mb-8 font-bold text-title text-3xl md:text-4xl text-center">
        By The Numbers
      </h2>

      <div className="gap-8 grid grid-cols-1 md:grid-cols-3 text-center">
        <div>
          <p className="font-bold text-primary text-4xl">
            <CountUp end={500} duration={2} />+
          </p>
          <p className="mt-2 text-description">Animals Rescued</p>
        </div>

        <div>
          <p className="font-bold text-primary text-4xl">
            <CountUp end={450} duration={2} />+
          </p>
          <p className="mt-2 text-description">Successfully Rehomed</p>
        </div>

        <div>
          <p className="font-bold text-primary text-4xl">
            <CountUp end={15} duration={2} />
          </p>
          <p className="mt-2 text-description">Years of Service</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
