import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("Login berhasil:", res.data);
        navigate("/venue");
      })
      .catch((err) => {
        console.log(err);
      }); // ganti dengan URL API yang sesuai;
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
