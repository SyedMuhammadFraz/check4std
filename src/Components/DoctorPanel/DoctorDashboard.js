import React, { useState } from "react";
import "./DoctorNavBar.css";
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import DoctorApis from "../../utils/DoctorApis";
import './DoctorDashboard.css';
import { doctorXml } from "../../utils/ensuraXmlTemplates";

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

const NEWCROP_URL = "https://preproduction.newcropaccounts.com/UX2/InterfaceV7/ClickThroughRxEntry";

const handlePrescription = async (patient) => {
  setLoading(true);
  setError("");
  try {
    // 1. Fetch token from DoctorApis
    const verifResponse = await DoctorApis.getPrescriptionPageToken();
    const token = verifResponse?.data?.result?.token;
    if (!token) throw new Error("No token returned");

    // 2. Prepare XML (can be dynamic per patient if needed)
    const xml = doctorXml;

    // 3. Create and submit a form to NewCrop in a new tab
    const form = document.createElement('form');
    form.action = NEWCROP_URL;
    form.method = 'POST';
    form.target = '_blank';
    form.style.display = 'none';

    // Token (as bearerToken field)
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'bearerToken';
    tokenInput.value = token;
    form.appendChild(tokenInput);

    // XML
    const xmlInput = document.createElement('textarea');
    xmlInput.name = 'RxInput';
    xmlInput.value = xml;
    form.appendChild(xmlInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
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
