import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DoctorConsultation.css";
import { webApiInstance } from "../../../AxiosInstance";
import { AuthContext } from "../../../utils/AuthContext";
import { toast } from "react-toastify";

const DoctorConsultation = () => {
  const { authToken } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");

  // Fetching all doctors and their availability data

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await webApiInstance.get(
          "/Doctor/get-all-availbility"
        );

        // Convert API response to match required format
        const formattedDoctors = response.data.result.reduce(
          (acc, appointment) => {
            let existingDoctor = acc.find(
              (doc) => doc.id === appointment.doctorId
            );

            // Extract available (not booked) time slots for this specific appointment date
            const availableTimes = appointment.timeSlots
              .filter(
                (slot) => slot.statusName === "Available" && !slot.isBooked
              )
              .map((slot) => ({
                id: slot.id, // Store ID properly
                startTime: slot.startTime,
                endTime: slot.endTime,
              }));

            console.log(availableTimes);

            if (!existingDoctor) {
              // If doctor doesn't exist, create a new doctor entry
              existingDoctor = {
                id: appointment.doctorId,
                name:
                  appointment.doctorName !== "string"
                    ? appointment.doctorName
                    : `Doctor ${appointment.doctorId}`,
                // specialty: "Unknown", // Since specialty isn't provided in API
                availableDates: [], // Initialize empty array for dates
              };
              acc.push(existingDoctor);
            }

            // Ensure each date is unique and has separate time slots
            let existingDate = existingDoctor.availableDates.find(
              (d) => d.date === appointment.date
            );

            if (!existingDate) {
              // If the date doesn't exist, create a new entry for it
              existingDate = { date: appointment.date, times: [] };
              existingDoctor.availableDates.push(existingDate);
            }

            // Ensure only unique time slots are added to the correct date
            availableTimes.forEach((slot) => {
              if (!existingDate.times.some((s) => s.id === slot.id)) {
                existingDate.times.push(slot);
              }
            });

            console.log(existingDate.times);
            return acc;
          },
          []
        );

        const filteredDoctors = formattedDoctors.filter(
          (doctor) => doctor.availableDates.length > 0
        );
        setDoctors(filteredDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleTimeSlotSelection = (slot) => {
    console.log("Selected Slot:", slot);
    setSelectedTime({
      id: slot.id, // Store time slot ID
      time: `${slot.startTime} - ${slot.endTime}`, // Store time range
    });
  };

  const convertToAmPm = (timeRange) => {
    if (!timeRange.includes(" - ")) return timeRange; // Ensure valid format

    const [start, end] = timeRange.split(" - "); // Split "HH:MM - HH:MM"

    const formatTime = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return new Date(1970, 0, 1, hours, minutes).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  const formattedDate = selectedDate.toISOString().split("T")[0]; // Convert selected date to YYYY-MM-DD format

  const availableDoctors = doctors.filter((doctor) =>
    doctor.availableDates.some((d) => d.date === formattedDate)
  );

  useEffect(() => {
    if (availableDoctors.length === 0) {
      setSelectedDoctor(null);
    }
  }, [availableDoctors]);

  const handleAppointment = async () => {
    if (!selectedDoctor || !patientName || !selectedTime) {
      alert("Please fill all fields!");
      return;
    }

    try {
      console.log(selectedDoctor.id);
      console.log(selectedTime);
      const requestBody = {
        doctorId: selectedDoctor.id,
        timeSlotId: selectedTime.id, // Assuming timeSlot has an `id` field
        patientName: patientName,
      };

      const response = await webApiInstance.post(
        "/Doctor/add-appointment",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Response:", response.data);
      if (response.data.statusCode === 200) {
        toast.success(
          `Appointment successfully booked with ${
            selectedDoctor.name
          } on ${selectedDate.toDateString()} at ${selectedTime}`
        );
      } else {
        toast.error("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while booking the appointment.");
    }
  };

  return (
    <div className="consultation-container">
      {/* Left Side - Calendar */}
      <div className="calendar-section">
        <h2 className="section-title">Select a Date</h2>
        {selectedDate && (
          <div className="selected-date-container">
            <p className="selected-date">
              Selected Date: {selectedDate.toLocaleDateString()}
            </p>
          </div>
        )}

        <Calendar
          className="styled-calendar"
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      {/* Right Side - Doctor Selection & Booking */}
      <div className="booking-section">
        <h2 className="section-title">Book a Consultation</h2>

        <label className="input-label">Select Available Doctors:</label>
        {availableDoctors.length > 0 ? (
          <div className="doctor-list">
            {availableDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`doctor-card ${
                  selectedDoctor === doctor ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedDoctor(doctor);
                  setSelectedTime("");
                }}
              >
                <h3>{doctor.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-doctor">No doctors available on this date.</p>
        )}

        {selectedDoctor && selectedDate && (
          <>
            <label className="input-label">Select a Time Slot:</label>
            <div className="time-slot-container">
              {selectedDoctor.availableDates
                .find((dateObj) => dateObj.date === formattedDate)
                ?.times.sort(
                  (a, b) =>
                    new Date(`1970-01-01T${a.startTime}`) -
                    new Date(`1970-01-01T${b.startTime}`)
                ).length > 0 ? (
                // Show time slots if available
                selectedDoctor.availableDates
                  .find((dateObj) => dateObj.date === formattedDate)
                  ?.times.sort(
                    (a, b) =>
                      new Date(`1970-01-01T${a.startTime}`) -
                      new Date(`1970-01-01T${b.startTime}`)
                  )
                  .map((slot) => (
                    <button
                      key={slot.id}
                      className={`time-slot ${
                        selectedTime?.id === slot.id ? "selected" : ""
                      }`}
                      onClick={() => handleTimeSlotSelection(slot)}
                    >
                      {convertToAmPm(slot.startTime)} -{" "}
                      {convertToAmPm(slot.endTime)}
                    </button>
                  ))
              ) : (
                // Display message if no time slots are available
                <p className="no-doctor">
                  No time slots avialable for this date and doctor.
                </p>
              )}
            </div>
          </>
        )}

        <label className="input-label">Enter Patient Name:</label>
        <input
          className="styled-input"
          type="text"
          placeholder="Enter your name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <button
          className="book-button"
          onClick={handleAppointment}
          disabled={!selectedDoctor || !selectedTime} // Disable if no doctor or time slot is selected
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorConsultation;
