import React from "react";
import ToggleAvailabilityIcon from "../common/ToggleAvailabilityIcon";
import DeleteTimeSlotIcon from "../common/DeleteTimeSlotIcon";

const TimeSlotsInfoModal = ({
  show,
  selectedDayInfo,
  toggleTimeSlotAvailability,
  removeTimeSlot,
  saveTimeSlotChanges,
  closeModal,
}) => {
  if (!show) return null;

  return (
    <div className="doctor-modal-overlay">
      <div className="doctor-modal-box">
        <h2>
          <strong>Time Slots for {selectedDayInfo.doctorName}</strong>
        </h2>
        <h3>Date: {selectedDayInfo.date}</h3>

        {selectedDayInfo.timeSlots && selectedDayInfo.timeSlots.length > 0 ? (
          <div className="time-slots-info-container">
            <table className="time-slots-table">
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Booking Status</th>
                  <th>Available Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedDayInfo.timeSlots.map((slot, idx) => (
                  <tr key={idx}>
                    <td>{slot.startTime || "N/A"}</td>
                    <td>{slot.endTime || "N/A"}</td>
                    <td>{slot.isBooked !== undefined ? slot.isBooked.toString() : "N/A"}</td>
                    <td>
                      <span className={`status-badge ${slot.statusName?.toLowerCase() || ""}`}>
                        {slot.statusName || "Unknown"}
                      </span>
                    </td>
                    <td>
                      <div className="btn-container">
                        <ToggleAvailabilityIcon onClick={() => toggleTimeSlotAvailability(idx)} />
                        <DeleteTimeSlotIcon
                        onClick={() => removeTimeSlot(idx)}
                        disabled={slot.isBooked === true}
                        title={slot.statusName === "Booked" ? "Booked slots cannot be deleted" : "Delete this time slot"}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No time slots available for this date.</p>
        )}

        <div className="doctor-modal-actions">
          <button className="button3" onClick={saveTimeSlotChanges}>
            Save Changes
          </button>
          <button className="doctor-cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotsInfoModal;
