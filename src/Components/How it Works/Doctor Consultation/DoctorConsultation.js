import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../Journey/journey.css";
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
  const today = new Date();
  // Fetching all doctors and their availability data

  const handleTimeSlotSelection = (slot) => {
    console.log("Selected Slot:", slot);
    setSelectedTime({
      id: slot.id, // Store time slot ID
      time: `${slot.startTime} - ${slot.endTime}` // Store time range
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
  const availableDoctors = doctors.filter((doctor) =>
    doctor.availableDates.some((d) => d.date === formattedDate)
  );

  useEffect(() => {
    if (availableDoctors.length === 0) {
      setSelectedDoctor(null);
    }
  }, [availableDoctors]);

  const handleAppointment = async () => {
    if (!selectedTime) {
      alert("Please select a time slot!");
      return;
    }
    try {
      setLoading(true);
      const requestBody = {
        doctorId: selectedTime.doctorId,
        timeSlotId: selectedTime.id
      };
      if(!authToken){
        toast.error("You need to login to book appointment")
      }
      console.log(requestBody)
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
          `Appointment successfully booked with on ${selectedDate.toDateString()} at ${selectedTime.startTime} - ${selectedTime.endTime}`
        );
      } else {
        toast.error("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred while booking the appointment.", error);

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

            if (!existingDoctor) {
              // If doctor doesn't exist, create a new doctor entry
              existingDoctor = {
                id: appointment.doctorId,
                name:
                  appointment.doctorName !== "string"
                    ? appointment.doctorName
                    : `Doctor ${appointment.doctorId}`,
                availableDates: [], // Initialize empty array for dates
              };
              acc.push(existingDoctor);
            }


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

  const availableSlots = doctors
    .flatMap(
      (doctor) =>
        doctor.availableDates
          .find((d) => d.date === formattedDate)
          ?.times.map((slot) => ({ ...slot, doctorId: doctor.id })) || []
    )
    .sort(
      (a, b) =>
        new Date(`1970-01-01T${a.startTime}`) - new Date(`1970-01-01T${b.startTime}`)
    );

  return (
    <section className="sh-journey">
      <p className="j-notice">
        Availability, provider details and pricing are confirmed before your appointment is booked.
      </p>
      <div className="j-shell">
        <div className="j-eyebrow">SATELLITE HEALTH · DOCTOR CONSULTATION</div>
        <h1 className="j-title">Talk with a clinician.</h1>
        <p className="j-intro">
          Discuss testing, review a result, or ask about next steps. Pick a date and a time that
          works for you.
        </p>

        <div className="j-summary">
          <span>
            Doctor consultation
            <br />
            <small>{selectedDate ? selectedDate.toDateString() : "No date selected"}</small>
          </span>
          <strong>
            {selectedTime
              ? `${convertToAmPm(selectedTime.startTime)} - ${convertToAmPm(
                  selectedTime.endTime
                )}`
              : "No time selected"}
          </strong>
        </div>

        <div className="j-booking-layout">
          <div className="j-panel">
            <span className="j-tag">STEP 1</span>
            <h2 className="j-panel-title">Choose a date</h2>
            <Calendar
              value={selectedDate}
              onChange={handleDateChange}
              minDate={new Date(today.setDate(today.getDate() + 1))}
            />
          </div>

          <div className="j-panel">
            <span className="j-tag">STEP 2</span>
            <h2 className="j-panel-title">Choose a time slot</h2>
            {availableSlots.length > 0 ? (
              <div className="j-chips">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    className={`j-chip ${selectedTime?.id === slot.id ? "is-chosen" : ""}`}
                    aria-pressed={selectedTime?.id === slot.id}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {convertToAmPm(slot.startTime)} - {convertToAmPm(slot.endTime)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="j-hint">No time slots are available for this date.</p>
            )}

            <p className="j-hint">
              Appointments open from tomorrow. Choose another date if nothing suits you here.
            </p>

            <button
              type="button"
              className="j-button j-pay-button"
              onClick={handleAppointment}
              disabled={loading || !selectedTime}
            >
              {loading ? "Booking…" : "Book appointment"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorConsultation;