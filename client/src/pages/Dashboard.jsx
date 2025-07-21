import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const url = "http://localhost:5010/dashboard";

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setUsers(res.data);
          console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            Dashboard
          </a>
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {users.map((user, i) => (
  <div className="card col-lg-6 col-10 mx-auto p-3 my-5 bg-primary" key={i}>
    <p className="text-white fw-bold">
      <span className="fw-light">First name:</span> {user.firstName} 
    </p>
    <p className="text-white fw-bold">
      <span className="fw-light">Last name:</span> {user.lastName}
    </p>
    <p className="text-white fw-bold">
      <span className="fw-light">eMail:</span> {user.email}
    </p>
    <p className="text-white fw-bold">
      <span className="fw-light">Role:</span> Student
    </p>
  </div>
))}

    </>
  );
};

export default Dashboard;
