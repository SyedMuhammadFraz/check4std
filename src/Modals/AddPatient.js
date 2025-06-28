import React, { useEffect, useState, useContext } from "react";
import "./AddPatient.css";
import { webApiInstance } from "../AxiosInstance";
import { toast } from "react-toastify";
import { useLookupData } from "../utils/GenderLookup";
import { AuthContext } from "../utils/AuthContext";

function AddPatient({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    phone: "",
    dob: "",
    primaryInsurance: "",
    secondaryInsurance: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const { authToken } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [genderOptions, setGenderOptions] = useState([]);

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    // if (!formData.age || isNaN(formData.age)) newErrors.age = "Valid age required";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Use valid phone number format (e.g., (123) 456-7890.";

    return newErrors;
  };

  useLookupData([
    {
      type: "Gender",
      setter: setGenderOptions,
    },
  ]);
  // useEffect(() => {
  // }, []);
  const todayMinus18 = new Date();
  todayMinus18.setFullYear(todayMinus18.getFullYear() - 18);
  const maxDate = todayMinus18.toISOString().split("T")[0];
  const handleGenderChange = (e) => {
    const { name, value } = e.target;

    if (name === "gender") {
      const selectedGender = genderOptions.find((g) => g.id === Number(value));
      setFormData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[name]) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        await webApiInstance.post("/Patient", formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        toast.success("Patient added successfully!");
      } catch (error) {
        console.error("Error adding patient:", error);
        toast.error("Failed to add patient. Please try again.");
      }
      onClose(); // Optionally close modal on successful submit
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content1">
        <div className="px-patient-registration-form px-form-fade-in">
          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="px-section-divider">
              <h3 className="px-section-heading">Personal Information</h3>
            </div>

            {/* Name and Gender Row */}
            <div className="px-form-grid-dual">
              <input
                type="text"
                name="name"
                placeholder={errors.name || "Patient Name"}
                className={`px-text-field ${
                  errors.name ? "px-field-error" : ""
                }`}
                value={formData.name}
                onChange={handleChange}
              />
              <select
                name="gender"
                className={`px-dropdown-select ${
                  errors.gender ? "px-field-error" : ""
                }`}
                value={formData.gender}
                onChange={handleGenderChange}
              >
                <option value="" disabled>
                  -- Select Gender --
                </option>
                {genderOptions.map((gender) => (
                  <option key={gender.id} value={gender.id}>
                    {gender.lookupValue}
                  </option>
                ))}
              </select>
            </div>

            {/* Date of Birth and Email Row */}
            <div className="px-form-grid-dual">
              <input
                type="date"
                name="dob"
                className={`px-text-field px-date-picker ${
                  errors.dob ? "px-field-error" : ""
                }`}
                value={formData.dob}
                onChange={handleChange}
                max={maxDate}
                placeholder={errors.dob || "Date of Birth"}
              />
              <input
                type="email"
                name="email"
                placeholder={errors.email || "Email Address"}
                className={`px-text-field ${
                  errors.email ? "px-field-error" : ""
                }`}
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone and Primary Insurance Row */}
            <div className="px-form-grid-dual">
              <input
                type="tel"
                name="phone"
                placeholder={errors.phone || "Phone Number"}
                className={`px-text-field ${
                  errors.phone ? "px-field-error" : ""
                }`}
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="primaryInsurance"
                placeholder="Primary Insurance (optional)"
                className="px-text-field"
                value={formData.primaryInsurance}
                onChange={handleChange}
              />
            </div>

            {/* Secondary Insurance - Full Width */}
            <div className="px-form-grid-single">
              <input
                type="text"
                name="secondaryInsurance"
                placeholder="Secondary Insurance (optional)"
                className="px-text-field"
                value={formData.secondaryInsurance}
                onChange={handleChange}
              />
            </div>

            {/* Address Section */}
            <div className="px-section-divider">
              <h3 className="px-section-heading">Address Information</h3>
            </div>

            {/* Address - Full Width */}
            <div className="px-form-grid-single">
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                className="px-text-field"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* City, State, ZIP Row */}
            <div className="px-form-grid-triple">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="px-text-field"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="px-text-field"
                value={formData.state}
                onChange={handleChange}
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                className="px-text-field"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>

            {/* Country - Full Width */}
            <div className="px-form-grid-single">
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="px-text-field"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="px-submit-primary">
              Create Patient Record
            </button>
          </form>

          {/* Close Button */}
          <button onClick={onClose} className="px-cancel-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPatient;
