import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/authContext";
import HomePage from "./pages/HomePage";
import VenuePage from "./pages/VenuePage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateVenuePage from "./pages/createVenuePage";
import ConfirmationPage from "./pages/confirmationPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/venues" element={<VenuePage />} />
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/booking/confirmation" element={<ConfirmationPage />} />
          <Route path="/add-venue" element={<CreateVenuePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
