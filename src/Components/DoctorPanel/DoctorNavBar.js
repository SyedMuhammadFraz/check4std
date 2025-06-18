import React , {useContext , useState} from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../Modals/confirmation-modal";
import { AuthContext } from "../../utils/AuthContext";
import { toast } from "react-toastify";
import "./DoctorNavBar.css";

const DoctorNavBar = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
    setShowModal(true);
    };
    const cancelLogout = () => {
    setShowModal(false);
   };

    const confirmLogout = () => {
      logout();
      setShowModal(false);
      navigate("/");
      toast.success("Successfully logged out");
    };
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
        {/* Add more doctor-specific links here */}
      </ul>
            <ConfirmationModal
        showModal={showModal}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />
    </nav>
  );
};

export default DoctorNavBar;
