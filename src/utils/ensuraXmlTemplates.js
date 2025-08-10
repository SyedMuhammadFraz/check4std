// Doctor XML template
const doctorXml = `<?xml version="1.0" encoding="utf-8"?>
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
		</LicensedPrescriberName>
		<dea>AT1895070</dea>
	</LicensedPrescriber>
	<Patient ID="aae2c1474a764020a876540b19a0ac25">
		<PatientName>
			<last>Delaplaine</last>
			<first>Zachary</first>
		</PatientName>
		<PatientAddress>
			<address1>901 Sauvblanc Blvd</address1>
			<city>Petaluma</city>
			<state>CA</state>
			<zip>94952</zip>
			<country>US</country>
		</PatientAddress>
		<PatientContact>
			<cellularTelephone>4123615658</cellularTelephone>
			<email>test@test.com</email>
		</PatientContact>
		<PatientCharacteristics>
			<dob>20101201</dob>
			<gender>M</gender>
		</PatientCharacteristics>
	</Patient>
</NCScript>`;

// Nurse XML template
const nurseXml = `<?xml version='1.0' encoding='utf-8'?>
<NewCropData>
  <UserType>Nurse</UserType>
  <Patient>
    <Name>Jane Smith</Name>
    <DOB>1995-02-02</DOB>
  </Patient>
  <Prescription>
    <Drug>Ibuprofen</Drug>
    <Dosage>200mg</Dosage>
  </Prescription>
</NewCropData>`;

// Generate a doctor XML by replacing only the dynamic fields in the template
function generateDoctorXml({
  accountId = "DUMMY_ACCOUNT_ID",
  accountName = "DUMMY_ACCOUNT_NAME",
  siteID = "DUMMY_SITE_ID",
  accountAddress1 = "DUMMY_ACCOUNT_ADDRESS1",
  accountAddress2 = "DUMMY_ACCOUNT_ADDRESS2",
  accountCity = "DUMMY_ACCOUNT_CITY",
  accountState = "DUMMY_ACCOUNT_STATE",
  accountZip = "DUMMY_ACCOUNT_ZIP",
  accountZip4 = "DUMMY_ACCOUNT_ZIP4",
  accountCountry = "DUMMY_ACCOUNT_COUNTRY",
  accountPhone = "DUMMY_ACCOUNT_PHONE",
  accountFax = "DUMMY_ACCOUNT_FAX",
  locationId = "DUMMY_LOCATION_ID",
  locationName = "DUMMY_LOCATION_NAME",
  locationAddress1 = "DUMMY_LOCATION_ADDRESS1",
  locationCity = "DUMMY_LOCATION_CITY",
  locationState = "DUMMY_LOCATION_STATE",
  locationZip = "DUMMY_LOCATION_ZIP",
  locationCountry = "DUMMY_LOCATION_COUNTRY",
  locationPhone = "DUMMY_LOCATION_PHONE",
  locationFax = "DUMMY_LOCATION_FAX",
  pharmacyContact = "DUMMY_PHARMACY_CONTACT",
  prescriberId = "DUMMY_PRESCRIBER_ID",
  prescriberLast = "DUMMY_PRESCRIBER_LAST",
  prescriberFirst = "DUMMY_PRESCRIBER_FIRST",
  prescriberDEA = "DUMMY_PRESCRIBER_DEA",
  patientId = "DUMMY_PATIENT_ID",
  patientLast = "DUMMY_PATIENT_LAST",
  patientFirst = "DUMMY_PATIENT_FIRST",
  patientAddress1 = "DUMMY_PATIENT_ADDRESS1",
  patientCity = "DUMMY_PATIENT_CITY",
  patientState = "DUMMY_PATIENT_STATE",
  patientZip = "DUMMY_PATIENT_ZIP",
  patientCountry = "DUMMY_PATIENT_COUNTRY",
  patientCell = "DUMMY_PATIENT_CELL",
  patientEmail = "DUMMY_PATIENT_EMAIL",
  patientDOB = "DUMMY_PATIENT_DOB",
  patientGender = "F"
} = {}) {
  return `<?xml version="1.0" encoding="utf-8"?>
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
	<Account ID="${accountId}">
		<accountName>${accountName}</accountName>
		<siteID>${siteID}</siteID>
		<AccountAddress>
			<address1>${accountAddress1}</address1>
			<address2>${accountAddress2}</address2>
			<city>${accountCity}</city>
			<state>${accountState}</state>
			<zip>${accountZip}</zip>
			<zip4>${accountZip4}</zip4>
			<country>${accountCountry}</country>
		</AccountAddress>
		<accountPrimaryPhoneNumber>${accountPhone}</accountPrimaryPhoneNumber>
		<accountPrimaryFaxNumber>${accountFax}</accountPrimaryFaxNumber>
	</Account>
	<Location ID="${locationId}">
		<locationName>${locationName}</locationName>
		<LocationAddress>
			<address1>${locationAddress1}</address1>
			<city>${locationCity}</city>
			<state>${locationState}</state>
			<zip>${locationZip}</zip>
			<country>${locationCountry}</country>
		</LocationAddress>
		<primaryPhoneNumber>${locationPhone}</primaryPhoneNumber>
		<primaryFaxNumber>${locationFax}</primaryFaxNumber>
		<pharmacyContactNumber>${pharmacyContact}</pharmacyContactNumber>
	</Location>
	<LicensedPrescriber ID="${prescriberId}">
		<LicensedPrescriberName>
			<last>${prescriberLast}</last>
			<first>${prescriberFirst}</first>
		</LicensedPrescriberName>
		<dea>${prescriberDEA}</dea>
	</LicensedPrescriber>
	<Patient ID="${patientId}">
		<PatientName>
			<last>${patientLast}</last>
			<first>${patientFirst}</first>
		</PatientName>
		<PatientAddress>
			<address1>${patientAddress1}</address1>
			<city>${patientCity}</city>
			<state>${patientState}</state>
			<zip>${patientZip}</zip>
			<country>${patientCountry}</country>
		</PatientAddress>
		<PatientContact>
			<cellularTelephone>${patientCell}</cellularTelephone>
			<email>${patientEmail}</email>
		</PatientContact>
		<PatientCharacteristics>
			<dob>${patientDOB}</dob>
			<gender>${patientGender}</gender>
		</PatientCharacteristics>
	</Patient>
</NCScript>`;
}

export { doctorXml, nurseXml, generateDoctorXml };
