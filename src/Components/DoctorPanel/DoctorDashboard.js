import React, { useState } from "react";
import "./DoctorNavBar.css";
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import DoctorApis from "../../utils/DoctorApis";
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Example data, replace with real data as needed
  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 32,
      gender: "Male",
      time: "10:00 AM",
      date: "2025-05-28",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      gender: "Female",
      time: "11:30 AM",
      date: "2025-05-28",
    },
  ];

const BASE_URL = "https://preproduction.newcropaccounts.com"; // Change to your actual base

function rewriteRelativeUrls(html, baseUrl) {
  // Replace href="/... and src="/... with absolute URLs
  return html.replace(/(href|src)=["']\/(?!\/)/g, `$1="${baseUrl}/`);
}

const handlePrescription = async (patient) => {
  setLoading(true);
  setError("");
  try {
    const doctorId = 15; // Replace with actual doctor id
    const patientId = 7; // Replace with actual patient id
    const response = await DoctorApis.getPrescriptionPage(
      doctorId,
      patientId
    );
    if (response.data) {
      // Fix relative URLs
      const fixedHtml = rewriteRelativeUrls(response.data, BASE_URL);
      // Open the fixed HTML in a new tab using a Blob
      const blob = new Blob([fixedHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } else {
      setError("No HTML returned from NewCrop.");
    }
  } catch (err) {
    setError(err.message || "Error sending prescription");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="admin-table-container">
      <div className="admin-table-wrapper">
        <h1>Doctor Dashboard</h1>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Appointment Time</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, idx) => (
              <tr key={patient.id}>
                <td>{idx + 1}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.time}</td>
                <td>{patient.date}</td>
                <td>
                  <button
                    className="prescription-btn"
                    title="Generate Prescription"
                    onClick={() => handlePrescription(patient)}
                  >
                    <FaPrescriptionBottleAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default DoctorDashboard;
