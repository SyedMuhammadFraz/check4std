import Cookies from "js-cookie";
import { webApiInstance , webApiGraphQLInstance } from "../AxiosInstance";

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
  // Get doctor info and appointments via GraphQL
  async getDoctorAppointmentsGraphQL() {
    const token = getAuthToken();
    const query = `query{\n  doctorInfo{\n    id,\n    dea,\n    availability{\n      id,\n      date,\n      timeSlot{\n        id,\n        startTime,\n        endTime,\n        status{\n          id,\n          lookupType,\n          lookupValue\n        }\n      }\n    },\n    appointments{\n      id,\n      timeSlot{\n        id,\n        startTime,\n        endTime,\n        status{\n          id,\n          lookupType,\n          lookupValue\n        }\n      },\n      status{\n        id,\n        lookupType,\n        lookupValue\n      },\n      patient{\n        id,\n        address,\n        city,\n        state,\n        zip,\n        country,\n        createdBy{\n          id,\n          name,\n          email,\n          phoneNumber,\n          dob\n        },\n        name,\n        dob,\n        phone,\n        primaryInsurance,\n        secondaryInsurance,\n        age,\n        email,\n        gender{\n          id,\n          lookupType,\n          lookupValue\n        }\n      }\n    }\n  }\n}`;
    return webApiGraphQLInstance.post(
      "/graphql",
      { query },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

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

  async getPrescriptionPageToken() {
    const token = getAuthToken();
    return webApiInstance.get("/Doctor/prescription-page-token", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Get appointments for a specific doctor by ID
  async getAppointmentsById(doctorId) {
    const token = getAuthToken();
    return webApiInstance.get(`/Doctor/appointments/${doctorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Get doctor info by email
  async getDoctorByEmail(email) {
    const token = getAuthToken();
    return webApiInstance.get(`/Doctor/get-by-email/${encodeURIComponent(email)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  // Get appointment by doctor id (appointment-by-doc-id/:id)
  async getAppointmentByDocId(doctorId) {
    const token = getAuthToken();
    return webApiInstance.get(`/Doctor/appointment-by-doc-id/${doctorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
export default DoctorApis;
