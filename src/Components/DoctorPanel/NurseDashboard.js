import React from "react";
import AppointmentDashboard from "../Shared/AppointmentDashboard";
import DoctorApis from "../../utils/DoctorApis";
import { generateDoctorXml } from "../../utils/ensuraXmlTemplates";
import { getNameFromAuthToken } from "../../utils/AuthContext";

const NurseDashboard = () => {
  return (
    <AppointmentDashboard
      fetchDataFn={DoctorApis.getNurseAppointmentsGraphQL}
      getPrescriberName={getNameFromAuthToken}
      generateXmlFn={generateDoctorXml}
      getPrescriptionTokenFn={DoctorApis.getPrescriptionPageToken}
      roleLabel="Nurse Dashboard"
    />
  );
};

export default NurseDashboard;
