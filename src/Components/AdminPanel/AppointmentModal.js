import React from "react";

const AppointmentModal = ({
  show,
  doctors,
  appointmentData,
  handleAppointmentChange,
  handleBookAppointment,
  handleAppointmentCancelModal,
  editIndex,
  error,
}) => {
  if (!show) return null;

  return (
    <div className="doctor-modal-overlay">
      <div className="doctor-modal-box">
        <h2>Add Doctor Time Slot</h2>

        <label>Select Doctor/Nurse Practitioner:</label>
        <select
          className="doctor-modal-input"
          name="doctorName"
          value={appointmentData.doctorName}
          onChange={handleAppointmentChange}
          required
        >
          <option value="">Select a Doctor/Nurse Practitioner</option>
          {doctors.map((app, index) => (
            <option key={index} value={app.name}>
              {app.name} ({app.profession})
            </option>
          ))}
        </select>

        <label>Date:</label>
        <input
          className="doctor-modal-input"
          type="date"
          name="date"
          min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
          value={appointmentData.date}
          onChange={handleAppointmentChange}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <div className="doctor-modal-actions">
          <button className="button3" onClick={handleBookAppointment}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
          <button
            className="doctor-cancel-button"
            onClick={handleAppointmentCancelModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
