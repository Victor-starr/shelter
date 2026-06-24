import { Animal, Booking } from "@/lib/types";
import { formatGoogleDate } from "./helper/dataFormatting";

export const createGoogleCalendarUrl = (animal: Animal, booking: Booking) => {
  const startDate = new Date(booking.visit_datetime);

  // Example: 1-hour visit
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const dates = `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Visit ${animal.name}`,
    dates,
    details: `Booking for ${animal.name} (${animal.type})\nGuest: ${booking.guest_name}`,
    location: "The Shelter, 123, Main Street, City, Country",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
