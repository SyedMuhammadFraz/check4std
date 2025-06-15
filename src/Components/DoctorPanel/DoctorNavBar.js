import React from "react";
import "./DoctorNavBar.css";

const DoctorNavBar = () => {
  return (
    <nav className="admin-navbar">
      <div className="nav__logo">
        <img className="nav-logo-img" src="client-new-logo.png" alt="404" />
        <a>Check4std</a>
      </div>
      <ul className="admin-navbar-links">
        <li>
          <a href="/doctor-dashboard">Dashboard</a>
        </li>
        {/* Add more doctor-specific links here */}
      </ul>
    </nav>
  );
};

export default DoctorNavBar;
