import React, { useState } from "react";
import "./DoctorNavBar.css";
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import PrescriptionModal from "./PrescriptionModal";
import axios from "axios";

// const NC_XML = `
// <?xml version="1.0" encoding="utf-8"?>
// <NCScript xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://secure.newcropaccounts.com/interfaceV7">
// <Credentials>
// <partnerName>SatelliteHealth</partnerName>
// <productName>SuperDuperSoftware</productName>
// <productVersion>V5.3</productVersion>
// </Credentials>
// 	<UserRole>
// 		<user>LicensedPrescriber</user>
// 		<role>doctor</role>
// 	</UserRole>
// 	<Destination>
// 		<requestedPage>compose</requestedPage>
// 	</Destination>
// 	<Account ID="1">
// 		<accountName>Spelling Family Clinics</accountName>
// 		<siteID>b59d529d28024129ae256ee3af5b086d</siteID>
// 		<AccountAddress>
// 			<address1>210 West Temple St</address1>
// 			<address2>Suite 101</address2>
// 			<city>Los Angeles</city>
// 			<state>CA</state>
// 			<zip>90012</zip>
// 			<zip4>1234</zip4>
// 			<country>US</country>
// 		</AccountAddress>
// 		<accountPrimaryPhoneNumber>2135551212</accountPrimaryPhoneNumber>
// 		<accountPrimaryFaxNumber>3235551313</accountPrimaryFaxNumber>
// 	</Account>
// 	<Location ID="9628b1e9ea38463bb29615bd106c4fd8">
// 		<locationName>Hills Clinica</locationName>
// 		<LocationAddress>
// 			<address1>123 Main</address1>
// 			<city>Beverly Hills</city>
// 			<state>CA</state>
// 			<zip>90210</zip>
// 			<country>US</country>
// 		</LocationAddress>
// 		<primaryPhoneNumber>2135451412</primaryPhoneNumber>
// 		<primaryFaxNumber>2135451489</primaryFaxNumber>
// 		<pharmacyContactNumber>2135451412</pharmacyContactNumber>
// 	</Location>
// 	<LicensedPrescriber ID="37fde454a8dd455e8afe16bc28626e7a">
// 		<LicensedPrescriberName>
// 			<last>Tam</last>
// 			<first>Simon</first>
// 			<suffix>MD</suffix>
// 		</LicensedPrescriberName>
// 		<dea>AT1895070</dea>
// 		<licenseState>CA</licenseState>
// 		<licenseNumber>784411</licenseNumber>
// 		<npi>1894111230</npi>
// 	</LicensedPrescriber>
// 	<Patient ID="aae2c1474a764020a876540b19a0ac25">
// 		<PatientName>
// 			<last>Delaplaine</last>
// 			<first>Zachary</first>
// 		</PatientName>
// 		<medicalRecordNumber>1234567890</medicalRecordNumber>
// 		<PatientAddress>
// 			<address1>901 Sauvblanc Blvd</address1>
// 			<city>Petaluma</city>
// 			<state>CA</state>
// 			<zip>94952</zip>
// 			<country>US</country>
// 		</PatientAddress>
// 		<PatientContact>
// 			<workTelephone>7135153221</workTelephone>
// 			<cellularTelephone>4123615658</cellularTelephone>
// 			<email>test@test.com</email>
// 		</PatientContact>
// 		<PatientCharacteristics>
// 			<dob>20101201</dob>
// 			<gender>M</gender>
// 			<height>51</height>
// 			<heightUnits>in</heightUnits>
// 			<weight>62</weight>
// 			<weightUnits>lb</weightUnits>
// 		</PatientCharacteristics>
// 		<PatientAllergies>
// 			<allergyID>245</allergyID>
// 			<allergyTypeID>FDB</allergyTypeID>
// 		</PatientAllergies>
// 		<PatientHealthplans>
// 			<healthplanID>12</healthplanID>
// 			<healthplanTypeID>Summary</healthplanTypeID>
// 		</PatientHealthplans>
// 		<PatientDiagnosis>
// 			<diagnosisID>I10</diagnosisID>
// 			<diagnosisType>ICD10</diagnosisType>
// 			<onsetDate>20100101</onsetDate>
// 			<diagnosisName>Essential Hypertension</diagnosisName>
// 			<recordedDate>20100202</recordedDate>
// 		</PatientDiagnosis>
// 		<EncounterIdentifier>98be329fb593477eafbced8d1dad3b5d</EncounterIdentifier>
// 	</Patient>
// </NCScript>
// `;

const NC_XML = `<?xml version="1.0" encoding="utf-8"?>
<NCScript xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://secure.newcropaccounts.com/interfaceV7">
  <Credentials>
<partnerName>SatelliteHealth</partnerName>
<productName>SuperDuperSoftware</productName>
<productVersion>V5.3</productVersion>
</Credentials>
	<UserRole>
		<user>LicensedPrescriber</user>
		<role>doctor</role>
	</UserRole>
	<Destination>
		<requestedPage>compose</requestedPage>
	</Destination>
	<Account ID="1">
		<accountName>Spelling Family Clinics</accountName>
		<siteID>b59d529d28024129ae256ee3af5b086d</siteID>
		<AccountAddress>
			<address1>210 West Temple St</address1>
			<address2>Suite 101</address2>
			<city>Los Angeles</city>
			<state>CA</state>
			<zip>90012</zip>
			<zip4>1234</zip4>
			<country>US</country>
		</AccountAddress>
		<accountPrimaryPhoneNumber>2135551212</accountPrimaryPhoneNumber>
		<accountPrimaryFaxNumber>3235551313</accountPrimaryFaxNumber>
	</Account>
	<Location ID="9628b1e9ea38463bb29615bd106c4fd8">
		<locationName>Hills Clinica</locationName>
		<LocationAddress>
			<address1>123 Main</address1>
			<city>Beverly Hills</city>
			<state>CA</state>
			<zip>90210</zip>
			<country>US</country>
		</LocationAddress>
		<primaryPhoneNumber>2135451412</primaryPhoneNumber>
		<primaryFaxNumber>2135451489</primaryFaxNumber>
		<pharmacyContactNumber>2135451412</pharmacyContactNumber>
	</Location>
	<LicensedPrescriber ID="37fde454a8dd455e8afe16bc28626e7a">
		<LicensedPrescriberName>
			<last>Tam</last>
			<first>Simon</first>
			<suffix>MD</suffix>
		</LicensedPrescriberName>
		<dea>AT1895070</dea>
		<licenseState>CA</licenseState>
		<licenseNumber>784411</licenseNumber>
		<npi>1894111230</npi>
	</LicensedPrescriber>
	<Patient ID="aae2c1474a764020a876540b19a0ac25">
		<PatientName>
			<last>Delaplaine</last>
			<first>Zachary</first>
		</PatientName>
		<medicalRecordNumber>1234567890</medicalRecordNumber>
		<PatientAddress>
			<address1>901 Sauvblanc Blvd</address1>
			<city>Petaluma</city>
			<state>CA</state>
			<zip>94952</zip>
			<country>US</country>
		</PatientAddress>
		<PatientContact>
			<workTelephone>7135153221</workTelephone>
			<cellularTelephone>4123615658</cellularTelephone>
			<email>test@test.com</email>
		</PatientContact>
		<PatientCharacteristics>
			<dob>20101201</dob>
			<gender>M</gender>
			<height>51</height>
			<heightUnits>in</heightUnits>
			<weight>62</weight>
			<weightUnits>lb</weightUnits>
		</PatientCharacteristics>
		<PatientAllergies>
			<allergyID>245</allergyID>
			<allergyTypeID>FDB</allergyTypeID>
		</PatientAllergies>
		<PatientHealthplans>
			<healthplanID>12</healthplanID>
			<healthplanTypeID>Summary</healthplanTypeID>
		</PatientHealthplans>
		<PatientDiagnosis>
			<diagnosisID>I10</diagnosisID>
			<diagnosisType>ICD10</diagnosisType>
			<onsetDate>20100101</onsetDate>
			<diagnosisName>Essential Hypertension</diagnosisName>
			<recordedDate>20100202</recordedDate>
		</PatientDiagnosis>
		<EncounterIdentifier>98be329fb593477eafbced8d1dad3b5d</EncounterIdentifier>
	</Patient>
</NCScript>`;

// Helper: Get NewCrop token from backend
async function getNewCropToken() {
  try {
    const response = await axios.post("http://localhost:5000/api/newcrop-token");
    // console.log("Received token:", response.data.token);
    return response.data.token;
  } catch (error) {
    console.error("Error getting NewCrop token:", error);
    throw new Error("Failed to get NewCrop token");
  }
}

// Helper: Send XML to NewCrop via backend
async function sendNewCropXML(token, xml) {
  try {
    const response = await axios.post("http://localhost:5000/api/newcrop-xml", {
      xml,
      token
    });
    console.log("Response from NewCrop:", response.data);
    return response;
  } catch (error) {
    console.error("Error sending XML to NewCrop:", error);
    throw new Error("Failed to send XML");
  }
}

const DoctorDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Example data, replace with real data as needed
  const patients = [
    { id: 1, name: "John Doe", age: 32, gender: "Male", time: "10:00 AM", date: "2025-05-28" },
    { id: 2, name: "Jane Smith", age: 28, gender: "Female", time: "11:30 AM", date: "2025-05-28" },
  ];

  const handlePrescription = async (patient) => {
    setLoading(true);
    setError("");
    try {
      const token = await getNewCropToken();
      const response = await sendNewCropXML(token, NC_XML);
      // response.data may have .url or .html
      if (response.data) {
        setIframeUrl(response.data.url);
        setHtmlContent("");
        setModalOpen(true);
      } else if (response.data.html) {
        setHtmlContent(response.data.html);
        setIframeUrl("");
        setModalOpen(true);
      } else {
        setError("No URL or HTML returned from NewCrop.");
      }
    } catch (err) {
      setError(err.message || "Error sending prescription");
    } finally {
      setLoading(false);
    }
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
      {error && <div style={{color:'red'}}>{error}</div>}
      {loading && <div>Loading...</div>}
      <PrescriptionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        iframeUrl={iframeUrl}
        htmlContent={htmlContent}
      />
    </div>
  );
};

export default DoctorDashboard;
