import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import "./profile page.css";
import ConfirmationModal from "../../Modals/confirmation-modal";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { decodeJWT } from "../../utils/JWTDecoder";
import ClipLoader from "react-spinners/ClipLoader";
import { webApiInstance } from "../../AxiosInstance";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
  });
  const [decodedData, setDecodedData] = useState(null);
  const { authToken, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Update User API function

  const updateUser = async (id, userData) => {
    return await webApiInstance.put(`/api/user/update/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Ensure authToken is accessible
      },
    });
  };
  

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    } else {
      const decodedToken = decodeJWT(authToken);
      setDecodedData(decodedToken);
    }
  }, [authToken, navigate]);

  useEffect(() => {
    console.log("Updated Decoded Data:", decodedData);
    fetchUserData();
  }, [decodedData]);

  const fetchUserData = async () => {
    if (!decodedData) return;
    setLoading(true);
    const userData = {
      name: decodedData.name,
      phone: decodedData.phonenumber,
      dob: decodedData.dob,
    };
    setUser(userData);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value, // Update only the changed field
    }));
  };
  

  const handleEditSave = async () => {
    if (!isEditing) {
      setIsEditing(true); // Enable editing mode
      return;
    }
  
    if (!decodedData?.publicId) {
      toast.error("User ID not found. Please try again.");
      return;
    }
  
    try {
      const response = await updateUser(decodedData.publicId, user); // Pass ID and updated user data
      console.log(response);
  
      if (response?.data?.success) { // Use success flag instead of status code
        toast.success(response.data.message || "Profile updated successfully!");
        setIsEditing(false); // Disable editing mode after successful update
        setUser(response.data.updatedUser || user); // Update state with new data
      } else {
        toast.error(response?.data?.message || "Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "An error occurred while updating the profile.");
    }
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

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
        <p>Loading user data...</p>
      </div>
    );
  }

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
          <span className="detail-labels">Date of Birth:</span>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={user.dob || ""}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <span className="detail-values">{user.dob}</span>
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
