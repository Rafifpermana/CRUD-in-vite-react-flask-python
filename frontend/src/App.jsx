import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import AdminPage from "./page/AdminPage";
import UserPage from "./page/UserPage";
import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") // Cek apakah token ada di localStorage
  );

  // Fungsi untuk menangani login
  const handleLogin = (token) => {
    localStorage.setItem("token", token); // Simpan token di localStorage
    setIsAuthenticated(true); // Set state isAuthenticated menjadi true
  };

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    setIsAuthenticated(false); // Set state isAuthenticated menjadi false
  };

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/admin" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/admin/*"
          element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/user/*"
          element={isAuthenticated ? <UserPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
