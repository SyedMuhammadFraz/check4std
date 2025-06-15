import React, { useState } from "react";

function DoctorForm() {
  const [formData, setFormData] = useState({
    partnerName: "",
    productName: "",
    productVersion: "",
    user: "LicensedPrescriber",
    role: "doctor",
    requestedPage: "compose",
    accountID: "",
    accountName: "",
    siteID: "",
    accountAddress1: "",
    accountAddress2: "",
    accountCity: "",
    accountState: "",
    accountZip: "",
    accountZip4: "",
    accountCountry: "US",
    accountPrimaryPhoneNumber: "",
    accountPrimaryFaxNumber: "",
    locationID: "",
    locationName: "",
    locationAddress1: "",
    locationAddress2: "",
    locationCity: "",
    locationState: "",
    locationZip: "",
    locationZip4: "",
    locationCountry: "US",
    locationPrimaryPhoneNumber: "",
    locationPrimaryFaxNumber: "",
    pharmacyContactNumber: "",
    prescriberID: "",
    prescriberLast: "",
    prescriberFirst: "",
    prescriberMiddle: "",
    dea: "",
    licenseState: "",
    licenseNumber: "",
    npi: "",
    patientID: "",
    patientLast: "",
    patientFirst: "",
    patientMiddle: "",
    medicalRecordNumber: "",
    memo: "",
    patientAddress1: "",
    patientAddress2: "",
    patientCity: "",
    patientState: "",
    patientZip: "",
    patientCountry: "US",
    homeTelephone: "",
    dob: "",
    gender: ""
  });
  const [xml, setXml] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const buildXml = () => {
    return `<?xml version="1.0"?>\n<NCScript xmlns=\"http://secure.newcropaccounts.com/interfaceV7\" xmlns:NCStandard=\"http://secure.newcropaccounts.com/interfaceV7:NCStandard\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n<Credentials>\n<partnerName>${formData.partnerName}</partnerName>\n<productName>${formData.productName}</productName>\n<productVersion>${formData.productVersion}</productVersion>\n</Credentials>\n<UserRole>\n<user>${formData.user}</user>\n<role>${formData.role}</role>\n</UserRole>\n<Destination>\n<requestedPage>${formData.requestedPage}</requestedPage>\n</Destination>\n<Account ID="${formData.accountID}">\n<accountName>${formData.accountName}</accountName>\n<siteID>${formData.siteID}</siteID>\n<AccountAddress>\n<address1>${formData.accountAddress1}</address1>\n<address2>${formData.accountAddress2}</address2>\n<city>${formData.accountCity}</city>\n<state>${formData.accountState}</state>\n<zip>${formData.accountZip}</zip>\n<zip4>${formData.accountZip4}</zip4>\n<country>${formData.accountCountry}</country>\n</AccountAddress>\n<accountPrimaryPhoneNumber>${formData.accountPrimaryPhoneNumber}</accountPrimaryPhoneNumber>\n<accountPrimaryFaxNumber>${formData.accountPrimaryFaxNumber}</accountPrimaryFaxNumber>\n</Account>\n<Location ID="${formData.locationID}">\n<locationName>${formData.locationName}</locationName>\n<LocationAddress>\n<address1>${formData.locationAddress1}</address1>\n<address2>${formData.locationAddress2}</address2>\n<city>${formData.locationCity}</city>\n<state>${formData.locationState}</state>\n<zip>${formData.locationZip}</zip>\n<zip4>${formData.locationZip4}</zip4>\n<country>${formData.locationCountry}</country>\n</LocationAddress>\n<primaryPhoneNumber>${formData.locationPrimaryPhoneNumber}</primaryPhoneNumber>\n<primaryFaxNumber>${formData.locationPrimaryFaxNumber}</primaryFaxNumber>\n<pharmacyContactNumber>${formData.pharmacyContactNumber}</pharmacyContactNumber>\n</Location>\n<LicensedPrescriber ID="${formData.prescriberID}">\n<LicensedPrescriberName>\n<last>${formData.prescriberLast}</last>\n<first>${formData.prescriberFirst}</first>\n<middle>${formData.prescriberMiddle}</middle>\n</LicensedPrescriberName>\n<dea>${formData.dea}</dea>\n<licenseState>${formData.licenseState}</licenseState>\n<licenseNumber>${formData.licenseNumber}</licenseNumber>\n<npi>${formData.npi}</npi>\n</LicensedPrescriber>\n<Patient ID="${formData.patientID}">\n<PatientName>\n<last>${formData.patientLast}</last>\n<first>${formData.patientFirst}</first>\n<middle>${formData.patientMiddle}</middle>\n</PatientName>\n<medicalRecordNumber>${formData.medicalRecordNumber}</medicalRecordNumber>\n<memo>${formData.memo}</memo>\n<PatientAddress>\n<address1>${formData.patientAddress1}</address1>\n<address2>${formData.patientAddress2}</address2>\n<city>${formData.patientCity}</city>\n<state>${formData.patientState}</state>\n<zip>${formData.patientZip}</zip>\n<country>${formData.patientCountry}</country>\n</PatientAddress>\n<PatientContact>\n<homeTelephone>${formData.homeTelephone}</homeTelephone>\n</PatientContact>\n<PatientCharacteristics>\n<dob>${formData.dob}</dob>\n<gender>${formData.gender}</gender>\n</PatientCharacteristics>\n</Patient>\n</NCScript>`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const xmlPayload = buildXml();
    setXml(xmlPayload);
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content1">
        <h2 className="modal-title">Doctor Form (NewCrop XML)</h2>
        <form onSubmit={handleSubmit} className="space-y-2" style={{maxHeight:'60vh',overflowY:'auto'}}>
          {/* Only a subset of fields shown for brevity. Add all fields as needed. */}
          <input name="partnerName" placeholder="Partner Name" value={formData.partnerName} onChange={handleChange} className="input" />
          <input name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} className="input" />
          <input name="productVersion" placeholder="Product Version" value={formData.productVersion} onChange={handleChange} className="input" />
          <input name="accountID" placeholder="Account ID" value={formData.accountID} onChange={handleChange} className="input" />
          <input name="accountName" placeholder="Account Name" value={formData.accountName} onChange={handleChange} className="input" />
          <input name="siteID" placeholder="Site ID" value={formData.siteID} onChange={handleChange} className="input" />
          <input name="accountAddress1" placeholder="Account Address 1" value={formData.accountAddress1} onChange={handleChange} className="input" />
          <input name="accountAddress2" placeholder="Account Address 2" value={formData.accountAddress2} onChange={handleChange} className="input" />
          <input name="accountCity" placeholder="Account City" value={formData.accountCity} onChange={handleChange} className="input" />
          <input name="accountState" placeholder="Account State" value={formData.accountState} onChange={handleChange} className="input" />
          <input name="accountZip" placeholder="Account Zip" value={formData.accountZip} onChange={handleChange} className="input" />
          <input name="accountZip4" placeholder="Account Zip4" value={formData.accountZip4} onChange={handleChange} className="input" />
          <input name="accountPrimaryPhoneNumber" placeholder="Account Primary Phone" value={formData.accountPrimaryPhoneNumber} onChange={handleChange} className="input" />
          <input name="accountPrimaryFaxNumber" placeholder="Account Primary Fax" value={formData.accountPrimaryFaxNumber} onChange={handleChange} className="input" />
          {/* Add all other fields as needed, following the XML structure */}
          <button type="submit" className="modal-submit-button">Submit</button>
        </form>
        {submitted && (
          <div style={{marginTop:20}}>
            <h3>Generated XML:</h3>
            <pre style={{maxHeight:200,overflow:'auto',background:'#eee',padding:10}}>{xml}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorForm;
