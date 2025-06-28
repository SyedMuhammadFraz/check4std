import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DoctorConsultation.css";
import { webApiInstance } from "../../../AxiosInstance";
import { AuthContext } from "../../../utils/AuthContext";
import { toast } from "react-toastify";
import { useLoader } from "../../../utils/LoaderContext";

const DoctorConsultation = () => {
  const { authToken } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const { setLoading, loading } = useLoader();

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await webApiInstance.get("/Patient", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setPatients(response.data.result); // Assuming this is the response format
      } catch (error) {
        toast.error("Failed to fetch patients.");
      }
    };

    fetchPatients();
  }, []);

  // Fetching all doctors and their availability data

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

  const getLocalDateString = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedDate = getLocalDateString(selectedDate);

  // const formattedDate = selectedDate.toISOString().split("T")[0];
  console.log("Selected Date:", selectedDate);
  console.log("Formatted Date:", formattedDate);
  const availableDoctors = doctors.filter((doctor) =>
    doctor.availableDates.some((d) => d.date === formattedDate)
  );

  useEffect(() => {
    if (availableDoctors.length === 0) {
      setSelectedDoctor(null);
    }
  }, [availableDoctors]);

  const handleAppointment = async () => {
    if (!selectedPatient || !selectedTime) {
      alert("Please select all fields!");
      return;
    }
    try {
      setLoading(true);
      const requestBody = {
        doctorId: selectedTime.doctorId,
        timeSlotId: selectedTime.id,
        patientId: selectedPatient.patientId,
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

      if (response.data.statusCode === 200) {
        
        toast.success(
          `Appointment successfully booked with on ${selectedDate.toDateString()} at ${
            selectedTime.startTime
          } - ${selectedTime.endTime}`
        );
      } else {
        toast.error("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while booking the appointment.");
    }
    finally{
      setLoading(false)
    }
  };

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
            console.log("Existing Dates ", existingDoctor.availableDates);

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

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  // Normalizing the date format to YYYY-MM-DD
  const handleDateChange = (date) => {
    // Normalize to local date (avoids timezone offset)
    const localDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    setSelectedDate(localDate);
  };

  return (
    <div className="consultation-container">
      {/* Left Side - Calendar */}
      <div className="calendar-section">
        <h2 className="section-title">Select a Date</h2>
        {selectedDate && (
          <div className="selected-date-container">
            <p className="selected-date">
              Selected Date: {selectedDate.toDateString()}
            </p>
          </div>
        )}

        <Calendar
          className="styled-calendar"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {/* Right Side - Doctor Selection & Booking */}
      <div className="booking-section">
        {/* <h2 className="section-title">Book a Consultation</h2>

        <label className="input-label">Select Available Doctors:</label> */}
        {/* {availableDoctors.length > 0 ? (
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
        )} */}

        {selectedDate && (
          <>
            <label className="input-label">Select a Time Slot:</label>

            {(() => {
              const availableSlots = doctors
                .flatMap(
                  (doctor) =>
                    doctor.availableDates
                      .find((d) => d.date === formattedDate)
                      ?.times.map((slot) => ({
                        ...slot,
                        doctorId: doctor.id,
                      })) || []
                )
                .sort(
                  (a, b) =>
                    new Date(`1970-01-01T${a.startTime}`) -
                    new Date(`1970-01-01T${b.startTime}`)
                );

              return availableSlots.length > 0 ? (
                <div className="time-slot-container">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.id}
                      className={`time-slot ${
                        selectedTime?.id === slot.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedTime(slot)}
                    >
                      {convertToAmPm(slot.startTime)} -{" "}
                      {convertToAmPm(slot.endTime)}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="no-doctor">
                  No time slots available for this date.
                </p>
              );
            })()}
          </>
        )}

        <label className="input-label">Select a Patient:</label>
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>DOB</th>
                <th>Contact</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.dob}</td>
                  <td>{patient.email || patient.phone}</td>
                  <td>
                    <button
                      className="select-button"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedPatient && (
          <p style={{ marginTop: "10px" }}>
            Selected Patient: <strong>{selectedPatient.name}</strong>
          </p>
        )}

        <button
          className="book-button"
          onClick={handleAppointment}
          disabled={loading || !selectedTime || !selectedPatient}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </div>
  );
};

export default DoctorConsultation;
