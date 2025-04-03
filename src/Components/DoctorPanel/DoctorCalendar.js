import React, { useState, useEffect } from "react";
import "./DoctorCalendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { webApiInstance } from "../../AxiosInstance";
import { toast } from "react-toastify";

function DoctorCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("week");

  const locales = { "en-US": enUS };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  // Convert API response to calendar event format
  const transformDataToAppointments = (data) => {
    return data.flatMap((doctor) =>
      doctor.timeSlots
        .filter((slot) => slot.statusName === "Available" && !slot.isBooked) // Only include available and unbooked slots
        .map((slot) => {
          const dateParts = doctor.date.split("-");
          const year = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1; // JavaScript months are 0-based
          const day = parseInt(dateParts[2], 10);

          const [startHour, startMin, startSec] = slot.startTime
            .split(":")
            .map(Number);
          const [endHour, endMin, endSec] = slot.endTime.split(":").map(Number);

          return {
            title: `${doctor.doctorName} (${doctor.doctorProfession})`,
            start: new Date(year, month, day, startHour, startMin, startSec),
            end: new Date(year, month, day, endHour, endMin, endSec),
            doctorId: doctor.id, // Include doctor ID for filtering
          };
        })
    );
  };

  const getData = async () => {
    try {
      const response = await webApiInstance("/Doctor/get-all-availbility");
      if (response.data.statusCode === 200) {
        const doctorsList = response.data.result.map((doctor) => ({
          id: doctor.id,
          name: doctor.doctorName,
        }));
        setDoctors(doctorsList);
        const formattedAppointments = transformDataToAppointments(
          response.data.result
        );
        setAppointments(formattedAppointments);
      } else {
        toast.error("There was an error fetching the data. Please try again.");
      }
    } catch (err) {
      toast.error("There was an error fetching the data. Please try again.");
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter appointments by the selected doctor
  const filteredAppointments = selectedDoctor
    ? appointments.filter((event) => event.doctorId === selectedDoctor)
    : appointments;

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="Appointments">Doctor's Appointments</h2>

      {/* Dropdown for selecting doctor */}
      <select
        value={selectedDoctor}
        onChange={(e) => setSelectedDoctor(Number(e.target.value))}
        className="Doctor-DropDown"
      >
        <option value="">Select a doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>

      <Calendar
        localizer={localizer}
        events={filteredAppointments} // Use the filtered appointments
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        view={currentView}
        onNavigate={setCurrentDate}
        onView={setCurrentView}
        views={["month", "week", "day", "agenda"]}
        style={{ height: 500 }}
      />
    </div>
  );
}

export default DoctorCalendar;
