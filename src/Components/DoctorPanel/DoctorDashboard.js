import React, { useState } from "react";
import "./DoctorNavBar.css";
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import PrescriptionModal from "./PrescriptionModal";
import DoctorApis from "../../utils/DoctorApis";
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
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
      // response.data may be HTML string
      if (response.data) {
        setHtmlContent(response.data); // Set HTML content for modal
        setIframeUrl("");
        setModalOpen(true);
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
        <PrescriptionModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          iframeUrl={iframeUrl}
          htmlContent={htmlContent}
        />
      </div>
    </div>
  );
};

export default DoctorDashboard;
