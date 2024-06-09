import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../components/authContext";

const VenuePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    async function fetchVenues() {
      const response = await axios
        .get("http://localhost:3000/venues")
        .then((response) => {
          setVenue(response.data);
        })
        .catch((error) => {
          console.error("Ada kesalahan dalam mengambil data:", error);
        });
    }

    axios
      .get(`http://localhost:3000/venues`)
      .then((response) => {
        setVenue(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!venue) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full space-y-8">
          <h1 className="text-center text-4xl font-extrabold text-gray-900">
            Book and Confirm then Enjoy Your Venue
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-200 text-left text-gray-600 text-sm font-semibold uppercase tracking-wider">
                  <th className="px-4 py-3 border-b-2">Venue ID</th>
                  <th className="px-4 py-3 border-b-2">Name</th>
                  <th className="px-4 py-3 border-b-2">Location</th>
                  <th className="px-4 py-3 border-b-2">Description</th>
                  <th className="px-4 py-3 border-b-2">Capacity</th>
                  <th className="px-4 py-3 border-b-2">Price</th>
                  <th className="px-4 py-3 border-b-2">Availability</th>
                  <th className="px-4 py-3 border-b-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {venue.map((item) => (
                  <tr key={item.venue_id} className="border-b">
                    <td className="px-4 py-3">{item.venue_id}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.location}</td>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3">{item.capacity}</td>
                    <td className="px-4 py-3">{item.price}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          item.availability === "Available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.availability}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex space-x-2">
                      {item.availability === "Available" && (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() =>
                            (window.location.href = `/booking/${item.venue_id}`)
                          }
                        >
                          Book
                        </button>
                      )}
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => (item.venue_id)}
                      >
                        Reviews
                      </button>
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

export default VenuePage;