import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import "./profile page.css";
import ConfirmationModal from "../../Modals/confirmation-modal";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { authToken, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    } else {
      fetchUserData();
    }
  }, [authToken, navigate]);

  const fetchUserData = async () => {
    // Simulated API call to fetch user data
    const userData = {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      address: "456 Elm St, Townsville, Country",
    };
    setUser(userData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEditSave = () => {
    if (isEditing) {
      // Simulate API call to save updated user data
      toast.success("Profile updated successfully!");
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowModal(false);
    toast.success("Successfully logged out");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>

      <div className="profile-details">
        <div className="detail">
          <span className="detail-labels">Name:</span>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <span className="detail-values">{user.name}</span>
          )}
        </div>

        <div className="detail">
          <span className="detail-labels">Email:</span>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <span className="detail-values">{user.email}</span>
          )}
        </div>

        <div className="detail">
          <span className="detail-labels">Phone:</span>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <span className="detail-values">{user.phone}</span>
          )}
        </div>

        <div className="detail">
          <span className="detail-labels">Pwd:</span>
          {isEditing ? (
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="edit-input"
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          ) : (
            <span className="detail-values">*********</span>
          )}
        </div>
      </div>

      <div className="profile-actions">
        <button onClick={handleEditSave}>
          {isEditing ? "Save" : "Edit Profile"}
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <p>
        Want to return to the homepage? <a href="/">Click here</a>.
      </p>

      <ConfirmationModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default ProfilePage;
