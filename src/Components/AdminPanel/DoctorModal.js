import React from "react";

const DoctorModal = ({
  show,
  doctorData,
  handleChange,
  handleSaveDoctor,
  handleCancel,
  editIndex,
  error,
  professionLookup,
}) => {
  if (!show) return null;

  return (
    <div className="doctor-modal-overlay">
      <div className="doctor-modal-box">
        <h2>{editIndex !== null ? "Edit Doctor" : "Add Doctor"}</h2>

        <label>Name:</label>
        <input
          className="doctor-modal-input"
          type="text"
          name="name"
          value={doctorData.name}
          onChange={handleChange}
          required
        />

        <label>Profession:</label>
        <select
          className="doctor-modal-input"
          name="profession"
          value={doctorData.profession}
          onChange={handleChange}
        >
          <option value="All">All Professions</option>
          {professionLookup.map((profession) => (
            <option key={profession.id} value={profession.id}>
              {profession.lookupValue}
            </option>
          ))}
        </select>

        <label>Email:</label>
        <input
          className="doctor-modal-input"
          type="email"
          name="email"
          value={doctorData.email}
          onChange={handleChange}
          required
        />

        <label>DEA:</label>
        <input
          className="doctor-modal-input"
          type="text"
          name="dea"
          value={doctorData.dea}
          onChange={handleChange}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <div className="doctor-modal-actions">
          <button className="button3" onClick={handleSaveDoctor}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
          <button className="doctor-cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;
