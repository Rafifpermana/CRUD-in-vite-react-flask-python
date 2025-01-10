import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

export default function ListUserPage() {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get("http://127.0.0.1:5000/listuser")
      .then((response) => {
        console.log("Response data:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  const deleteUser = (NPM) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://127.0.0.1:5000/userdelete/${NPM}`)
        .then(() => {
          getUsers();
          setAlert({
            show: true,
            message: "User successfully deleted!",
            type: "success",
          });
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          setAlert({
            show: true,
            message: "Failed to delete user. Please try again.",
            type: "danger",
          });
        });
    }
  };

  const editUser = (NPM) => {
    window.location.href = `/user/${NPM}/edit`;
  };

  return (
    <div className="container h-100 py-5">
      <div className="row h-100">
        <div className="col-12 text-start">
          <p>
            <Link to="/addnewuser" className="btn btn-success">
              Add New User
            </Link>
          </p>
          <h1>List Users</h1>

          {alert.show && (
            <div
              className={`alert alert-${alert.type} alert-dismissible fade show`}
              role="alert"
            >
              {alert.message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlert({ show: false, message: "", type: "" })}
              ></button>
            </div>
          )}

          <table className="table table-striped table-bordered shadow">
            <thead className="table-dark">
              <tr>
                <th scope="col">NPM</th>
                <th scope="col">Nama</th>
                <th scope="col">Kelas</th>
                <th scope="col">Alamat</th>
                <th scope="col">No_Telp</th>
                <th scope="col">Date Added</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, key) => (
                <tr key={key}>
                  <td>{user.NPM}</td>
                  <td>{user.Nama}</td>
                  <td>{user.Kelas}</td>
                  <td>{user.Alamat}</td>
                  <td>{user.No_Telp}</td>
                  <td>
                    <span className="badge bg-info text-dark p-2">
                      {new Date(user.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle btn-sm"
                        type="button"
                        id={`actionMenu${key}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Actions
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby={`actionMenu${key}`}
                      >
                        <li>
                          <button
                            onClick={() => editUser(user.NPM)}
                            className="dropdown-item text-success"
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => deleteUser(user.NPM)}
                            className="dropdown-item text-danger"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
