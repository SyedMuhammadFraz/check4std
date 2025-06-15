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
    // address: "",
    primaryInsurance: "",
    secondaryInsurance: "",
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

  useEffect(() => {
    useLookupData([
      {
        type: "Gender",
        setter: setGenderOptions,
      },
    ]);
  }, []);
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
        <h2 className="modal-title">Add Patient</h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            name="name"
            placeholder={errors.name || "Patient Name"}
            className={`input ${errors.name ? "border-red-500" : ""}`}
            value={formData.name}
            onChange={handleChange}
          />
          <select
            name="gender"
            className={`input ${errors.gender ? "border-red-500" : ""}`}
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

          <input
            type="date"
            name="dob"
            className={`input ${errors.dob ? "border-red-500" : ""}`}
            value={formData.dob}
            onChange={handleChange}
            max={maxDate}
            placeholder={errors.dob || "Date of Birth"}
          />
          {/* <input
            type="text"
            name="age"
            placeholder="Age"
            className={`input ${errors.age ? "border-red-500" : ""}`}
            value={formData.age}
            onChange={handleChange}
          /> */}
          <input
            type="text"
            name="email"
            placeholder={errors.email || "Email"}
            className={`input ${errors.email ? "border-red-500" : ""}`}
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder={errors.phone || "Phone Number"}
            className={`input ${errors.phone ? "border-red-500" : ""}`}
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="primaryInsurance"
            placeholder="Primary Insurance (optional)"
            className="input"
            value={formData.primaryInsurance}
            onChange={handleChange}
          />
          <input
            type="text"
            name="secondaryInsurance"
            placeholder="Secondary Insurance (optional)"
            className="input"
            value={formData.secondaryInsurance}
            onChange={handleChange}
          />

          <button type="submit" className="modal-submit-button">
            Submit
          </button>
        </form>

        <button onClick={onClose} className="modal-close-button my-3">
          Close
        </button>
      </div>
    </div>
  );
}

export default AddPatient;
