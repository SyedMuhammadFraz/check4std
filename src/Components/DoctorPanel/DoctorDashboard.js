
import React, { useState, useEffect } from "react";
import "./DoctorNavBar.css";
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import DoctorApis from "../../utils/DoctorApis";
import "./DoctorDashboard.css";
import { generateDoctorXml } from "../../utils/ensuraXmlTemplates";
import { getNameFromAuthToken } from "../../utils/AuthContext"; // Adjust the import path as needed
import { toast } from "react-toastify";

const DoctorDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [DoctorInfo, setDoctorInfo] = useState(null);

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

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await DoctorApis.getDoctorAppointmentsGraphQL();
        console.log("GraphQL Response:", response.data.data);
        if (response.status === 200 && response.data?.data?.doctorInfo) {
          const doctorInfo = response.data.data.doctorInfo;
          setDoctorInfo(doctorInfo);
          const availability = doctorInfo.availability || [];
          const appts = (doctorInfo.appointments || []).map(appt => {
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
          if (appts.length > 0) {
            setAppointments(appts);
          }
        } else {
          toast.error("Failed to fetch doctor info or appointments from GraphQL.");
        }
      } catch (err) {
        toast.error("Error fetching doctor/appointments info");
      }
    };
    fetchAppointments();
  }, []);

  const NEWCROP_URL =
    "https://preproduction.newcropaccounts.com/UX2/InterfaceV7/ClickThroughRxEntry";

  const handlePrescription = async (patient) => {
    setLoading(true);
    setError("");
    try {
      // 1. Fetch token from DoctorApis
      const verifResponse = await DoctorApis.getPrescriptionPageToken();
      const token = verifResponse?.data?.result?.token;
      if (!token) throw new Error("No token returned");

      // 2. Prepare XML with all dummy values mapped as valid strings
      let prescriberFirst = "DUMMY_PRESCRIBER_FIRST";
      let prescriberLast = "DUMMY_PRESCRIBER_LAST";
      const doctorName = getNameFromAuthToken();
      if (DoctorInfo && doctorName) {
        const nameParts = doctorName.trim().split(" ");
        if (nameParts.length > 1) {
          prescriberLast = nameParts[nameParts.length - 1];
          prescriberFirst = nameParts.slice(0, -1).join(" ");
        } else {
          prescriberLast = nameParts[0];
          prescriberFirst = "";
        }
      }
      // Split patient name into first and last (single-word: first = "", last = name)
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

      const xml = generateDoctorXml({
        accountId: "DUMMY_ACCOUNT_ID",
        accountName: "DUMMY_ACCOUNT_NAME",
        siteID: "DUMMY_SITE_ID",
        accountAddress1: "DUMMY_ACCOUNT_ADDRESS1",
        accountAddress2: "DUMMY_ACCOUNT_ADDRESS2",
        accountCity: "DUMMY_ACCOUNT_CITY",
        accountState: "DUMMY_ACCOUNT_STATE",
        accountZip: "DUMMY_ACCOUNT_ZIP",
        accountZip4: "DUMMY_ACCOUNT_ZIP4",
        accountCountry: "DUMMY_ACCOUNT_COUNTRY",
        accountPhone: "1234567890",
        accountFax: "1234567890",
        locationId: "DUMMY_LOCATION_ID",
        locationName: "DUMMY_LOCATION_NAME",
        locationAddress1: "DUMMY_LOCATION_ADDRESS1",
        locationCity: "DUMMY_LOCATION_CITY",
        locationState: "DUMMY_LOCATION_STATE",
        locationZip: "DUMMY_LOCATION_ZIP",
        locationCountry: "DUMMY_LOCATION_COUNTRY",
        locationPhone: "1234567890",
        locationFax: "1234567890",
        pharmacyContact: "1234567890",
        prescriberId: "DUMMY_PRESCRIBER_ID",
        prescriberLast,
        prescriberFirst,
        prescriberDEA: "DUMMY_PRESCRIBER_DEA",
        patientId: patient.patient.id || "DUMMY_PATIENT_ID",
        patientLast: patientLast || "",
        patientFirst: patientFirst || "",
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
      });

      console.log("Generated XML:", xml);

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
                      <span className="td-info">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 48 48"
                        >
                          <defs>
                            <mask id="ipTInfo0">
                              <g fill="none">
                                <path
                                  fill="#555555"
                                  stroke="#fff"
                                  stroke-linejoin="round"
                                  stroke-width="4"
                                  d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"
                                />
                                <path
                                  fill="#fff"
                                  fillRule="evenodd"
                                  d="M24 11a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"
                                  clipRule="evenodd"
                                />
                                <path
                                  stroke="#fff"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="4"
                                  d="M24.5 34V20h-2M21 34h7"
                                />
                              </g>
                            </mask>
                          </defs>
                          <path
                            fill="#fbc02d"
                            d="M0 0h48v48H0z"
                            mask="url(#ipTInfo0)"
                          />
                        </svg>
                      </span>
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

export default DoctorDashboard;
