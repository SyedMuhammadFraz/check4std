import React, { useState, useEffect } from "react";
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import "../DoctorPanel/DoctorDashboard.css";
import { toast } from "react-toastify";

// Helper to format date as MM/DD/YYYY
function formatDateToUS(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

const AppointmentDashboard = ({
  fetchDataFn,
  getPrescriberName,
  generateXmlFn,
  getPrescriptionTokenFn,
  roleLabel = "Dashboard"
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [entityInfo, setEntityInfo] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetchDataFn();
        if (response.status === 200 && response.data?.data) {
          const info = response.data.data.doctorInfo || response.data.data.nurseInfo;
          setEntityInfo(info);
          const availability = info.availability || [];
          const appts = (info.appointments || []).map(appt => {
            let matchedDate = "-";
            for (const avail of availability) {
              if (avail.timeSlot && Array.isArray(avail.timeSlot)) {
                if (avail.timeSlot.some(ts => ts.id === appt.timeSlot?.id)) {
                  matchedDate = formatDateToUS(avail.date);
                  break;
                }
              }
            }
            return { ...appt, matchedDate };
          });
          setAppointments(appts);
        } else {
          toast.error(`Failed to fetch ${roleLabel.toLowerCase()} info or appointments from GraphQL.`);
        }
      } catch (err) {
        toast.error(`Error fetching ${roleLabel.toLowerCase()}/appointments info`);
      }
    };
    fetchAppointments();
  }, [fetchDataFn, roleLabel]);

  const NEWCROP_URL =
    "https://preproduction.newcropaccounts.com/UX2/InterfaceV7/ClickThroughRxEntry";

  const handlePrescription = async (patient) => {
    setLoading(true);
    setError("");
    try {
      // 1. Fetch token
      const verifResponse = await getPrescriptionTokenFn();
      const token = verifResponse?.data?.result?.token;
      if (!token) throw new Error("No token returned");

      // 2. Prepare XML
      let prescriberFirst = "DUMMY_PRESCRIBER_FIRST";
      let prescriberLast = "DUMMY_PRESCRIBER_LAST";
      const prescriberName = getPrescriberName();
      if (entityInfo && prescriberName) {
        const nameParts = prescriberName.trim().split(" ");
        if (nameParts.length > 1) {
          prescriberLast = nameParts[nameParts.length - 1];
          prescriberFirst = nameParts.slice(0, -1).join(" ");
        } else {
          prescriberLast = nameParts[0];
          prescriberFirst = "";
        }
      }
      // Split patient name into first and last
      const patientNameParts = (patient.patient.name || "").trim().split(" ");
      let patientFirst = "";
      let patientLast = "";
      if (patientNameParts.length > 1) {
        patientLast = patientNameParts[patientNameParts.length - 1];
        patientFirst = patientNameParts.slice(0, -1).join(" ");
      } else {
        patientLast = patientNameParts[0] || "";
        patientFirst = "";
      }

      const xml = generateXmlFn({
        prescriberFirst,
        prescriberLast,
        patientFirst,
        patientLast,
        patientId: patient.patient.id || "DUMMY_PATIENT_ID",
        patientAddress1: patient.patient.address || "123 Main St",
        patientCity: patient.patient.city || "New York",
        patientState: patient.patient.state || "NY",
        patientZip: patient.patient.zip || "10001",
        patientCountry: patient.patient.country || "USA",
        patientCell: patient.patient.phone || "+1-555-123-4567",
        patientEmail: patient.patient.email || "dummy@email.com",
        patientDOB: patient.patient.dob || "19900101",
        patientGender:
          patient.patient.gender.lookupValue === "Female"
            ? "F"
            : patient.patient.gender.lookupValue === "Male"
            ? "M"
            : "M",
        // ...add other fields as needed
      });

      // 3. Create and submit a form to NewCrop in a new tab
      const form = document.createElement("form");
      form.action = NEWCROP_URL;
      form.method = "POST";
      form.target = "_blank";
      form.style.display = "none";

      // Token (as bearerToken field)
      const tokenInput = document.createElement("input");
      tokenInput.type = "hidden";
      tokenInput.name = "bearerToken";
      tokenInput.value = token;
      form.appendChild(tokenInput);

      // XML
      const xmlInput = document.createElement("textarea");
      xmlInput.name = "RxInput";
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
        <h1>{roleLabel}</h1>
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
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", color: "#888" }}>
                  No appointments found.
                </td>
              </tr>
            ) : (
              <>
                {appointments.map((appt, idx) => (
                  <tr key={appt.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{appt.patient.name || "-"}</td>
                    <td>{appt.patient.age || "-"}</td>
                    <td>{appt.patient.gender.lookupValue || "-"}</td>
                    <td>{appt.timeSlot?.startTime && appt.timeSlot?.endTime ? `${appt.timeSlot.startTime} - ${appt.timeSlot.endTime}` : "-"}</td>
                    <td>{appt.matchedDate || "-"}</td>
                    <td className="td-action-flex">
                      <button
                        className="prescription-btn"
                        title="Generate Prescription"
                        onClick={() => handlePrescription(appt)}
                      >
                        <FaPrescriptionBottleAlt size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default AppointmentDashboard;
