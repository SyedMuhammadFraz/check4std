import React from "react";
import OpenTimeSlotIcon from "../common/OpenTimeSLotIcon";
import DeleteAppointmentIcon from "../common/DeleteAppointmentIcon";
import InfoIcon from "../common/InfoIcon";

const AppointmentTable = ({
  filteredAppointments,
  openTimeSlotModal,
  deleteAppointment,
  openTimeSlotsInfoModal,
}) => {
  return (
    <section className="Admin-Doctor-Table my-3">
      <h2><strong>Appointments Data</strong></h2>
      <table className="doctor-list-table">
        <thead>
          <tr>
            <th className="table-header">Doctor Name</th>
            <th className="table-header">Date</th>
            <th className="table-header">Time Slots</th>
            <th className="table-header">Actions</th>
            <th className="table-header">Info</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => {
            const hasTimeSlots = appointment.timeSlots?.length > 0;
            const isDeletable = !appointment.timeSlots?.some(
              (slot) => slot.availability === "Booked"
            );

            return (
              <tr key={appointment.id}>
                <td className="table-data">{appointment.doctorName}</td>
                <td className="table-data">{appointment.date}</td>
                <td className="table-data">
                  {hasTimeSlots ? `${appointment.timeSlots.length} time slots` : "No time slots"}
                </td>
                <td className="table-data">
                  <div className="appointment-table-svg">
                    <OpenTimeSlotIcon onClick={() => openTimeSlotModal(appointment.id)} />
                    <DeleteAppointmentIcon
                      onClick={() => deleteAppointment(appointment.id)}
                      disabled={!isDeletable}
                    />
                  </div>
                </td>
                <td className="table-data">
                  <InfoIcon
                    onClick={() =>
                      openTimeSlotsInfoModal(appointment.doctorName, appointment.date)
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default AppointmentTable;
