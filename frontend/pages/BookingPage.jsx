import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BookingPage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/venues/${id}`) // ganti dengan URL API yang sesuai
      .then((response) => {
        setVenue(response.data);
      })
      .catch((error) => {
        console.error("Ada kesalahan dalam mengambil data:", error);
      });
  }, [id]);

  const handleBooking = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://localhost:3000/bookings`,
        { venue_id: id, date, duration },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert("Pemesanan berhasil!");
      })
      .catch((error) => {
        console.error("Ada kesalahan dalam pemesanan:", error);
      });
  };

  if (!venue) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold">Pesan {venue.name}</h1>
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
          onClick={handleBooking}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Pesan Sekarang
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
