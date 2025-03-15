import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DoctorConsultation.css";

const doctors = [
  {
    id: 1,
    name: "Dr. Smith",
    specialty: "Cardiologist",
    availableDates: ["2025-03-20", "2025-03-22"],
    availableTimes: ["10:00 AM", "1:00 PM", "3:00 PM"],
  },
  {
    id: 2,
    name: "Dr. Jane",
    specialty: "Dermatologist",
    availableDates: ["2025-03-21", "2025-03-23"],
    availableTimes: ["9:30 AM", "12:00 PM", "4:30 PM"],
  },
  {
    id: 3,
    name: "Dr. John",
    specialty: "Orthopedic",
    availableDates: ["2025-03-20", "2025-03-21"],
    availableTimes: ["11:00 AM", "2:00 PM", "5:00 PM"],
  },
];

const DoctorConsultation = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");

  const formattedDate = date.toISOString().split("T")[0]; // Convert selected date to YYYY-MM-DD format

  const availableDoctors = doctors.filter((doctor) =>
    doctor.availableDates.includes(formattedDate)
  );

  useEffect(() => {
    if (availableDoctors.length === 0) {
      setSelectedDoctor(null);
    }
  }, [availableDoctors]);

  const handleAppointment = () => {
    if (!selectedDoctor || !patientName || !selectedTime) {
      alert("Please fill all fields!");
      return;
    }
    alert(
      `Appointment booked with ${
        selectedDoctor.name
      } on ${date.toDateString()} at ${selectedTime}`
    );
  };

  return (
    <div className="consultation-container">
      {/* Left Side - Calendar */}
      <div className="calendar-section">
        <h2 className="section-title">Select a Date</h2>
        {date && (
          <div className="selected-date-container">
            <p className="selected-date">
              Selected Date: {date.toLocaleDateString()}
            </p>
          </div>
        )}

        <Calendar className="styled-calendar" value={date} onChange={setDate} />
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
                <p>{doctor.specialty}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-doctor">No doctors available on this date.</p>
        )}

        {selectedDoctor && (
          <>
            <label className="input-label">Select a Time Slot:</label>
            <div className="time-slot-container">
              {selectedDoctor.availableTimes.map((time) => (
                <button
                  key={time}
                  className={`time-slot ${
                    selectedTime === time ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
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
          disabled={!selectedDoctor}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorConsultation;
