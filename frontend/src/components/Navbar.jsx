import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Panggil fungsi onLogout dari prop
    navigate("/login"); // Redirect ke halaman login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MyApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">
                    User
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, // isAuthenticated harus berupa boolean dan wajib ada
  onLogout: PropTypes.func.isRequired, // onLogout harus berupa fungsi dan wajib ada
};

export default Navbar;
