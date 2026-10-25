import {
  EMPTY_PATIENT_FIELDS,
  validatePatientFields,
  patientFieldsPayload,
} from "../Shared/PatientFields";

// Everything a guest enters on /patient-details (the person being tested).
export const EMPTY_GUEST_DETAILS = {
  ...EMPTY_PATIENT_FIELDS,
  email: "",
  phoneNumber: "",
  dob: "",
};

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_PATTERN = /^\(\d{3}\) \d{3}-\d{4}$/;

export const validateGuestDetails = (details) => {
  const errors = validatePatientFields({ ...EMPTY_GUEST_DETAILS, ...details });
  if (!EMAIL_PATTERN.test((details.email || "").trim())) errors.email = "Enter a valid email address.";
  if (!PHONE_PATTERN.test(details.phoneNumber || "")) errors.phoneNumber = "Use the format (123) 456-7890.";
  if (!details.dob) errors.dob = "Date of birth is required.";
  else if (details.dob >= new Date().toISOString().slice(0, 10))
    errors.dob = "Date of birth must be in the past.";
  return errors;
};

// The "customer" object the guest checkout endpoint expects.
export const guestCustomerPayload = (details) => ({
  ...patientFieldsPayload(details),
  email: details.email.trim(),
  phoneNumber: details.phoneNumber,
  dob: details.dob,
});
