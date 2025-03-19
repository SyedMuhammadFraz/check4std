import React, { useState } from "react";
import "./Admin_Manage_Doctor.css";
import AdminNavBar from "./AdminNavBar";

const AdminManageDoctor = () => {
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [doctorData, setDoctorData] = useState({
    name: "",
    profession: "",
    email: "",
  });
  const [appointments, setAppointments] = useState([
    {
      doctorName: "Dr. Sarah Ahmed",
      date: "2025-03-18",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      availability: "Available",
    },
    {
      doctorName: "Dr. Ali Khan",
      date: "2025-03-19",
      startTime: "02:00 PM",
      endTime: "03:00 PM",
      availability: "Booked",
    },
    {
      doctorName: "Dr. Ayesha Malik",
      date: "2025-03-20",
      startTime: "09:00 AM",
      endTime: "10:30 AM",
      availability: "Available",
    },
    {
      doctorName: "Dr. Omar Farooq",
      date: "2025-03-21",
      startTime: "11:30 AM",
      endTime: "12:30 PM",
      availability: "Unavailable",
    },
    {
      doctorName: "Dr. Hina Rehman",
      date: "2025-03-22",
      startTime: "12:10",
      endTime: "14:59",
      availability: "Available",
    },
  ]);

  const [appointmentData, setAppointmentData] = useState({
    doctorName: "",
    date: "",
    startTime: "",
    endTime: "",
    availability: "Available",
  });

  const [doctors, setDoctors] = useState([
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      email: "hsh@hi.com",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      email: "hsh@hi.com",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      email: "hsh@hi.com",
    },
  ]);
  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");

  const handleSaveDoctor = () => {
    // Check if all fields are filled
    if (!doctorData.name || !doctorData.email || !doctorData.profession) {
      setError("All fields are required.");
      return;
    }

    if (editIndex !== null) {
      const updatedDoctors = [...doctors];
      updatedDoctors[editIndex] = doctorData;
      setDoctors(updatedDoctors);
      setEditIndex(null);
    } else {
      setDoctors([...doctors, doctorData]);
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

  const handleBookAppointment = () => {
    if (
      !appointmentData.doctorName ||
      !appointmentData.date ||
      !appointmentData.startTime ||
      !appointmentData.endTime
    ) {
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

    // Validate Time Difference (0.5 to 3 hours)
    const startTime = new Date(`1970-01-01T${appointmentData.startTime}`);
    const endTime = new Date(`1970-01-01T${appointmentData.endTime}`);
    const timeDiff = (endTime - startTime) / (1000 * 60 * 60); // Convert to hours

    if (timeDiff < 0.5 || timeDiff > 3) {
      setError("Time slot must be between 30 minutes and 3 hours.");
      return;
    }

    // If editing, update the list; otherwise, add a new entry
    if (editIndex !== null) {
      const updatedAppointments = [...appointments];
      updatedAppointments[editIndex] = appointmentData;
      setAppointments(updatedAppointments);
      setEditIndex(null);
    } else {
      setAppointments([...appointments, appointmentData]);
    }

    setEditIndex(null);
    setAppointmentData({
      doctorName: "",
      date: "",
      startTime: "",
      endTime: "",
    });
    setShowAppointmentModal(false);
    setError("");
  };

  const handleDoctorEdit = (index) => {
    setDoctorData(doctors[index]);
    setEditIndex(index);
    setShowDoctorModal(true);
  };

  const handleAppointmentEdit = (index) => {
    setAppointmentData(appointments[index]);
    setEditIndex(index);
    setShowAppointmentModal(true);
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

  const handleAppointmentCancelModal = () => {
    setEditIndex(null);
    setAppointmentData({
      doctorName: "",
      date: "",
      startTime: "",
      endTime: "",
    });
    setShowAppointmentModal(false);
    setError("");
  };
  const handleDoctorDelete = (index) => {
    const updatedDoctors = doctors.filter((_, i) => i !== index);
    setDoctors(updatedDoctors);
  };

  const handleAppointmentDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  const toggleAvailability = (doctorName, date, startTime, endTime) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.doctorName === doctorName &&
        appointment.date === date &&
        appointment.startTime === startTime &&
        appointment.endTime === endTime
          ? {
              ...appointment,
              availability:
                appointment.availability === "Available"
                  ? "Unavailable"
                  : "Available",
            }
          : appointment
      )
    );
  };

  const [nameFilter, setNameFilter] = useState("");
  const [professionFilter, setProfessionFilter] = useState("All");
  const [emailFilter, setEmailFilter] = useState("");

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

  // Filtered Appointments

  const [doctorFilter, setDoctorFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [timeFilter, setTimeFilter] = useState({ start: "", end: "" });

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesDoctor =
      doctorFilter === "" ||
      appointment.doctorName.toLowerCase().includes(doctorFilter.toLowerCase());

    const matchesAvailability =
      availabilityFilter === "All" ||
      appointment.availability === availabilityFilter;

    const matchesDate =
      (!dateFilter.from || appointment.date >= dateFilter.from) &&
      (!dateFilter.to || appointment.date <= dateFilter.to);

    const matchesTime =
      (!timeFilter.start || appointment.startTime >= timeFilter.start) &&
      (!timeFilter.end || appointment.endTime <= timeFilter.end);

    return matchesDoctor && matchesAvailability && matchesDate && matchesTime;
  });

  return (
    <>
      <AdminNavBar />
      <div className="admin-doctor-wrapper">
        <h1>
          <strong>Doctor Dashboard</strong>
        </h1>
        <div className="button-container">
          <button
            className="button2 add-doctor-btn"
            onClick={() => setShowDoctorModal(true)}
          >
            + Add Doctor
          </button>

          <button
            className="button2 book-appointment-btn"
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

        <section className="Admin-Doctor-Table">
          <h2>
            <strong>Doctors Data</strong>
          </h2>
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
                    <span
                      // className="edit-doctor-button"
                      onClick={() => handleDoctorEdit(index)}
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <path
                            stroke-dasharray="20"
                            stroke-dashoffset="20"
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
                            stroke-dasharray="48"
                            stroke-dashoffset="48"
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
                            stroke-dasharray="8"
                            stroke-dashoffset="8"
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
                          fill-opacity="0"
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
                      </svg>{" "}
                    </span>
                    <span
                      style={{ marginLeft: "10px" }}
                      // className="delete-doctor-button"
                      onClick={() => handleDoctorDelete(index)}
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <path
                            stroke-dasharray="20"
                            stroke-dashoffset="20"
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
                            stroke-dasharray="20"
                            stroke-dashoffset="20"
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
                            stroke-dasharray="10"
                            stroke-dashoffset="10"
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
                            stroke-dasharray="10"
                            stroke-dashoffset="10"
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

        {/* APPOINTMENT FILTERS */}

        <div className="doctor-filters">
          <input
            type="text"
            placeholder="Search by doctor's name..."
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
          />

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="All">All Availability</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Unavailable">Unavailable</option>
          </select>

          <input
            type="date"
            onChange={(e) =>
              setDateFilter({ ...dateFilter, from: e.target.value })
            }
          />
          <input
            type="date"
            onChange={(e) =>
              setDateFilter({ ...dateFilter, to: e.target.value })
            }
          />

          <input
            type="time"
            onChange={(e) =>
              setTimeFilter({ ...timeFilter, start: e.target.value })
            }
          />
          <input
            type="time"
            onChange={(e) =>
              setTimeFilter({ ...timeFilter, end: e.target.value })
            }
          />
        </div>

        {/* APPOINTMETS TABLE */}

        <section className="Admin-Doctor-Table">
          <h2>
            <strong>Appointments Data</strong>
          </h2>
          <table className="doctor-list-table">
            <thead>
              <tr>
                <th className="table-header">Doctor Name</th>
                <th className="table-header">Date</th>
                <th className="table-header">Time Slot</th>
                <th className="table-header">Availability</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointments, index) => (
                <tr key={index}>
                  <td className="table-data">{appointments.doctorName}</td>
                  <td className="table-data">{appointments.date}</td>
                  <td className="table-data">
                    {appointments.startTime} - {appointments.endTime}
                  </td>
                  <td>
                    <button
                      className={`table-data status-btn ${appointments.availability}`}
                    >
                      {appointments.availability}
                    </button>
                  </td>
                  <td className="table-data">
                    <span
                      // className="edit-doctor-button"
                      onClick={() => handleAppointmentEdit(index)}
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <path
                            stroke-dasharray="20"
                            stroke-dashoffset="20"
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
                            stroke-dasharray="48"
                            stroke-dashoffset="48"
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
                            stroke-dasharray="8"
                            stroke-dashoffset="8"
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
                          fill-opacity="0"
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
                      </svg>{" "}
                    </span>
                    <span
                      style={{ marginLeft: "10px" }}
                      // className="delete-doctor-button"
                      onClick={() => handleAppointmentDelete(index)}
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <path
                            stroke-dasharray="20"
                            stroke-dashoffset="20"
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
                            stroke-dasharray="20"
                            stroke-dashoffset="20"
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
                            stroke-dasharray="10"
                            stroke-dashoffset="10"
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
                            stroke-dasharray="10"
                            stroke-dashoffset="10"
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
                    <button
                      style={{ marginLeft: "10px" }}
                      className={`toggle-availability-button ${
                        appointments.availability === "Available"
                          ? "available-btn"
                          : "unavailable-btn"
                      }`}
                      onClick={() =>
                        toggleAvailability(
                          appointments.doctorName,
                          appointments.date,
                          appointments.startTime,
                          appointments.endTime
                        )
                      }
                    >
                      {appointments.availability === "Available"
                        ? "Mark Unavailable"
                        : "Mark Available"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* MODAL */}
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
                required
              >
                <option value="">Select Profession</option>
                <option value="Nurse">Nurse</option>
                <option value="Doctor">Doctor</option>
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
                <button
                  className="doctor-save-button"
                  onClick={handleSaveDoctor}
                >
                  {editIndex !== null ? "Update" : "Add"}
                </button>
                <button
                  className="doctor-cancel-button"
                  onClick={() => handleCancelModal()}
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

              <label className="doctor-modal-label">Time Slot:</label>
              <div className="time-slot-container">
                <input
                  type="time"
                  name="startTime"
                  value={appointmentData.startTime}
                  className="doctor-modal-input"
                  onChange={handleAppointmentChange}
                  required
                />
                <span className="time-slot-separator"> to </span>
                <input
                  type="time"
                  name="endTime"
                  value={appointmentData.endTime}
                  className="doctor-modal-input"
                  onChange={handleAppointmentChange}
                  required
                />
              </div>
              {/* Error Message */}
              {error && <p className="error-message">{error}</p>}

              <div className="doctor-modal-actions">
                <button
                  className="doctor-save-button"
                  onClick={handleBookAppointment}
                >
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
