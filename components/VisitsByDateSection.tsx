"use client";

import type { Booking } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function VisitsByDateSection() {
  const supabase = createClient();
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const startOfDay = new Date(`${selectedDate}T00:00:00`);
        const startOfNextDay = new Date(startOfDay);
        startOfNextDay.setDate(startOfNextDay.getDate() + 1);

        const { data, error: bookingError } = await supabase
          .from("bookings")
          .select("*")
          .gte("visit_datetime", startOfDay.toISOString())
          .lt("visit_datetime", startOfNextDay.toISOString())
          .order("visit_datetime", { ascending: true });

        if (bookingError) throw bookingError;

        setBookings((data as Booking[]) ?? null);
      } catch (err) {
        console.error("Error fetching bookings by date:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    void fetchBookings();
  }, [selectedDate, supabase]);

  const visitCount = bookings?.length ?? 0;

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="mb-2 font-bold text-title text-2xl">Visits by Date</h2>
        <p className="text-description text-sm">
          View all scheduled visits for a selected day.
        </p>
      </div>

      <div className="space-y-6 card">
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-end gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-medium text-title text-sm">Select date</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="bg-background px-3 py-2 border border-border rounded-lg outline-none text-title text-sm"
            />
          </label>

          <div className="text-description text-sm">
            {visitCount} visit{visitCount === 1 ? "" : "s"} scheduled
          </div>
        </div>

        {loading ? (
          <p className="py-8 text-description text-center">Loading visits...</p>
        ) : error ? (
          <p className="py-8 text-red-500 text-center">
            Could not load visits for this date.
          </p>
        ) : visitCount === 0 ? (
          <p className="py-8 text-description text-center">
            No visits scheduled for this date.
          </p>
        ) : (
          <div className="space-y-3">
            {bookings?.map((booking) => (
              <div
                key={booking.id}
                className="flex md:flex-row flex-col md:justify-between md:items-center gap-2 bg-background/50 p-4 border border-border/60 rounded-xl"
              >
                <div>
                  <p className="font-semibold text-title text-base">
                    {booking.guest_name}
                  </p>
                  <p className="text-description text-sm">
                    {booking.guest_email}
                  </p>
                </div>

                <div className="text-description text-sm md:text-right">
                  <p>
                    {new Date(booking.visit_datetime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
