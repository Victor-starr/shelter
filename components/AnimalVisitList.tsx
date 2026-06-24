import { Booking } from "@/lib/types";

type AnimalVisitListProps = {
  bookings: Booking[];
  isAdmin: boolean;
  userId: string;
  cancelBooking: (bookingId: string) => Promise<void>;
  addCalendar: () => void;
};

const AnimalVisitList = ({
  bookings,
  isAdmin,
  userId,
  cancelBooking,
  addCalendar,
}: AnimalVisitListProps) => {
  return (
    <div className="mt-10 w-full max-w-4xl">
      <h3 className="mb-4 font-bold text-title text-2xl text-center">
        Scheduled Visits
      </h3>
      {bookings && bookings.length > 0 ? (
        <ul className="space-y-4">
          {!isAdmin
            ? bookings
                .filter((visit) => visit.user_id === userId)
                .map((visit) => (
                  <AnimalOneList
                    visit={visit}
                    cancelBooking={cancelBooking}
                    key={visit.id}
                    addCalendar={addCalendar}
                  />
                ))
            : bookings.map((visit) => (
                <AnimalOneList
                  visit={visit}
                  cancelBooking={cancelBooking}
                  key={visit.id}
                  addCalendar={addCalendar}
                />
              ))}
        </ul>
      ) : (
        <p className="text-description text-center">
          There are no visits scheduled for this animal yet.
        </p>
      )}
    </div>
  );
};

const AnimalOneList = ({
  visit,
  cancelBooking,
  addCalendar,
}: {
  visit: Booking;
  cancelBooking: (bookingId: string) => Promise<void>;
  addCalendar: () => void;
}) => {
  return (
    <li className="relative shadow-md p-4 rounded-lg card" key={visit.id}>
      <p className="font-semibold text-primary">{visit.guest_name}</p>
      <p className="text-description">{visit.guest_email}</p>
      <p className="mt-2 text-gray-500 text-sm">
        Visit Date: {new Date(visit.visit_datetime).toLocaleString()}
      </p>
      <div className="top-1/4 right-10 absolute flex flex-row gap-8">
        <button
          onClick={() => cancelBooking(visit.id)}
          className="bg-red-600 hover:bg-red-700 shadow-md px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-transform transform"
        >
          Cancel Visit
        </button>
        <button className="px-6 py-3 btn-secondary" onClick={addCalendar}>
          Add to Calendar
        </button>
      </div>
    </li>
  );
};

export default AnimalVisitList;
