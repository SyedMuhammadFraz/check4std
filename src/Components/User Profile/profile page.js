import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import "../Journey/journey.css";
import ConfirmationModal from "../../Modals/confirmation-modal";
import { toast } from "react-toastify";
import { decodeJWT } from "../../utils/JWTDecoder";
import ClipLoader from "react-spinners/ClipLoader";
import { webApiInstance } from "../../AxiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProfilePage = ({ journey = false }) => {
  const [user, setUser] = useState({ name: "", firstName: "", lastName: "", phoneNumber: "", dob: "" });
  const [myOrders, setMyOrders] = useState([]);
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
    if (!user.firstName?.trim() || !user.lastName?.trim() || !user.phoneNumber || !user.dob) {
      toast.error("First name, last name, phone number and date of birth are required.");
      return;
    }
    const formattedDob = new Date(user.dob).toISOString().split("T")[0]; // "YYYY-MM-DD"

    // The backend rebuilds the full name from first + last name.
    const userData = {
      name: `${user.firstName.trim()} ${user.lastName.trim()}`,
      firstName: user.firstName.trim(),
      lastName: user.lastName.trim(),
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
      navigate(journey ? "/journey/login" : "/login");
    } else {
      const decodedToken = decodeJWT(authToken);
      setDecodedData(decodedToken);
    }
  }, [authToken, navigate, journey]);

  useEffect(() => {
    if (!authToken) return;
    const fetchMyOrders = async () => {
      try {
        const response = await webApiInstance.get("/Order/my-orders", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setMyOrders(response.data.result || []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };
    fetchMyOrders();
  }, [authToken]);

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
          firstName: response.data.result.firstName || "",
          lastName: response.data.result.lastName || "",
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

  const initials = (user.name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "SH";


  // The account page no longer offers a consultation. It is meant to return only
  // when a result comes back positive, and /Order/my-orders carries no result
  // field yet -- id, orderDate, orderStatus, amount and diseases only. Booking
  // itself still works at /journey/consultation and /doctor-consultation.
  return (
    <section className="sh-journey">
      <div className="j-shell">
        <div className="j-eyebrow">SATELLITE HEALTH · MY ACCOUNT</div>
        <h1 className="j-title">Your health account.</h1>
        <p className="j-intro">
          Manage your details and continue your testing journey.
        </p>

        <div className="j-profile-header">
          <span className="j-avatar">{initials}</span>
          <div>
            <h2>{user.name || "Your account"}</h2>
            <span className="j-hint">{decodedData?.sub}</span>
          </div>
        </div>

        <div className="j-cards">
          <div className="j-panel j-full">
            <span className="j-tag">MY ORDERS</span>
            <h3>Your test orders</h3>
            <p className="j-hint">Review what you have ordered and start a new order.</p>
            {myOrders.length === 0 ? (
              <p className="j-hint">You haven't placed any orders yet.</p>
            ) : (
              myOrders.map((order) => (
                <div className="j-row" key={order.id}>
                  <span>
                    #{order.id} · {(order.diseases || []).map((d) => d.name).join(", ")} ·{" "}
                    {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                  <strong>
                    {order.orderStatus} · ${Number(order.amount).toFixed(2)}
                  </strong>
                </div>
              ))
            )}
            <Link className="j-button j-button--secondary" to={journey ? "/journey/tests" : "/price-packages"}>
              Browse tests
            </Link>
          </div>
        </div>

        <div className="j-panel j-account-panel">
          <div className="j-payment-heading">
            <h2 className="j-panel-title">Patient details</h2>
            <span className="j-pill">{isEditing ? "Editing" : "Saved"}</span>
          </div>
          <div className="j-grid">
            <div>
              <label htmlFor="profile-first-name">First name</label>
              <input
                id="profile-first-name"
                type="text"
                name="firstName"
                value={user.firstName || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="profile-last-name">Last name</label>
              <input
                id="profile-last-name"
                type="text"
                name="lastName"
                value={user.lastName || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="profile-phone">Phone number</label>
              {isEditing ? (
                <input
                  id="profile-phone"
                  type="text"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleInputChange}
                />
              ) : (
                <input id="profile-phone" type="text" value={user.phoneNumber || ""} disabled />
              )}
            </div>
            <div>
              <label htmlFor="profile-dob">Date of birth</label>
              {isEditing ? (
                <input
                  id="profile-dob"
                  type="date"
                  name="dob"
                  value={user.dob || ""}
                  onChange={handleInputChange}
                />
              ) : (
                <input id="profile-dob" type="text" value={user.dob || ""} disabled />
              )}
            </div>
          </div>
          {isEditing && (
            <p className="j-hint">Use the format (XXX) XXX-XXXX for your phone number.</p>
          )}
          <div className="j-actions">
            <button type="button" className="j-button" onClick={handleEditSave} disabled={loading}>
              {loading ? (
                <ClipLoader size={18} color={"#fff"} loading={loading} />
              ) : isEditing ? (
                "Save changes"
              ) : (
                "Edit profile"
              )}
            </button>
            <button
              type="button"
              className="j-button j-button--secondary"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
            >
              {isChangingPassword ? "Cancel password change" : "Change password"}
            </button>
          </div>
        </div>

        {isChangingPassword && (
          <div className="j-panel j-account-panel">
            <span className="j-tag">SECURITY</span>
            <h2 className="j-panel-title">Change your password</h2>
            <div className="j-grid">
              <div className="j-password">
                <label htmlFor="old-password">Current password</label>
                <input
                  id="old-password"
                  type={showPasswords.oldPassword ? "text" : "password"}
                  name="oldPassword"
                  autoComplete="current-password"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordInputChange}
                />
                <button
                  type="button"
                  aria-label={showPasswords.oldPassword ? "Hide password" : "Show password"}
                  onClick={() => toggleShowPassword("oldPassword")}
                >
                  {showPasswords.oldPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="j-password">
                <label htmlFor="new-password">New password</label>
                <input
                  id="new-password"
                  type={showPasswords.newPassword ? "text" : "password"}
                  name="newPassword"
                  autoComplete="new-password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInputChange}
                />
                <button
                  type="button"
                  aria-label={showPasswords.newPassword ? "Hide password" : "Show password"}
                  onClick={() => toggleShowPassword("newPassword")}
                >
                  {showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <p className="j-hint">
              Use at least 8 characters with an uppercase letter, a lowercase letter, a number and
              a special character.
            </p>
            <div className="j-actions">
              <button
                type="button"
                className="j-button"
                onClick={handlePasswordChange}
                disabled={passwordLoading}
              >
                {passwordLoading ? (
                  <ClipLoader size={18} color={"#fff"} loading={passwordLoading} />
                ) : (
                  "Update password"
                )}
              </button>
            </div>
          </div>
        )}

        <div className="j-actions">
          <Link className="j-button j-button--secondary" to="/">
            Back to home
          </Link>
          <button
            type="button"
            className="j-button j-button--secondary"
            onClick={handleLogout}
            disabled={loading}
          >
            Log out
          </button>
        </div>

        <ConfirmationModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmLogout}
        />
      </div>
    </section>
  );
};

export default ProfilePage;
