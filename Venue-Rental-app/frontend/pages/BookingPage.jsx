import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BookingPage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(1);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/venues/${id}`)
      .then((response) => {
        console.log("Venue Response:", response.data);
        setVenue(response.data);
      })
      .catch((error) => {
        console.error("Ada kesalahan dalam mengambil data:", error);
      });
  }, [id]);

  const handleBooking = () => {
     // Prevent form submission
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token tidak tersedia");
      return;
    }
    axios
      .post(
        `http://localhost:3000/bookings/`,
        { venue_id: id, date, duration, status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert("Pemesanan berhasil!");
        setStatus("Pending");
        console.log("Booking Response:", response.data);
        useNavigate("/bookings/confirmation");
      })
      .catch((error) => {
        console.error("Ada kesalahan dalam pemesanan:", error);
      });
  };

  return (
    <>
      <Navbar />
      <h1 className="flex flex-col w-full p-[0.5rem] text-2xl font-bold text-center items-center justify-center">
        {venue.name}
      </h1>
      <p className="flex flex-col w-full p-[0.5rem] text-2xl font-bold text-center items-center justify-center">
        {venue.description}
      </p>
      <div
        // onSubmit={handleBooking}
        className="p-[1rem] gap-[1rem]"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="mt-4">
          <label className="block text-gray-700">Tanggal Acara:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded mt-2"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Durasi (hari):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 border rounded mt-2"
            required
          />
        </div>
        <button
          // type="submit"
          onClick={handleBooking}
          style={{ cursor: "pointer" }}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Book
        </button>
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;
