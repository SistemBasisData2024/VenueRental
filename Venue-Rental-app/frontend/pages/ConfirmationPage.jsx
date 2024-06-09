import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useAuth } from "../components/authContext";

const confirmationPage = () => {
  const [bookings, setBookings] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [token]);

  const handleAcceptBooking = async (bookingId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/bookings/accept/${bookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.booking_id === bookingId
            ? { ...booking, status: "Accepted" }
            : booking
        )
      );
      alert("Booking accepted!");
    } catch (error) {
      console.error("Error accepting booking:", error);
      alert("Failed to accept booking.");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/bookings/cancel/${bookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.booking_id === bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );
      alert("Booking cancelled!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full space-y-8">
          <h1 className="text-center text-4xl font-extrabold text-gray-900">
            Manage Bookings
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-200 text-left text-gray-600 text-sm font-semibold uppercase tracking-wider">
                  <th className="px-4 py-3 border-b-2">Booking ID</th>
                  <th className="px-4 py-3 border-b-2">User ID</th>
                  <th className="px-4 py-3 border-b-2">Venue ID</th>
                  <th className="px-4 py-3 border-b-2">Event Date</th>
                  <th className="px-4 py-3 border-b-2">Duration</th>
                  <th className="px-4 py-3 border-b-2">Total Price</th>
                  <th className="px-4 py-3 border-b-2">Status</th>
                  <th className="px-4 py-3 border-b-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.booking_id} className="border-b">
                    <td className="px-4 py-3">{booking.booking_id}</td>
                    <td className="px-4 py-3">{booking.user_id}</td>
                    <td className="px-4 py-3">{booking.venue_id}</td>
                    <td className="px-4 py-3">{booking.event_date}</td>
                    <td className="px-4 py-3">{booking.duration}</td>
                    <td className="px-4 py-3">{booking.total_price}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "Accepted"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex space-x-2">
                      {booking.status === "Pending" && (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() =>
                              handleAcceptBooking(booking.booking_id)
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() =>
                              handleCancelBooking(booking.booking_id)
                            }
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default confirmationPage;
