import React, { useState } from "react";
import "./DoctorNavBar.css";
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import PrescriptionModal from "./PrescriptionModal";

const NC_XML = `
<NCScript xmlns="http://secure.newcropaccounts.com/interfaceV7" xmlns:NCStandard="http://secure.newcropaccounts.com/interfaceV7:NCStandard" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<Credentials>
<partnerName>SatelliteHealth</partnerName>
<productName>check4std</productName>
<productVersion>1</productVersion>
</Credentials>
<UserRole>
<user>LicensedPrescriber</user>
<role>doctor</role>
</UserRole>
<Destination>
<requestedPage>compose</requestedPage>
</Destination>
<Account ID="Test Practice">
<accountName>Your Customer's Account Name</accountName>
<siteID>demositeid</siteID>
<AccountAddress>
<address1>232323 Test</address1>
<address2>Suite 240</address2>
<city>Boston</city>
<state>MA</state>
<zip>10409</zip>
<zip4>1234</zip4>
<country>US</country>
</AccountAddress>
<accountPrimaryPhoneNumber>2625551212</accountPrimaryPhoneNumber>
<accountPrimaryFaxNumber>2625551313</accountPrimaryFaxNumber>
</Account>
<Location ID="DEMOLOC1">
<locationName>Your Customer's Location Name</locationName>
<LocationAddress>
<address1>232323 Test</address1>
<address2>Suite 240</address2>
<city>Boston</city>
<state>MA</state>
<zip>10409</zip>
<zip4>1234</zip4>
<country>US</country>
</LocationAddress>
<primaryPhoneNumber>2625551212</primaryPhoneNumber>
<primaryFaxNumber>2625551213</primaryFaxNumber>
<pharmacyContactNumber>2625551212</pharmacyContactNumber>
</Location>
<LicensedPrescriber ID="DEMOLP1">
<LicensedPrescriberName>
<last>Smith</last>
<first>Doctor</first>
<middle>J</middle>
</LicensedPrescriberName>
<dea>AS1111111</dea>
<licenseState>TX</licenseState>
<licenseNumber>12345678</licenseNumber>
<npi>1000000004</npi>
</LicensedPrescriber>
<Patient ID="DEMOPT1">
<PatientName>
<last>Wilson</last>
<first>Patient</first>
<middle>J</middle>
</PatientName>
<medicalRecordNumber>123456</medicalRecordNumber>
<memo>Picks up meds at VA</memo>
<PatientAddress>
<address1>23223 Test</address1>
<address2>Suite 240</address2>
<city>Boston</city>
<state>MA</state>
<zip>10455</zip>
<country>US</country>
</PatientAddress>
<PatientContact>
<homeTelephone>2623691213</homeTelephone>
</PatientContact>
<PatientCharacteristics>
<dob>19800115</dob>
<gender>M</gender>
</PatientCharacteristics>
</Patient>
</NCScript>
`;

const NEWCROP_URL = "https://secure.newcropaccounts.com/interfaceV7/NCUI.aspx";

const DoctorDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [xml, setXml] = useState("");

  // Example data, replace with real data as needed
  const patients = [
    { id: 1, name: "John Doe", age: 32, gender: "Male", time: "10:00 AM", date: "2025-05-28" },
    { id: 2, name: "Jane Smith", age: 28, gender: "Female", time: "11:30 AM", date: "2025-05-28" },
  ];

  const handlePrescription = (patient) => {
    // In a real app, you would generate XML with patient/doctor info here
    setXml(NC_XML);
    setModalOpen(true);
  };

  return (
    <div className="admin-table-container">
      <h2>Doctor Dashboard</h2>
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
      <PrescriptionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        xml={xml}
        actionUrl={NEWCROP_URL}
      />
    </div>
  );
};

export default DoctorDashboard;
