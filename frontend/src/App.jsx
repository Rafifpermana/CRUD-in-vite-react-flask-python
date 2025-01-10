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
        <h1 className="text-center mb-5 fw-bold text-primary">
          Hello, Selamat Code Anda Tidak Eror
        </h1>

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
