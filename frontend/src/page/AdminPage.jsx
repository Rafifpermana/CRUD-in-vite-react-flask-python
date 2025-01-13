import ListUserPage from "./ListUserPage";
import CreateUserPage from "./CreateUserPage";
import EditUserPage from "./EditUserPage";
import { Routes, Route } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="min-vh-100 bg-light text-dark">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary mb-3">
            Hello, Selamat Datang Admin
          </h1>
          <p className="lead text-muted">Apakah ada tugas hari ini?</p>
        </div>

        <Routes>
          <Route path="/" element={<ListUserPage />} />
          <Route path="/useradd" element={<CreateUserPage />} />
          <Route path="/userupdate" element={<EditUserPage />} />
        </Routes>
      </div>
    </div>
  );
}
