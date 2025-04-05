import React, { useState, useEffect, useContext } from "react";
import "./Admin_Manage_Doctor.css";
import AdminNavBar from "./AdminNavBar";
import { webApiInstance } from "../../AxiosInstance";
import { toast } from "react-toastify";
import { useLoader } from "../../utils/LoaderContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";

const AdminManageDoctor = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
  const [showTimeSlotsInfoModal, setShowTimeSlotsInfoModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  // Form inputs
  const [doctorData, setDoctorData] = useState({
    name: "",
    profession: "",
    email: "",
  });

  const [appointmentData, setAppointmentData] = useState({
    doctorId: "",
    doctorName: "",
    date: "",
    timeSlots: [],
  });

  const [startTimeSlotInput, setStartTimeSlotInput] = useState("");
  const [endTimeSlotInput, setEndTimeSlotInput] = useState("");
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] =
    useState(null);

  // Selected data for modals
  const [selectedDayInfo, setSelectedDayInfo] = useState({
    doctorName: "",
    date: "",
    timeSlots: [],
  });

  const updateAppointmentsAfterSlotRemoval = (dayInfo, removedSlotIndex) => {
    // Find the corresponding appointment in your data source
    // This will depend on your data structure
    // For example, if you have a flat list of appointments:

    // Find the matching appointment by doctor name and date
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
  // Filter states
  const [nameFilter, setNameFilter] = useState("");
  const [professionFilter, setProfessionFilter] = useState("All");
  const [emailFilter, setEmailFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [timeFilter, setTimeFilter] = useState({ start: "", end: "" });
  const [professionLookup, setProfessionLookup] = useState([]);
  const { setLoading } = useLoader();
  // Main data
  const [doctors, setDoctors] = useState([]);

  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    setLoading(true);
    // Simulating an API call
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
  }, []); //

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
    if (!doctorData.name || !doctorData.email || !doctorData.profession) {
      setError("All fields are required.");
      return;
    }

    if (editIndex !== null) {
      const updatedDoctors = [...doctors];
      updatedDoctors[editIndex] = doctorData;
      setDoctors(updatedDoctors);
    } else {
      try {
        setLoading(true);
        const response = await webApiInstance.post("/Doctor", {
          name: doctorData.name,
          email: doctorData.email,
          profession: doctorData.profession,
        });
        if (response.data.statusCode === 200) {
          const newDoctor = response.data.result;
          setDoctors([...doctors, newDoctor]); // Update state with the new doctor
          setDoctorData({ name: "", profession: "", email: "" });
          setShowDoctorModal(false);
          setError("");
          toast.success("Data added successfully!");
        } else {
          toast.error("There was an error. Please try again");
        }
        // Reset form & close modal
      } catch (error) {
        toast.error("There was an error. Please try again");
      } finally {
        setLoading(false);
      }
    }

    setEditIndex(null);
    // Reset fields & hide modal
    setDoctorData({
      name: "",
      profession: "",
      email: "",
    });
    setShowDoctorModal(false);
    setError("");
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
          },
        );
        console.log(response);
        if (response.data.statusCode === 200) {
          setAppointments([...appointments, response.data.result]); // Update state with API response
          toast.success("Data added successfully!");
        } else {
          toast.error("There was an error. Please try again");
        }
      } catch (err) {
        toast.error("There was an error. Please try again");
        console.log(error);
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
      if (timeDiff < 30 || timeDiff > 180) {
        setError("Time slot must be between 30 minutes and 3 hours.");
        return;
      }

      const updatedAppointments = [...appointments];

      console.log(appointments[selectedAppointmentIndex].id);
      console.log(startTimeSlotInput);
      const newTimeSlot = {
        availbilityId: appointments[selectedAppointmentIndex].id, // Assuming the appointment ID is used as availabilityId
        startTime: startTimeSlotInput,
        endTime: endTimeSlotInput,
      };

      // Check if new time slot conflicts with existing ones
      const isOverlap = updatedAppointments[
        selectedAppointmentIndex
      ].timeSlots.some((slot) => checkOverlap(slot, newTimeSlot));

      if (isOverlap) {
        setError("This time slot overlaps with an existing one.");
        return;
      }

      try {
        // API request to save the time slot
        const response = await webApiInstance.post(
          "/Doctor/add-availbility-timeslot",
          newTimeSlot
        );
        console.log(response);
        if (response.status === 200) {
          const updatedAppointments = [...appointments];

          // Add the new time slot to the UI
          updatedAppointments[selectedAppointmentIndex].timeSlots.push(
            newTimeSlot
          );
          setAppointments(updatedAppointments);

          // Clear inputs & errors

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

  const handleAppointmentDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  const deleteAppointment = (index) => {
    handleAppointmentDelete(index);
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
  useEffect(() => {
    const FetchLookups = async () => {
      try {
        const professionResponse = await webApiInstance.get(
          "/Lookup/get-by-type",
          {
            params: { type: "Profession" },
          }
        );
        console.log("Profession Lookup:", professionResponse.data.result);
        setProfessionLookup(professionResponse.data.result);
      } catch (error) {
        console.error("Error fetching lookup data:", error);
        setProfessionLookup([]);
      }
    };

    FetchLookups();
  }, []);

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

  const handleDoctorDelete = (index) => {
    const updatedDoctors = doctors.filter((_, i) => i !== index);
    setDoctors(updatedDoctors);
  };

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
          <strong>Doctor Dashboard</strong>
        </h1>
        <div className="button-container">
          <button className="button3 " onClick={() => setShowDoctorModal(true)}>
            + Add Doctor
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
            <option value="Nurse">Nurse</option>
            <option value="Doctor">Doctor</option>
          </select>

          <input
            type="text"
            placeholder="Search by email..."
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
        </div>

        {/* Doctor Table */}
        <h2>
          <strong>Doctors & Nurses</strong>
        </h2>
        <section className="Admin-Doctor-Table">
          <table className="doctor-list-table">
            <thead>
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Profession</th>
                <th className="table-header">Email</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor, index) => (
                <tr key={index}>
                  <td className="table-data">{doctor.name}</td>
                  <td className="table-data">{doctor.profession}</td>
                  <td className="table-data">{doctor.email}</td>
                  <td className="table-data">
                    {/* <span
                      onClick={() => handleDoctorEdit(index)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="#e6cb34"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path
                            strokeDasharray="20"
                            strokeDashoffset="20"
                            d="M3 21h18"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              dur="0.2s"
                              values="20;0"
                            />
                          </path>
                          <path
                            strokeDasharray="48"
                            strokeDashoffset="48"
                            d="M7 17v-4l10 -10l4 4l-10 10h-4"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.2s"
                              dur="0.6s"
                              values="48;0"
                            />
                          </path>
                          <path
                            strokeDasharray="8"
                            strokeDashoffset="8"
                            d="M14 6l4 4"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.8s"
                              dur="0.2s"
                              values="8;0"
                            />
                          </path>
                        </g>
                        <path
                          fill="#e6cb34"
                          fillOpacity="0"
                          d="M14 6l4 4L21 7L17 3Z"
                        >
                          <animate
                            fill="freeze"
                            attributeName="fill-opacity"
                            begin="1.1s"
                            dur="0.5s"
                            values="0;1"
                          />
                        </path>
                      </svg>
                    </span> */}
                    <span
                      onClick={() => handleDoctorDelete(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="#d51e1e"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path
                            strokeDasharray="20"
                            strokeDashoffset="20"
                            d="M3 21v-1c0 -2.21 1.79 -4 4 -4h4c2.21 0 4 1.79 4 4v1"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              dur="0.2s"
                              values="20;0"
                            />
                          </path>
                          <path
                            strokeDasharray="20"
                            strokeDashoffset="20"
                            d="M9 13c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3Z"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.2s"
                              dur="0.2s"
                              values="20;0"
                            />
                          </path>
                          <path
                            strokeDasharray="10"
                            strokeDashoffset="10"
                            d="M15 3l6 6"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.5s"
                              dur="0.2s"
                              values="10;0"
                            />
                          </path>
                          <path
                            strokeDasharray="10"
                            strokeDashoffset="10"
                            d="M21 3l-6 6"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.7s"
                              dur="0.2s"
                              values="10;0"
                            />
                          </path>
                        </g>
                      </svg>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

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
        <h2>
          <strong>Appointments Data</strong>
        </h2>
        <section className="Admin-Doctor-Table my-3">
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
              {filteredAppointments.map((appointment, index) => {
                const hasTimeSlots = appointment.timeSlots?.length > 0;
                const isDeletable = !appointment.timeSlots?.some(
                  (slot) => slot.availability === "Booked"
                );

                return (
                  <tr key={appointment.id}>
                    <td className="table-data">{appointment.doctorName}</td>
                    <td className="table-data">{appointment.date}</td>
                    <td>
                      {hasTimeSlots ? (
                        <span>{appointment.timeSlots.length} time slots</span>
                      ) : (
                        <span>No time slots</span>
                      )}
                    </td>
                    <td>
                      <div className="appointment-table-svg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          onClick={() => openTimeSlotModal(appointment.id)}
                        >
                          <path
                            fill="#f57a00"
                            d="M11 8h2v6h-2zm4-7H9v2h6zm-3 19c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7c.7 0 1.36.13 2 .35V13c0-2.12-.74-4.07-1.97-5.61l1.42-1.42c-.45-.51-.9-.97-1.41-1.41L17.62 6c-1.55-1.26-3.5-2-5.62-2a9 9 0 0 0 0 18c.59 0 1.16-.06 1.71-.17c-.31-.58-.53-1.23-.63-1.92c-.36.05-.71.09-1.08.09m8-2v-3h-2v3h-3v2h3v3h2v-3h3v-2z"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          disabled={!isDeletable} // Disable if any slot is "Booked"
                          onClick={() => deleteAppointment(appointment.id)}
                        >
                          <defs>
                            <mask id="ipTDelete0">
                              <g
                                fill="none"
                                stroke="#fff"
                                stroke-linejoin="round"
                                stroke-width="4"
                              >
                                <path fill="#555555" d="M9 10v34h30V10z" />
                                <path
                                  stroke-linecap="round"
                                  d="M20 20v13m8-13v13M4 10h40"
                                />
                                <path
                                  fill="#555555"
                                  d="m16 10l3.289-6h9.488L32 10z"
                                />
                              </g>
                            </mask>
                          </defs>
                          <path
                            fill="#e53835"
                            d="M0 0h48v48H0z"
                            mask="url(#ipTDelete0)"
                          />
                        </svg>
                      </div>
                    </td>
                    <td className="table-data">
                      {/* Info button to view all time slots */}

                      <svg
                        className="td-info"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 48 48"
                        onClick={() =>
                          openTimeSlotsInfoModal(
                            appointment.doctorName,
                            appointment.date
                          )
                        }
                      >
                        <defs>
                          <mask id="ipTInfo0">
                            <g fill="none">
                              <path
                                fill="#555555"
                                stroke="#fff"
                                stroke-linejoin="round"
                                stroke-width="4"
                                d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"
                              />
                              <path
                                fill="#fff"
                                fill-rule="evenodd"
                                d="M24 11a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"
                                clip-rule="evenodd"
                              />
                              <path
                                stroke="#fff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="4"
                                d="M24.5 34V20h-2M21 34h7"
                              />
                            </g>
                          </mask>
                        </defs>
                        <path
                          fill="#fbc02d"
                          d="M0 0h48v48H0z"
                          mask="url(#ipTInfo0)"
                        />
                      </svg>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Doctor Modal */}
        {showDoctorModal && (
          <div className="doctor-modal-overlay">
            <div className="doctor-modal-box">
              <h2>{editIndex !== null ? "Edit Doctor" : "Add Doctor"}</h2>

              <label>Name:</label>
              <input
                className="doctor-modal-input"
                type="text"
                name="name"
                value={doctorData.name}
                onChange={handleChange}
                required
              />

              <label>Profession:</label>
              <select
                className="doctor-modal-input"
                name="profession"
                value={doctorData.profession}
                onChange={handleChange}
              >
                <option value="All">All Professions</option>
                {professionLookup.map((profession) => (
                  <option key={profession.id} value={profession.id}>
                    {profession.lookupValue}
                  </option>
                ))}
              </select>

              <label>Email:</label>
              <input
                className="doctor-modal-input"
                type="email"
                name="email"
                value={doctorData.email}
                onChange={handleChange}
                required
              />
              {/* Error Message */}
              {error && <p className="error-message">{error}</p>}
              <div className="doctor-modal-actions">
                <button className="button3" onClick={handleSaveDoctor}>
                  {editIndex !== null ? "Update" : "Add"}
                </button>
                <button
                  className="doctor-cancel-button"
                  onClick={handleCancelModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Time Slot Modal */}
        {showTimeSlotModal && (
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
                  onClick={() => {
                    setShowTimeSlotModal(false);
                    setError("");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Time Slots Info Modal */}
        {showTimeSlotsInfoModal && (
          <div className="doctor-modal-overlay">
            <div className="doctor-modal-box">
              <h2>
                <strong>Time Slots for {selectedDayInfo.doctorName}</strong>
              </h2>
              <h3>Date: {selectedDayInfo.date}</h3>

              {selectedDayInfo.timeSlots &&
              selectedDayInfo.timeSlots.length > 0 ? (
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
                          <td>
                            {slot.isBooked !== undefined
                              ? slot.isBooked.toString()
                              : "N/A"}
                          </td>
                          <td>
                            <span
                              className={`status-badge ${
                                slot.statusName?.toLowerCase() || ""
                              }`}
                            >
                              {slot.statusName || "Unknown"}
                            </span>
                          </td>
                          <td>
                            <div className="btn-container">
                              <svg
                                onClick={() => toggleTimeSlotAvailability(idx)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#f57a00"
                                  d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8s-8-3.59-8-8s3.59-8 8-8m.06 9.34v2.14a3.46 3.46 0 0 1-2.54-1.01c-1.12-1.12-1.3-2.8-.59-4.13l-1.1-1.1c-1.28 1.94-1.07 4.59.64 6.29A4.95 4.95 0 0 0 12 17h.06v2l2.83-2.83zm3.48-4.88c-.99-.99-2.3-1.46-3.6-1.45V5L9.11 7.83l2.83 2.83V8.51H12c.9 0 1.79.34 2.48 1.02c1.12 1.12 1.3 2.8.59 4.13l1.1 1.1a5.03 5.03 0 0 0-.63-6.3"
                                  opacity="0.3"
                                />
                                <path
                                  fill="#f57a00"
                                  d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8s-8-3.59-8-8s3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m.06 11.34v2.14a3.46 3.46 0 0 1-2.54-1.01c-1.12-1.12-1.3-2.8-.59-4.13l-1.1-1.1c-1.28 1.94-1.07 4.59.64 6.29A4.95 4.95 0 0 0 12 17h.06v2l2.83-2.83zm3.48-4.88c-.99-.99-2.3-1.46-3.6-1.45V5L9.11 7.83l2.83 2.83V8.51H12c.9 0 1.79.34 2.48 1.02c1.12 1.12 1.3 2.8.59 4.13l1.1 1.1a5.03 5.03 0 0 0-.63-6.3"
                                />
                              </svg>
                              <svg
                                onClick={() => removeTimeSlot(idx)}
                                disabled={slot.isBooked === true}
                                title={
                                  slot.statusName === "Booked"
                                    ? "Booked slots cannot be deleted"
                                    : "Delete this time slot"
                                }
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                              >
                                <defs>
                                  <mask id="ipTDelete0">
                                    <g
                                      fill="none"
                                      stroke="#fff"
                                      stroke-linejoin="round"
                                      stroke-width="4"
                                    >
                                      <path
                                        fill="#555555"
                                        d="M9 10v34h30V10z"
                                      />
                                      <path
                                        stroke-linecap="round"
                                        d="M20 20v13m8-13v13M4 10h40"
                                      />
                                      <path
                                        fill="#555555"
                                        d="m16 10l3.289-6h9.488L32 10z"
                                      />
                                    </g>
                                  </mask>
                                </defs>
                                <path
                                  fill="#e53835"
                                  d="M0 0h48v48H0z"
                                  mask="url(#ipTDelete0)"
                                />
                              </svg>
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
                <button
                  className="doctor-cancel-button"
                  onClick={() => setShowTimeSlotsInfoModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showAppointmentModal && (
          <div className="doctor-modal-overlay">
            <div className="doctor-modal-box">
              <h2>Add Doctor Time Slot</h2>

              <label>Select Doctor/Nurse:</label>
              <select
                className="doctor-modal-input"
                name="doctorName"
                value={appointmentData.doctorName}
                onChange={handleAppointmentChange}
                required
              >
                <option value="">Select a Doctor/Nurse</option>
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
                value={appointmentData.date}
                onChange={handleAppointmentChange}
                required
              />

              {/* Error Message */}
              {error && <p className="error-message">{error}</p>}

              <div className="doctor-modal-actions">
                <button className="button3" onClick={handleBookAppointment}>
                  {editIndex !== null ? "Update" : "Add"}
                </button>
                <button
                  className="doctor-cancel-button"
                  onClick={() => handleAppointmentCancelModal()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminManageDoctor;
