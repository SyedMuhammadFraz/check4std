// // Doctor XML template
// export const doctorXml = (
//   { doctorId, doctorFirstName, doctorLastName },
//   { patientId, patientFirstName, patientLastName }
// ) => { return `<?xml version="1.0" encoding="utf-8"?>
// <NCScript xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://secure.newcropaccounts.com/interfaceV7">
// 	<Credentials>
// 		<partnerName>SatelliteHealth</partnerName>
// 		<productName>SuperDuperSoftware</productName>
// 		<productVersion>V5.3</productVersion>
// 	</Credentials>
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
// 	<LicensedPrescriber ID="${doctorId}">
//     <LicensedPrescriberName>
//       <last>${doctorLastName}</last>
//       <first>${doctorFirstName}</first>
//     </LicensedPrescriberName>
//   </LicensedPrescriber>
//   <Patient ID="${patientId}">
//     <PatientName>
//       <last>${patientLastName}</last>
//       <first>${patientFirstName}</first>
//     </PatientName>
// 		<PatientAddress>
// 			<address1>901 Sauvblanc Blvd</address1>
// 			<city>Petaluma</city>
// 			<state>CA</state>
// 			<zip>94952</zip>
// 			<country>US</country>
// 		</PatientAddress>
// 		<PatientContact>
// 			<cellularTelephone>4123615658</cellularTelephone>
// 			<email>test@test.com</email>
// 		</PatientContact>
// 		<PatientCharacteristics>
// 			<dob>20101201</dob>
// 			<gender>M</gender>
// 		</PatientCharacteristics>
// 	</Patient>
// </NCScript>`;
// }




// // Nurse XML template
// const nurseXml = `<?xml version='1.0' encoding='utf-8'?>
// <NewCropData>
//   <UserType>Nurse</UserType>
//   <Patient>
//     <Name>Jane Smith</Name>
//     <DOB>1995-02-02</DOB>
//   </Patient>
//   <Prescription>
//     <Drug>Ibuprofen</Drug>
//     <Dosage>200mg</Dosage>
//   </Prescription>
// </NewCropData>`;


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

export { doctorXml, nurseXml };