import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const VenuePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/venues/${id}`) // ganti dengan URL API yang sesuai
      .then(response => {
        setVenue(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (!venue) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold">{venue.name}</h1>
        <img src={venue.image} alt={venue.name} className="w-full h-96 object-cover rounded mt-4" />
        <p className="mt-4">{venue.description}</p>
        <p className="mt-2">Lokasi: {venue.location}</p>
        <p className="mt-2">Kapasitas: {venue.capacity} orang</p>
        <p className="mt-2">Harga: {venue.price}</p>
        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Pesan Sekarang</button>
      </div>
      <Footer />
    </div>
  );
};

export default VenuePage;
