import React from "react";

const TimeSlotModal = ({
  show,
  startTimeSlotInput,
  endTimeSlotInput,
  setStartTimeSlotInput,
  setEndTimeSlotInput,
  addTimeSlot,
  closeModal,
  error,
}) => {
  if (!show) return null;

  return (
    <div className="doctor-modal-overlay">
      <div className="doctor-modal-box">
        <h3>Add Time Slot</h3>

        <label>Select Start Time</label>
        <input
          name="startTime"
          className="doctor-modal-input"
          type="time"
          value={startTimeSlotInput}
          onChange={(e) => setStartTimeSlotInput(e.target.value)}
        />

        <label>Select End Time</label>
        <input
          name="endTime"
          className="doctor-modal-input"
          type="time"
          value={endTimeSlotInput}
          onChange={(e) => setEndTimeSlotInput(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        <div className="doctor-modal-actions">
          <button className="button3" onClick={addTimeSlot}>
            Add
          </button>
          <button
            className="doctor-cancel-button"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotModal;
