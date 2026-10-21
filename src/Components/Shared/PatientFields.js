import React, { useEffect, useState } from "react";
import { webApiInstance } from "../../AxiosInstance";

// Patient details Quest needs on a test order, shared by signup and guest checkout:
// first / last name, sex and address. Email, phone and date of birth stay in each form.
export const EMPTY_PATIENT_FIELDS = {
  firstName: "",
  lastName: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

const ZIP_PATTERN = /^\d{5}(-\d{4})?$/;

export const validatePatientFields = (values) => {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = "First name is required.";
  if (!values.lastName.trim()) errors.lastName = "Last name is required.";
  if (!values.gender) errors.gender = "Sex is required.";
  if (!values.address.trim()) errors.address = "Address is required.";
  if (!values.city.trim()) errors.city = "City is required.";
  if (!values.state.trim()) errors.state = "State is required.";
  if (!ZIP_PATTERN.test(values.zip.trim())) errors.zip = "Use a ZIP code like 12345 or 12345-6789.";
  return errors;
};

// Same shape the backend expects (gender is the Gender lookup id).
export const patientFieldsPayload = (values) => ({
  firstName: values.firstName.trim(),
  lastName: values.lastName.trim(),
  gender: Number(values.gender),
  address: values.address.trim(),
  city: values.city.trim(),
  state: values.state.trim(),
  zip: values.zip.trim(),
});

const PatientFields = ({ values, onChange, errors = {}, idPrefix }) => {
  const [genderOptions, setGenderOptions] = useState([]);

  useEffect(() => {
    webApiInstance
      .get("/Lookup/get-by-type", { params: { type: "Gender" } })
      .then((response) => setGenderOptions(response.data.result || []))
      .catch((error) => console.error("Error fetching Gender lookup:", error));
  }, []);

  const field = (name, label, props = {}, className) => (
    <div className={className}>
      <label htmlFor={`${idPrefix}-${name}`}>{label}</label>
      <input
        id={`${idPrefix}-${name}`}
        name={name}
        value={values[name]}
        onChange={onChange}
        {...props}
      />
      {errors[name] && <p className="j-error">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      {field("firstName", "First name", { autoComplete: "given-name" })}
      {field("lastName", "Last name", { autoComplete: "family-name" })}
      <div>
        <label htmlFor={`${idPrefix}-gender`}>Sex</label>
        <select id={`${idPrefix}-gender`} name="gender" value={values.gender} onChange={onChange}>
          <option value="">Select</option>
          {genderOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.lookupValue}
            </option>
          ))}
        </select>
        {errors.gender && <p className="j-error">{errors.gender}</p>}
      </div>
      {field("address", "Street address", { autoComplete: "street-address" }, "j-full")}
      {field("city", "City", { autoComplete: "address-level2" })}
      {field("state", "State", { autoComplete: "address-level1" })}
      {field("zip", "ZIP code", { autoComplete: "postal-code", inputMode: "numeric" })}
    </>
  );
};

export default PatientFields;
