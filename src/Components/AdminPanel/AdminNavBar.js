import React from "react";
import ConfirmationModal from "../../Modals/confirmation-modal";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../utils/AuthContext";
import '../Nav.css';

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
  const handleTestsClick = () => {
    navigate("/admin-panel/test-table");
    closeMenuOnMobile();
  };
  const handleDashboardClick = () => {
    navigate("/admin-panel/dashboard");
    closeMenuOnMobile();
  };
  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__logo">
          <img className="nav-logo-img" src="client-new-logo.png" alt="404" />
          <a>Check4std</a>
        </div>

        <div
          className={`nav__menu ${showMenu ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list">
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
            <li className="nav__buttons">
              <button
                onClick={handleLogout}
                className="button1 mx-3 logout-button"
              >
                Logout
              </button>
            </li>
          </ul>
          <div className="nav__close" id="nav-close"  onClick={toggleMenu}>
            <IoClose />
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle"  onClick={toggleMenu}>
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
