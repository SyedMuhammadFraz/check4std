import React from "react";
import ConfirmationModal from "../../Modals/confirmation-modal";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../utils/AuthContext";
import "../Nav.css";

function AdminNavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const { authToken, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const confirmLogout = () => {
    logout();
    setShowModal(false);
    navigate("/");
    toast.success("Successfully logged out");
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1472) {
      setShowMenu(false);
    }
  };
  const handleLogout = () => {
    setShowModal(true);
  };
  const cancelLogout = () => {
    setShowModal(false);
  };
  const handleOrdersClick = () => {
    navigate("/admin-panel/order-table");
    closeMenuOnMobile();
  };
  const handleDoctorsClick = () => {
    navigate("/admin-panel/doctors");
    closeMenuOnMobile();
  };
  const handleTestsClick = () => {
    navigate("/admin-panel/test-table");
    closeMenuOnMobile();
  };
  const handleDashboardClick = () => {
    navigate("/admin-panel/dashboard");
    closeMenuOnMobile();
  };
  const handleHomeClick = () => {
    navigate("/");
    closeMenuOnMobile();
  };
  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__logo">
          <img className="nav-logo-img" src="/client-new-logo.png" alt="Check4std Logo" />
          <a>Check4std</a>
        </div>

        <div
          className={`nav__menu ${showMenu ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            <li className="nav__item">
              <a className="navbar-main-heading" onClick={handleHomeClick}>
                Home
              </a>
            </li>
            <li className="nav__item">
              <a className="navbar-main-heading" onClick={handleDashboardClick}>
                Dashboard
              </a>
            </li>
            <li className="nav__item">
              <a className="navbar-main-heading" onClick={handleOrdersClick}>
                Orders
              </a>
            </li>
            <li className="nav__item">
              <a className="navbar-main-heading" onClick={handleTestsClick}>
                Tests
              </a>
            </li>
            <li className="nav__item">
              <a className="navbar-main-heading" onClick={handleDoctorsClick}>
                Doctors
              </a>
            </li>
            <li className="nav__buttons">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                onClick={handleLogout}
                className="mx-3"
              >
                <g
                  fill="none"
                  stroke="#e53835"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path
                    stroke-dasharray="36"
                    stroke-dashoffset="36"
                    d="M12 4h-7c-0.55 0 -1 0.45 -1 1v14c0 0.55 0.45 1 1 1h7"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="1s"
                      values="36;0"
                    />
                  </path>
                  <path
                    stroke-dasharray="14"
                    stroke-dashoffset="14"
                    d="M9 12h11.5"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="1.2s"
                      dur="0.4s"
                      values="14;0"
                    />
                  </path>
                  <path
                    stroke-dasharray="6"
                    stroke-dashoffset="6"
                    d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="1.6s"
                      dur="0.4s"
                      values="6;0"
                    />
                  </path>
                </g>
              </svg>
            </li>
          </ul>
          <div className="nav__close" id="nav-close" onClick={toggleMenu}>
            <IoClose />
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </nav>

      <ConfirmationModal
        showModal={showModal}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />
    </header>
  );
}

export default AdminNavBar;
