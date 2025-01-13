import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../components/Alert";

export default function UserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect ke login jika tidak ada token
    } else {
      // Ambil data user berdasarkan token
      axios
        .get("http://127.0.0.1:5000/userdetails/12345", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          navigate("/login");
        });
    }
  }, [navigate]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete(`http://127.0.0.1:5000/userdelete/${user.NPM}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(() => {
          localStorage.removeItem("token");
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white text-center">
              <h3>User Profile</h3>
            </div>
            <div className="card-body p-4">
              <Alert
                show={alert.show}
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert({ show: false, message: "", type: "" })}
              />

              <div className="mb-3">
                <label className="form-label fw-semibold">NPM</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.NPM || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nama</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.Nama || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Kelas</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.Kelas || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Alamat</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={user.Alamat || ""}
                  readOnly
                ></textarea>
              </div>
              <div className="text-end">
                <button
                  onClick={() => navigate(`/user/${user.NPM}/edit`)}
                  className="btn btn-success me-2"
                >
                  Edit Profile
                </button>
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
