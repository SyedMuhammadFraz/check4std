import axios from "axios";
import Cookies from "js-cookie";
import { webApiInstance } from "../AxiosInstance";

// Utility to get auth token (replace with your actual implementation)
function getAuthToken() {
  let storedToken = Cookies.get("authToken");

  if (!storedToken) {
    storedToken = localStorage.getItem("authToken");
  }
  return storedToken;
}

// Example API call structure
const DoctorApis = {
  // Example: getDoctorProfile
  async getDoctorProfile() {
    const token = getAuthToken();
    return webApiInstance.get("/api/doctor/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Get all appointments
  async getAppointments() {
    const token = getAuthToken();
    return webApiInstance.get("/Doctor/appointments", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Get prescription page XML for a doctor and patient
  async getPrescriptionPage(doctorId, patientId) {
    const token = getAuthToken();
    return webApiInstance.get(`/Doctor/prescription-page/${doctorId}/${patientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Add more doctor-related API calls here, each including the auth token
};

export default DoctorApis;
