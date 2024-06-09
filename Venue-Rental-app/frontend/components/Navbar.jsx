import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../components/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { isAuthenticated, logout, userRole } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";
  const isAdmin = isAuthenticated && userRole === "admin";

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to={isLoginPage || isRegisterPage ? "/" : "/venues"}
          className="text-white text-2xl"
        >
          Venue Rental
        </Link>
        {!isLoginPage && !isRegisterPage && isAuthenticated && (
          <div className="flex items-center">
            {isAdmin && (
              <Link to="/add-venue" className="text-white mx-2">
                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                Add New Venue
              </Link>
            )}
            <button onClick={logout} className="text-white mx-2">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
