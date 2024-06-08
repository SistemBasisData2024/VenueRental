import { Link } from "react-router-dom";

const navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl">
          Event Venue Booking
        </Link>
        <div>
          <Link to="/login" className="text-white mx-2">
            Login
          </Link>
          <Link to="/register" className="text-white mx-2">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
