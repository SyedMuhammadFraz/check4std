import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import "./profile page.css";
import ConfirmationModal from "../../Modals/confirmation-modal";
import { toast } from "react-toastify";
import { decodeJWT } from "../../utils/JWTDecoder";
import ClipLoader from "react-spinners/ClipLoader";
import { webApiInstance } from "../../AxiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState({ name: "", phoneNumber: "", dob: "" });
  const [decodedData, setDecodedData] = useState(null);
  const { authToken, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
  });
  const navigate = useNavigate();

  const handlePasswordChange = async () => {
    
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordData.oldPassword || !passwordData.newPassword) {
      toast.error("Please enter both old and new passwords.");
      return;
    }

    if (!passwordRegex.test(passwordData.newPassword)) {
      toast.error(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await webApiInstance.put(
        "/User/change-password",
        passwordData,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Password changed successfully!");
        setIsChangingPassword(false);
        setPasswordData({ oldPassword: "", newPassword: "" });
      }
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const updateUser = async () => {
    if (!user.name || !user.phoneNumber || !user.dob) {
      console.error("Error: Missing required fields.");
      return;
    }
    const formattedDob = new Date(user.dob).toISOString().split("T")[0]; // "YYYY-MM-DD"

    const userData = {
      name: user.name,
      phoneNumber: user.phoneNumber,
      dob: formattedDob,
    };
    try {
      console.log(userData);
      const response = await webApiInstance.put("/User/update", userData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      console.log(response);
      console.log("User updated successfully!", response.data);
      return response;
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
      throw error;
    }
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
    if (decodedData) {
      fetchUpdatedUserData();
    }
  }, [decodedData]);

  const fetchUpdatedUserData = async () => {
    if (!decodedData?.sub) return;
    setLoading(true);
    try {
      const response = await webApiInstance.get(`/User/get-by-email`, {
        params: { email: decodedData.sub },
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status === 200) {
        setUser({
          name: response.data.result.name,
          phoneNumber: response.data.result.phoneNumber,
          dob: response.data.result.dob,
        });
      }
    } catch (error) {
      toast.error("Failed to refresh user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEditSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (!decodedData?.publicId) {
      toast.error("User ID not found. Please try again.");
      return;
    }

    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(user.phoneNumber)) {
      toast.error("Invalid phone number format. Use (XXX) XXX-XXXX.");
      return;
    }

    setLoading(true);
    try {
      const response = await updateUser();
      if (response?.status === 200) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        setUser(response.data.user || user);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
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

  const toggleShowPassword = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
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
          <span className="detail-labels">Phone:</span>
          {isEditing ? (
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <span className="detail-values">{user.phoneNumber}</span>
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
        <button onClick={handleEditSave} disabled={loading}>
          {loading ? (
            <ClipLoader size={20} color={"#fff"} loading={loading} />
          ) : isEditing ? (
            "Save"
          ) : (
            "Edit Profile"
          )}
        </button>
        <button
          className="logout-button"
          onClick={handleLogout}
          disabled={loading}
        >
          Logout
        </button>

        <button
          className="change-password-button"
          onClick={() => setIsChangingPassword(!isChangingPassword)}
        >
          {isChangingPassword ? "Cancel" : "Change Password"}
        </button>
      </div>

      {isChangingPassword && (
        <div className="change-password-container">
          <div className="password-field">
            <input
              type={showPasswords.oldPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={handlePasswordInputChange}
              className="password-input"
            />
            <button
              className="toggle-password"
              onClick={() => toggleShowPassword("oldPassword")}
            >
              {showPasswords.oldPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="password-field">
            <input
              type={showPasswords.newPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordInputChange}
              className="password-input"
            />
            <button
              className="toggle-password"
              onClick={() => toggleShowPassword("newPassword")}
            >
              {showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            onClick={handlePasswordChange}
            className="confirm-password-button"
            disabled={loading}
          >
            {passwordLoading ? (
              <ClipLoader size={20} color={"#fff"} loading={passwordLoading} />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      )}

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
