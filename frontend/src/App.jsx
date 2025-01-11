import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListUserPage from "./page/ListUserPage.jsx";
import CreateUserPage from "./page/CreateUserPage.jsx";
import EditUserPage from "./page/EditUserPage.jsx";

function App() {
  return (
    <div className="min-vh-100 bg-light text-dark">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary mb-3">
            Hello, Selamat Datang Admin
          </h1>
          <p className="lead text-muted">Apakah ada tugas hari ini?</p>
        </div>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListUserPage />} />
            <Route path="/addnewuser" element={<CreateUserPage />} />
            <Route path="/user/:NPM/edit" element={<EditUserPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
