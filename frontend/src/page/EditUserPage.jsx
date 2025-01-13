import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Alert from "../components/Alert";

export default function EditUserPage() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const { NPM } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://127.0.0.1:5000/userupdate/${NPM}`, inputs)
      .then((response) => {
        console.log("Response data:", response.data);
        setAlert({
          show: true,
          message: "User successfully updated!",
          type: "success",
        });
        setTimeout(() => {
          setAlert({ show: false, message: "", type: "" });
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setAlert({
          show: true,
          message: "Failed to update user. Please try again.",
          type: "danger",
        });
      });
  };

  const getUser = useCallback(() => {
    axios
      .get(`http://127.0.0.1:5000/userdetails/${NPM}`)
      .then((response) => {
        console.log("Response data:", response.data);
        setInputs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [NPM]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white text-center">
              <h3>Edit User</h3>
            </div>
            <div className="card-body p-4">
              <Alert
                show={alert.show}
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert({ show: false, message: "", type: "" })}
              />

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">NPM</label>
                    <input
                      type="text"
                      className="form-control"
                      name="NPM"
                      value={inputs.NPM || ""}
                      placeholder="Masukkan NPM"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Nama</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Nama"
                      value={inputs.Nama || ""}
                      placeholder="Masukkan Nama"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Kelas</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Kelas"
                      value={inputs.Kelas || ""}
                      placeholder="Masukkan Kelas"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">No Telepon</label>
                    <input
                      type="text"
                      className="form-control"
                      name="No_Telp"
                      value={inputs.No_Telp || ""}
                      placeholder="Masukkan No Telepon"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Alamat</label>
                    <textarea
                      className="form-control"
                      name="Alamat"
                      rows="3"
                      placeholder="Masukkan Alamat"
                      value={inputs.Alamat || ""}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="text-end mt-4">
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-check-circle"></i> Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/")}
                  >
                    <i className="bi bi-x-circle"></i> Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
