import React, { useState } from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


function Nav() {
  const navigate = useNavigate();

  const onDiseasesClick = () => {
    closeMenuOnMobile();
    navigate("/diseases");
  };

  const onPriceClick = () => {
    closeMenuOnMobile();
    navigate("/price-packages");
  }

  const onHomeClick = () => {
    closeMenuOnMobile();
    navigate("/");
  }
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };
  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__logo">
          <img className="nav-logo-img" src="client-new-logo.png" alt="404" />
          <a>Check4std</a>
        </div>

        <div className={`nav__menu ${showMenu ? "show-menu" : ""}`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <a onClick={onHomeClick}>Home</a>
            </li>
            <li className="nav__item">
              <a>Find a Lab</a>
              <ul className="dropdown">
                <div class="dropdown-container">
                  <label for="zip-code">Zip Code:</label>
                  <div class="dropdown-input">
                    <input type="text" id="zip-code" placeholder="Enter Zip Code" />
                    <button type="button" class="search-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#000" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </ul>
            </li>
            <li className="nav__item">
              <a>How it Works</a>
              <ul className="dropdown">
                <li><a href="#">Our Privacy Promise</a></li>
                <li><a href="#">Sample STD Test Results</a></li>
                <li><a href="#">Doctor Consultation</a></li>
                <li><a href="#">Patient Testimonials</a></li>
                <li><a href="#">Payment Options</a></li>
                <li><a href="#">Frequently Asked Questions</a></li>
                <li><a href="#">About check4std.com</a></li>
                <li><a href="#">Meet Our Medical Team</a></li>
              </ul>
            </li>
            <li className="nav__item">
              <a onClick={onPriceClick}>Price and Packages</a>
              <ul className="dropdown">
                <li className="dropdown-heading">Popular Test Panels</li>
                <li><a href="#">10 test Panel</a></li>
                <li><a href="#">Chlamydia & Gonorrhea Panel</a></li>
                <li><a href="#">Herpes I & II Test</a></li>
                <li className="dropdown-heading">Individual Tests</li>
                <li><a href="#">Chlamydia Test</a></li>
                <li><a href="#">Gonorrhea Test</a></li>
                <li><a href="#">Hepatitis A Test</a></li>
                <li><a href="#">Hepatitis B Test</a></li>
                <li><a href="#">Hepatitis C Test</a></li>
                <li><a href="#">Oral Herpes Test</a></li>
                <li><a href="#">Genital Herpes Test</a></li>
                <li><a href="#">HIV 1 & 2 Antibody (4th Gen) Test</a></li>
                <li><a href="#">HIV RNA Early Detection Test</a></li>
                <li><a href="#">Syphilis Test</a></li>
              </ul>
            </li>
            <li className="nav__item">
              <a onClick={onDiseasesClick}>STDs & Symptoms</a>
              <ul className="dropdown">
                <li className="dropdown-heading">STD Information & Symptoms</li>
                <li><a href="#">Chlamydia</a></li>
                <li><a href="#">Gonorrhea</a></li>
                <li><a href="#">Hepatitis A</a></li>
                <li><a href="#">Hepatitis B</a></li>
                <li><a href="#">Hepatitis C</a></li>
                <li><a href="#">Genital Herpes</a></li>
                <li><a href="#">Oral Herpes</a></li>
                <li><a href="#">HIV</a></li>
                <li><a href="#">Syphilis</a></li>
                <li><a href="#">STD Symptoms</a></li>
                <li className="dropdown-heading">STD Current Events</li>
                <li><a href="#">STD Blog</a></li>
              </ul>
            </li>
            <li className="nav__buttons">
              <NavLink to="/login" className="button1">
                Sign In
              </NavLink>
              <NavLink to="/signup" className="button1 mx-3">
                Sign Up
              </NavLink>
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
    </header>

  );
}

export default Nav;
