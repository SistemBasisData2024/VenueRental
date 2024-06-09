import React, { createContext, useState, useContext } from "react";

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, UserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (role) => {
    setIsAuthenticated(true);
    setUser(userData);
    UserRole(role);
    setToken(token);
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    UserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
