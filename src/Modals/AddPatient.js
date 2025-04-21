import React, { useState } from "react";
import "./AddPatient.css";

function AddPatient({ onClose }) {
  const [formData, setFormData] = useState({
    patientName: "",
    sex: "",
    dob: "",
    // age: "",
    address: "",
    phone: "",
    primaryInsurance: "",
    secondaryInsurance: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!formData.patientName) newErrors.patientName = "Required";
    if (!formData.sex) newErrors.sex = "Required";
    if (!formData.dob) newErrors.dob = "Required";
    // if (!formData.age || isNaN(formData.age)) newErrors.age = "Valid age required";
    if (!formData.address) newErrors.address = "Required";
    if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Invalid US phone number";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // You can now send formData to backend or handle it further
      console.log("Form submitted:", formData);
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
            name="patientName"
            placeholder="Patient Name"
            className={`input ${errors.patientName ? "border-red-500" : ""}`}
            value={formData.patientName}
            onChange={handleChange}
          />
          <select
            name="sex"
            className={`input ${errors.sex ? "border-red-500" : ""}`}
            value={formData.sex}
            onChange={handleChange}
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            type="date"
            name="dob"
            className={`input ${errors.dob ? "border-red-500" : ""}`}
            value={formData.dob}
            onChange={handleChange}
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
            name="address"
            placeholder="Address"
            className={`input ${errors.address ? "border-red-500" : ""}`}
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
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
