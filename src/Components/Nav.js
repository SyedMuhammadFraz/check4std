import React, { useState } from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {useContext } from "react";
import ConfirmationModal from "../Modals/confirmation-modal";
import { AuthContext } from "../utils/AuthContext";
import { toast } from "react-toastify";
import AddPatient from "../Modals/AddPatient";

function Nav() {
  const { authToken, logout, userRole } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showAddPatientModal, setshowAddPatientModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowModal(false);
    navigate("/");
    toast.success("Successfully logged out");
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  const onHerpes1_2Click = () => {
    closeMenuOnMobile();
    navigate("/herpes-i-ii-test");
  };

  const onHIV4thGenClick = () => {
    closeMenuOnMobile();
    navigate("/hiv-test");
  };

  const onHIVRNSClick = () => {
    closeMenuOnMobile();
    navigate("/hiv-rna-test");
  };

  const onSyphilisClick = () => {
    closeMenuOnMobile();
    navigate("/syphilis-test");
  };

  const onOralHerpesClick = () => {
    closeMenuOnMobile();
    navigate("/oral-herpes-test");
  };

  const onGenitalHerpesClick = () => {
    closeMenuOnMobile();
    navigate("/genital-herpes-test");
  };

  const onChlamydiaGonorrheeaClick = () => {
    closeMenuOnMobile();
    navigate("/chlamydia-gonorrhea-test");
  };

  const onChlamydiaTestClick = () => {
    closeMenuOnMobile();
    navigate("/chlamydia-test");
  };

  const onGonorrheaTestClick = () => {
    closeMenuOnMobile();
    navigate("/gonorrhea-test");
  };

  const onHepATestClick = () => {
    closeMenuOnMobile();
    navigate("/hep-a-test");
  };
  const onHepBTestClick = () => {
    closeMenuOnMobile();
    navigate("/hep-b-test");
  };
  const onHepCTestClick = () => {
    closeMenuOnMobile();
    navigate("/hep-c-test");
  };

  const onDiseasesClick = () => {
    closeMenuOnMobile();
    navigate("/diseases");
  };

  const onFindAlabClick = () => {
    closeMenuOnMobile();
    navigate("/test-centers");
  };

  const onDoctorConsultaionClick = () => {
    closeMenuOnMobile();
    navigate("/doctor-consultation");
  };

  const onTenTestPanelClick = () => {
    closeMenuOnMobile();
    navigate("/ten-test-panel");
  };

  const onPriceClick = () => {
    closeMenuOnMobile();
    navigate("/price-packages");
  };

  const onHomeClick = () => {
    closeMenuOnMobile();
    navigate("/");
  };
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1472) {
      setShowMenu(false);
    }
  };

  const goToDiseases = (component) => {
    // closeMenuOnMobile();
    // // Check if the current route is already '/diseases' and if the component is the same
    // if (location.pathname !== '/diseases' || location.state?.component !== component) {
    //   navigate("/diseases", { state: { component } });
    // } else {
    //   console.log("Already on the diseases page with the same component.");
    // }
  };

  const handleDoctorCalendarClick = ()=>{
    navigate('/doctor-calendar');
  }

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__logo" onClick={onHomeClick}>
          <img className="nav-logo-img" src="client-new-logo.png" alt="404" />
          <a>Check4std</a>
        </div>

        <div
          className={`nav__menu ${showMenu ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list main__list">
            <li className="nav__item">
              <a onClick={onHomeClick} className="navbar-main-heading">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a onClick={onFindAlabClick} className="navbar-main-heading">
                Find a Lab
              </a>
              <ul className="dropdown">
                <div class="dropdown-container">
                  <label for="zip-code">Zip Code:</label>
                  <div class="dropdown-input">
                    <input
                      type="text"
                      id="zip-code"
                      placeholder="Enter Zip Code"
                    />
                    <button type="button" class="search-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#000"
                          d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </ul>
            </li>
            <li className="nav__item">
              <a className="navbar-main-heading">How it Works</a>
              <ul className="dropdown">
                <li>
                  <a href="#">Our Privacy Promise</a>
                </li>
                <li>
                  <a href="#">Sample STD Test Results</a>
                </li>
                <li>
                  <a onClick={onDoctorConsultaionClick}>Doctor Consultation</a>
                </li>
                <li>
                  <a onClick={handleDoctorCalendarClick}>Doctor Calendar</a>
                </li>
                <li>
                  <a href="#">Patient Testimonials</a>
                </li>
                <li>
                  <a href="#">Payment Options</a>
                </li>
                <li>
                  <a href="#">Frequently Asked Questions</a>
                </li>
                <li>
                  <a href="#">About check4std.com</a>
                </li>
                <li>
                  <a href="#">Meet Our Medical Team</a>
                </li>
              </ul>
            </li>
            <li className="nav__item">
              <a onClick={onPriceClick} className="navbar-main-heading">
                Price and Packages
              </a>
              <ul className="dropdown">
                <li className="dropdown-heading">Popular Test Panels</li>
                <li>
                  <a onClick={onTenTestPanelClick}>10 test Panel</a>
                </li>
                <li>
                  <a onClick={onChlamydiaGonorrheeaClick}>
                    Chlamydia & Gonorrhea Panel
                  </a>
                </li>
                <li>
                  <a onClick={onHerpes1_2Click}>Herpes I & II Test</a>
                </li>
                <li className="dropdown-heading">Individual Tests</li>
                <li>
                  <a onClick={onChlamydiaTestClick}>Chlamydia Test</a>
                </li>
                <li>
                  <a onClick={onGonorrheaTestClick}>Gonorrhea Test</a>
                </li>
                <li>
                  <a onClick={onHepATestClick}>Hepatitis A Test</a>
                </li>
                <li>
                  <a onClick={onHepBTestClick}>Hepatitis B Test</a>
                </li>
                <li>
                  <a onClick={onHepCTestClick}>Hepatitis C Test</a>
                </li>
                <li>
                  <a onClick={onOralHerpesClick}>Oral Herpes Test</a>
                </li>
                <li>
                  <a onClick={onGenitalHerpesClick}>Genital Herpes Test</a>
                </li>
                <li>
                  <a onClick={onHIV4thGenClick}>
                    HIV 1 & 2 Antibody (4th Gen) Test
                  </a>
                </li>
                <li>
                  <a onClick={onHIVRNSClick}>HIV RNA Early Detection Test</a>
                </li>
                <li>
                  <a onClick={onSyphilisClick}>Syphilis Test</a>
                </li>
              </ul>
            </li>
            <li className="nav__item">
              <a
                onClick={() => {
                  navigate("/diseases/overview");
                }}
                className="navbar-main-heading"
              >
                STDs & Symptoms
              </a>
              <ul className="dropdown">
                <li className="dropdown-heading">STD Information & Symptoms</li>
                <li>
                  <a
                    onClick={() => {
                      closeMenuOnMobile();
                      navigate("/diseases/chlamydia");
                    }}
                  >
                    Chlamydia
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeMenuOnMobile();
                      navigate("/diseases/gonorrhea");
                    }}
                  >
                    Gonorrhea
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeMenuOnMobile();
                      navigate("/diseases/hep-a");
                    }}
                  >
                    Hepatitis A
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeMenuOnMobile();
                      navigate("/diseases/hep-b");
                    }}
                  >
                    Hepatitis B
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeMenuOnMobile();
                      navigate("/diseases/hep-c");
                    }}
                  >
                    Hepatitis C
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeMenuOnMobile();
                      navigate("/diseases/genital-herpes");
                    }}
                  >
                    Genital Herpes
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeMenuOnMobile();
                      navigate("/diseases/oral-herpes");
                    }}
                  >
                    Oral Herpes
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeMenuOnMobile();
                      navigate("/diseases/hiv");
                    }}
                  >
                    HIV
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeMenuOnMobile();
                      navigate("/diseases/syphilis");
                    }}
                  >
                    Syphilis
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeMenuOnMobile();
                      navigate("/diseases/symptoms");
                    }}
                  >
                    STD Symptoms
                  </a>
                </li>
                <li className="dropdown-heading">STD Current Events</li>
                <li>
                  <a>STD Blog</a>
                </li>
              </ul>
            </li>
            <li className="nav__buttons">
              {!authToken ? (
                <>
                  <NavLink
                    to="/login"
                    className="button1"
                    onClick={closeMenuOnMobile}
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="button1 mx-3"
                    onClick={closeMenuOnMobile}
                  >
                    Sign Up
                  </NavLink>
                  <button onClick={()=>setshowAddPatientModal(true)} className="button3">Add Patient</button>
                  {/* <NavLink to="/admin-panel" className="button1 mx-3" onClick={closeMenuOnMobile}>
                    Go to Admin Panel
                  </NavLink> */}
                </>
              ) : (
                <>
                  <NavLink
                    to="/user-profile"
                    className="button1"
                    onClick={closeMenuOnMobile}
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="button1 mx-3 logout-button"
                  >
                    Logout
                  </button>
                  {userRole === "admin" && (
                    <NavLink
                      to="/admin-panel"
                      className="button1"
                      onClick={closeMenuOnMobile}
                    >
                      Go to Admin Panel
                    </NavLink>
                  )}
                </>
              )}
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
      {showAddPatientModal &&
      (
        <AddPatient onClose={()=> setshowAddPatientModal(false)}/>
      )}
    </header>
  );
}

export default Nav;
