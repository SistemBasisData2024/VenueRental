import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000") // ganti dengan URL API yang sesuai
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => {
        console.error("Ada kesalahan dalam mengambil data:", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold text-center">
          Temukan Tempat Acara Terbaik
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {venues.map((venue) => (
            <div key={venue.id} className="border p-4 rounded">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-2xl mt-2">{venue.name}</h2>
              <p className="text-gray-600">{venue.location}</p>
              <p className="text-gray-600">{venue.capacity} orang</p>
              <Link
                to={`/venues/${venue.id}`}
                className="text-blue-500 mt-2 inline-block"
              >
                Lihat Detail
              </Link>
              <div className="mt-4">
                <h3 className="text-xl font-bold">Reviews</h3>
                {venue.reviews.length > 0 ? (
                  venue.reviews.map((review) => (
                    <div key={review.id} className="mt-2">
                      <p className="text-gray-800">
                        <strong>{review.user}</strong>: {review.comment}
                      </p>
                      <p className="text-yellow-500">Rating: {review.rating}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Belum ada review</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
