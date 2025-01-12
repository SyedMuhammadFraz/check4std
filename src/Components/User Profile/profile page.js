import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";  
import "./profile page.css";
import ConfirmationModal from "../../Modals/confirmation-modal";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const { authToken, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated API call to fetch user info
    const fetchUserData = async () => {
      const userData = {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+9876543210",
        address: "456 Elm St, Townsville, Country",
      };
      setUser(userData);
    };

    // Check if user is logged in
    if (!authToken) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      fetchUserData(); // Fetch user data if authenticated
    }
  }, [authToken, navigate]);

  const handleLogout = () => {
    setShowModal(true); 
  };

  const confirmLogout = () => {
    logout(); 
    setShowModal(false); 
    toast.success("Successfully logged out");
    navigate("/"); 
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>

      <div className="profile-details">
        <div className="detail">
          <span>Name:</span>
          <span>{user.name}</span>
        </div>

        <div className="detail">
          <span>Email:</span>
          <span>{user.email}</span>
        </div>

        <div className="detail">
          <span>Phone:</span>
          <span>{user.phone}</span>
        </div>

        <div className="detail">
          <span>Address:</span>
          <span>{user.address}</span>
        </div>
      </div>

      <div className="profile-actions">
        <button>Edit Profile</button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <p>
        Want to return to the homepage? <a href="/">Click here</a>.
      </p>

      <ConfirmationModal
        showModal={showModal}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default ProfilePage;
