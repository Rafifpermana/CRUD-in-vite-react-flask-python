import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../components/Alert";
import PropTypes from "prop-types"; // Import PropTypes

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:5000/login", inputs)
      .then((response) => {
        const { token } = response.data;
        onLogin(token); // Panggil fungsi onLogin dari prop
        setAlert({
          show: true,
          message: "Login successful! Redirecting...",
          type: "success",
        });
        setTimeout(() => {
          navigate("/admin"); // Redirect ke halaman admin
        }, 1000);
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setAlert({
          show: true,
          message: "Invalid credentials. Please try again.",
          type: "danger",
        });
      });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white text-center">
              <h3>Login</h3>
            </div>
            <div className="card-body p-4">
              <Alert
                show={alert.show}
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert({ show: false, message: "", type: "" })}
              />

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={inputs.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-success">
                    Login
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

// Validasi props
LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired, // onLogin harus berupa fungsi dan wajib ada
};
