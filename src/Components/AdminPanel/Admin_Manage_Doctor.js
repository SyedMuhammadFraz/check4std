import React, { useState, useEffect, useContext } from "react";
import "./Admin_Manage_Doctor.css";
import AdminNavBar from "./AdminNavBar";
import { webApiInstance } from "../../AxiosInstance";
import { toast } from "react-toastify";
import { useLoader } from "../../utils/LoaderContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import DoctorTable from "./DoctorTable";
import DoctorModal from "./DoctorModal";
import TimeSlotModal from "./TimeSlotModal";
import TimeSlotsInfoModal from "./TimeSlotInfoModal";
import AppointmentModal from "./AppointmentModal";
import AppointmentTable from "./AppointmentTable";

const AdminManageDoctor = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
  const [showTimeSlotsInfoModal, setShowTimeSlotsInfoModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");
  // Filter statesque
  const [nameFilter, setNameFilter] = useState("");
  const [professionFilter, setProfessionFilter] = useState("All");
  const [emailFilter, setEmailFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [timeFilter, setTimeFilter] = useState({ start: "", end: "" });
  const [professionLookup, setProfessionLookup] = useState([]);
  const { setLoading } = useLoader();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  // Form inputs
  const [doctorData, setDoctorData] = useState({name: "", profession: "", email: "", dea: ""});
  const [appointmentData, setAppointmentData] = useState({doctorId: "", doctorName: "", date: "", timeSlots: []});
  const [startTimeSlotInput, setStartTimeSlotInput] = useState("");
  const [endTimeSlotInput, setEndTimeSlotInput] = useState("");
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(null);
  // Selected data for modals
  const [selectedDayInfo, setSelectedDayInfo] = useState({doctorName: "", date: "", timeSlots: []});

  useEffect(() => {
    setLoading(true);
    const fetchAppointments = async () => {
      try {
        const response = await webApiInstance.get(
          "/Doctor/get-all-availbility"
        );

        if (response.data.statusCode === 200) {
          const data = response.data.result;
          setAppointments(data);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(
            "There was an error fetching the data. Please try again."
          );
          navigate("/");
        }
      } catch (err) {
        toast.error("There was an error fetching the data. Please try again.");
        setLoading(false);
        navigate("/");
      }
    };

    fetchAppointments();
  }, []); 

  useEffect(() => {
    const FetchLookups = async () => {
      try {
        const professionResponse = await webApiInstance.get(
          "/Lookup/get-by-type",
          {
            params: { type: "Profession" },
          }
        );
        setProfessionLookup(professionResponse.data.result);
      } catch (error) {
        console.error("Error fetching lookup data:", error);
        setProfessionLookup([]);
      }
    };

    FetchLookups();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await webApiInstance.get("/Doctor"); // Replace with your API URL
        if (response.data.statusCode === 200) {
          setDoctors(response.data.result); // Assuming API returns an array
        } else {
          toast.error("Error fetching doctors");
          navigate("/");
        }
      } catch (err) {
        toast.error("Error fetching doctors");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []); // Runs only once on mount

  const updateAppointmentsAfterSlotRemoval = (dayInfo, removedSlotIndex) => {
    const appointmentToUpdate = appointments.find(
      (app) =>
        app.doctorName === dayInfo.doctorName && app.date === dayInfo.date
    );
    if (appointmentToUpdate) {
      // Update the time slots
      appointmentToUpdate.timeSlots = dayInfo.timeSlots;
      // If you need to update the state with the modified appointments
      setAppointments([...appointments]);
      // If you're using an API, make the update call here
      // saveAppointmentToAPI(appointmentToUpdate);
    }
  };

  // Handle opening the time slots info modal
  const openTimeSlotsInfoModal = (doctorName, date) => {
    const appointmentForDay = appointments.find(
      (app) => app.doctorName === doctorName && app.date === date
    );

    if (appointmentForDay) {
      setSelectedDayInfo({
        doctorName: appointmentForDay.doctorName,
        date: appointmentForDay.date,
        timeSlots: appointmentForDay.timeSlots || [],
      });
    } else {
      setSelectedDayInfo({
        doctorName: doctorName,
        date: date,
        timeSlots: [],
      });
    }
    setShowTimeSlotsInfoModal(true);
  };

  // Toggle availability for a time slot
  const toggleTimeSlotAvailability = (slotIndex) => {
    setSelectedDayInfo((prevInfo) => {
      const updatedTimeSlots = prevInfo.timeSlots.map((slot, index) => {
        if (index === slotIndex) {
          // Prevent changing status if the slot is booked
          if (slot.isBooked) {
            alert("Cannot change status of a booked time slot.");
            return slot;
          }

          // Toggle status
          const newStatus =
            slot.statusName === "Available" ? "Unavailable" : "Available";

          return { ...slot, statusName: newStatus, isToggled: true }; // Mark as toggled
        }
        return slot;
      });

      return { ...prevInfo, timeSlots: updatedTimeSlots };
    });
  };

  // Form change handlers
  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleToggleTimeSlot = (slotId) => {
    setSelectedDayInfo((prevInfo) => ({
      ...prevInfo,
      timeSlots: prevInfo.timeSlots.map((slot) =>
        slot.id === slotId ? { ...slot, isToggled: !slot.isToggled } : slot
      ),
    }));
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Modal handlers
  const openTimeSlotModal = (index) => {
    setSelectedAppointmentIndex(index);
    setShowTimeSlotModal(true);
  };

  // Save functions
  const saveTimeSlotChanges = async () => {
    try {
      // Extract the list of time slot IDs from selectedDayInfo.timeSlots
      const toggledTimeSlotIds = selectedDayInfo.timeSlots
        .filter((slot) => slot.isToggled) // Only send slots that were toggled
        .map((slot) => slot.id);

      if (toggledTimeSlotIds.length === 0) {
        toast.error("No time slots selected for update.");
        return;
      }

      // API request payload
      const payload = {
        timeSlotIds: toggledTimeSlotIds,
      };

      // Send the PUT request
      const response = await webApiInstance.put(
        "/Doctor/toggle-availbility-timeslots-status", // Replace with actual API endpoint
        payload
      );

      if (response.status === 200) {
        const updatedTimeSlots = selectedDayInfo.timeSlots.map((slot) => {
          const updatedSlot = response.data.result.find(
            (updated) => updated.id === slot.id
          );

          return updatedSlot
            ? { ...slot, statusName: updatedSlot.statusName }
            : slot;
        });

        // Update state with new time slot statuses
        setAppointments((prevAppointments) =>
          prevAppointments.map((app) =>
            app.doctorName === selectedDayInfo.doctorName &&
            app.date === selectedDayInfo.date
              ? { ...app, timeSlots: updatedTimeSlots }
              : app
          )
        );
        toast.success("Time slots status updated successfully!");
        setShowTimeSlotsInfoModal(false);
      } else {
        console.error("Failed to update time slots");
        toast.error("Error updating time slots. Please try again.");
      }
    } catch (error) {
      console.error("Error updating time slots:", error);
      toast.error("An error occurred while updating time slots.");
    }
  };

  const handleSaveDoctor = async () => {
    // Check if all fields are filled
    if (
      !doctorData.name ||
      !doctorData.email ||
      !doctorData.profession ||
      !doctorData.dea
    ) {
      setError("All fields are required.");
      return;
    }

    if (editIndex !== null) {
      const updatedDoctors = [...doctors];
      updatedDoctors[editIndex] = doctorData;
      setDoctors(updatedDoctors);
    } else {
      try {
        // setLoading(true);
        console.log({
          name: doctorData.name,
          profession: doctorData.profession,
          email: doctorData.email,
          dea: doctorData.dea,
        });
        const promise = webApiInstance.post(
          "/Doctor",
          {
            name: doctorData.name,
            profession: doctorData.profession,
            email: doctorData.email,
            dea: doctorData.dea,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const response = await toast.promise(promise, {
          pending: "Adding doctor and sending email...",
          success: "Email sent to the doctor successfully!",
          error: {
            render({ data }) {
              return (
                data?.response?.data?.message ||
                "There was an error. Please try again."
              );
            },
          },
        });

        if (response.data.statusCode === 200) {
          const newDoctor = response.data.result;
          setDoctors([...doctors, newDoctor]);
          setDoctorData({ name: "", profession: "", email: "", dea: "" });
          setShowDoctorModal(false);
          setError("");
        }
      } catch (error) {
        // Error already handled by toast.promise, no need to repeat
      } finally {
        // setLoading(false);
      }

      setEditIndex(null);
      // Reset fields & hide modal
      setDoctorData({
        name: "",
        profession: "",
        email: "",
        dea: "",
      });
      setShowDoctorModal(false);
      setError("");
    }
  };
  
  const handleBookAppointment = async () => {
    if (!appointmentData.doctorName || !appointmentData.date) {
      setError("All fields are required.");
      return;
    }

    const selectedDate = new Date(appointmentData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError("Date must be today or a future date.");
      return;
    }

    const selectedDoctor = doctors.find(
      (doc) => doc.name === appointmentData.doctorName
    );

    if (!selectedDoctor) {
      setError("Selected doctor not found.");
      return;
    }

    // Check if appointment for this doctor and date already exists
    const existingAppIndex = appointments.findIndex(
      (app) =>
        app.doctorName === appointmentData.doctorName &&
        app.date === appointmentData.date
    );

    if (existingAppIndex !== -1) {
      // Add time slot to existing appointment
      const updatedAppointments = [...appointments];
      // updatedAppointments[existingAppIndex].timeSlots.push(newTimeSlot);
      setAppointments(updatedAppointments);
    } else {
      const newAppointment = {
        doctorId: selectedDoctor.id,
        date: appointmentData.date,
      };

      try {
        setLoading(true);
        const response = await webApiInstance.post(
          "Doctor/add-availbility",
          newAppointment,
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Replace with actual token
            },
          }
        );
        if (response.data.statusCode === 200) {
          setAppointments([...appointments, response.data.result]); // Update state with API response
          toast.success("Data added successfully!");
        } else {
          toast.error("There was an error. Please try again");
        }
      } catch (err) {
        toast.error("There was an error. Please try again");
      } finally {
        setAppointmentData({
          doctorName: "",
          date: "",
        });
        setShowAppointmentModal(false);
        setError("");
        setLoading(false);
      }
    }
  };
  // Add a new time slot to an existing appointment
  const addTimeSlot = async () => {
    if (
      selectedAppointmentIndex !== null &&
      startTimeSlotInput &&
      endTimeSlotInput
    ) {
      const startTime = new Date(`1970-01-01T${startTimeSlotInput}`);
      const endTime = new Date(`1970-01-01T${endTimeSlotInput}`);
      const timeDiff = (endTime - startTime) / (1000 * 60);

      // Validate time slot duration (30 mins - 3 hours)
      if (timeDiff < 5 || timeDiff > 15) {
        setError("Time slot must be between 5 to 15 minutes.");
        return;
      }

      const updatedAppointments = [...appointments];
      const newIndex = updatedAppointments.findIndex(
        (app) => app.id === selectedAppointmentIndex
      );

      const newTimeSlot = {
        availbilityId: appointments[newIndex].id, // Assuming the appointment ID is used as availabilityId
        startTime: startTimeSlotInput,
        endTime: endTimeSlotInput,
      };

      // Check if new time slot conflicts with existing ones
      const isOverlap = updatedAppointments[newIndex].timeSlots.some((slot) =>
        checkOverlap(slot, newTimeSlot)
      );

      if (isOverlap) {
        setError("This time slot overlaps with an existing one.");
        return;
      }

      try {
        setLoading(true)
        // API request to save the time slot
        const response = await webApiInstance.post(
          "/Doctor/add-availbility-timeslot",
          newTimeSlot
        );

        if (response.status === 200) {
          const updatedAppointments = [...appointments];

          // Add the new time slot to the UI
          updatedAppointments[newIndex].timeSlots.push(newTimeSlot);
          setAppointments(updatedAppointments);

          // Clear inputs & errors
          setLoading(false);
          toast.success("Time slot added successfully!");
        } else {
          throw new Error("Failed to add time slot.");
        }
      } catch (error) {
        setError("Error adding time slot. Please try again.");
        console.error("API Error:", error);
      }

      setStartTimeSlotInput("");
      setEndTimeSlotInput("");
      setError("");
      setShowTimeSlotModal(false);
    }
  };

  const checkOverlap = (existingSlot, newSlot) => {
    const existingStart = convertToMinutes(existingSlot.startTime);
    const existingEnd = convertToMinutes(existingSlot.endTime);
    const newStart = convertToMinutes(newSlot.startTime);
    const newEnd = convertToMinutes(newSlot.endTime);

    return Math.max(existingStart, newStart) < Math.min(existingEnd, newEnd);
  };

  // Converts "HH:MM" to total minutes for easy comparison
  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Handlers for edit, delete, and modal actions

  const handleAppointmentDelete = (id) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
    setAppointments(updatedAppointments);
  };

  const deleteAppointment = (id) => {
    handleAppointmentDelete(id);
  };

  const removeTimeSlot = (slotIndex) => {
    // Show confirmation dialog before deletion
    if (
      window.confirm(
        "Are you sure you want to remove this time slot? This action cannot be undone."
      )
    ) {
      // Create a copy of the selected day info
      const updatedDayInfo = { ...selectedDayInfo };

      // Remove the time slot at the specified index
      updatedDayInfo.timeSlots.splice(slotIndex, 1);

      // Update the selectedDayInfo state
      setSelectedDayInfo(updatedDayInfo);

      // Update your data source (appointments, database, etc.)
      // This part will depend on how your data is structured
      // Option 1: If you're working with a local state:
      updateAppointmentsAfterSlotRemoval(updatedDayInfo, slotIndex);

      // Optional: Close modal or show notification
      // showNotification("Time slot successfully removed");
    }
  };

  const handleCancelModal = () => {
    setEditIndex(null);
    setDoctorData({
      name: "",
      profession: "",
      email: "",
    });
    setShowDoctorModal(false);
    setError("");
  };

  const handleDoctorEdit = (index) => {
    setDoctorData(doctors[index]);
    setEditIndex(index);
    setShowDoctorModal(true);
  };

  const handleAppointmentCancelModal = () => {
    setEditIndex(null);
    setAppointmentData({
      doctorName: "",
      date: "",
    });
    setShowAppointmentModal(false);
    setError("");
  };

  const handleDoctorDelete = (id) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id!=id);
    setDoctors(updatedDoctors);
  };

  // Filtering logic
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesName =
      nameFilter === "" ||
      doctor.name.toLowerCase().includes(nameFilter.toLowerCase());

    const matchesProfession =
      professionFilter === "All" || doctor.profession === professionFilter;

    const matchesEmail =
      emailFilter === "" ||
      doctor.email.toLowerCase().includes(emailFilter.toLowerCase());

    return matchesName && matchesProfession && matchesEmail;
  });

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesDoctor =
      doctorFilter === "" ||
      appointment.doctorName.toLowerCase().includes(doctorFilter.toLowerCase());

    // Skip availability check since it's now at the time slot level

    const matchesDate =
      (!dateFilter.from || appointment.date >= dateFilter.from) &&
      (!dateFilter.to || appointment.date <= dateFilter.to);

    // Skip time check since start/end times are now in time slots

    return matchesDoctor && matchesDate;
  });

  return (
    <>
      <AdminNavBar />
      <div className="admin-doctor-wrapper">
        <h1>
          <strong>Doctor / Nurse Practitioner Dashboard</strong>
        </h1>
        <div className="button-container">
          <button className="button3 " onClick={() => setShowDoctorModal(true)}>
            + Add Doctor / Nurse Practioner 
          </button>

          <button
            className="button2"
            onClick={() => setShowAppointmentModal(true)}
          >
            Add Doctor Time Slot
          </button>
        </div>

        {/* Doctor Filters Section */}
        <div className="doctor-filters">
          <input
            type="text"
            placeholder="Search by name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />

          <select
            value={professionFilter}
            onChange={(e) => setProfessionFilter(e.target.value)}
          >
            <option value="All">All Professions</option>
            <option value="nurse">Nurse Practitioner</option>
            <option value="doctor">Doctor</option>
          </select>

          <input
            type="text"
            placeholder="Search by email..."
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
        </div>

        {/* Doctor Table */}
        <DoctorTable doctors={filteredDoctors} onDelete={handleDoctorDelete}/>

        {/* Appointment Filters */}
        <div className="doctor-filters">
          <input
            type="text"
            placeholder="Search by doctor's name..."
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
          />

          <input
            type="date"
            placeholder="From date"
            onChange={(e) =>
              setDateFilter({ ...dateFilter, from: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="To date"
            onChange={(e) =>
              setDateFilter({ ...dateFilter, to: e.target.value })
            }
          />
        </div>

        {/* Appointments Table */}
        <AppointmentTable
          filteredAppointments={filteredAppointments}
          openTimeSlotModal={openTimeSlotModal}
          deleteAppointment={deleteAppointment}
          openTimeSlotsInfoModal={openTimeSlotsInfoModal}
        />

        <DoctorModal
          show={showDoctorModal}
          doctorData={doctorData}
          handleChange={handleChange}
          handleSaveDoctor={handleSaveDoctor}
          handleCancel={handleCancelModal}
          editIndex={editIndex}
          error={error}
          professionLookup={professionLookup}
        />

        <TimeSlotModal
          show={showTimeSlotModal}
          startTimeSlotInput={startTimeSlotInput}
          endTimeSlotInput={endTimeSlotInput}
          setStartTimeSlotInput={setStartTimeSlotInput}
          setEndTimeSlotInput={setEndTimeSlotInput}
          addTimeSlot={addTimeSlot}
          closeModal={() => {
            setShowTimeSlotModal(false);
            setError("");
          }}
          error={error}
        />

       <TimeSlotsInfoModal
          show={showTimeSlotsInfoModal}
          selectedDayInfo={selectedDayInfo}
          toggleTimeSlotAvailability={toggleTimeSlotAvailability}
          removeTimeSlot={removeTimeSlot}
          saveTimeSlotChanges={saveTimeSlotChanges}
          closeModal={() => setShowTimeSlotsInfoModal(false)}
        />

        <AppointmentModal
          show={showAppointmentModal}
          doctors={doctors}
          appointmentData={appointmentData}
          handleAppointmentChange={handleAppointmentChange}
          handleBookAppointment={handleBookAppointment}
          handleAppointmentCancelModal={handleAppointmentCancelModal}
          editIndex={editIndex}
          error={error}
        />

      </div>
    </>
  );
};

export default AdminManageDoctor;
