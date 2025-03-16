import React, { useState } from "react";
import "./Admin_Manage_Doctor.css";
import AdminNavBar from "./AdminNavBar";

const AdminManageDoctor = () => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [doctorData, setDoctorData] = useState({
    name: "",
    profession: "",
    date: "",
    startTime: "",
    endTime: "",
    availability: "Available", // Default value
  });

  const [doctors, setDoctors] = useState([
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
    {
      name: "Dr. John Doe",
      profession: "Doctor",
      date: "2025-03-20",
      startTime: "09:00",
      endTime: "12:00",
      availability: "Available",
    },
    {
      name: "Sarah",
      profession: "Nurse",
      date: "2025-03-21",
      startTime: "10:00",
      endTime: "15:00",
      availability: "Unavailable",
    },
    {
      name: "Dr. Smith",
      profession: "Doctor",
      date: "2025-03-22",
      startTime: "08:00",
      endTime: "14:00",
      availability: "Available",
    },
  ]);
  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState("");

  const handleSave = () => {
    // Check if all fields are filled
    if (
      !doctorData.name ||
      !doctorData.profession ||
      !doctorData.date ||
      !doctorData.startTime ||
      !doctorData.endTime
    ) {
      setError("All fields are required.");
      return;
    }

    // Validate Date (Must be today or later)
    const selectedDate = new Date(doctorData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError("Date must be today or a future date.");
      return;
    }

    // Validate Time Difference (0.5 to 3 hours)
    const startTime = new Date(`1970-01-01T${doctorData.startTime}`);
    const endTime = new Date(`1970-01-01T${doctorData.endTime}`);
    const timeDiff = (endTime - startTime) / (1000 * 60 * 60); // Convert to hours

    if (timeDiff < 0.5 || timeDiff > 3) {
      setError("Time slot must be between 30 minutes and 3 hours.");
      return;
    }

    // If editing, update the list; otherwise, add a new entry
    if (editIndex !== null) {
      const updatedDoctors = [...doctors];
      updatedDoctors[editIndex] = doctorData;
      setDoctors(updatedDoctors);
      setEditIndex(null);
    } else {
      setDoctors([...doctors, doctorData]);
    }

    // Reset fields & hide modal
    setDoctorData({
      name: "",
      profession: "",
      date: "",
      startTime: "",
      endTime: "",
      availability: "Available",
    });
    setShowModal(false);
    setError("");
  };

  const handleEdit = (index) => {
    setDoctorData(doctors[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedDoctors = doctors.filter((_, i) => i !== index);
    setDoctors(updatedDoctors);
  };

  const toggleAvailability = (doctorName, date, startTime, endTime) => {
    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) =>
        doctor.name === doctorName &&
        doctor.date === date &&
        doctor.startTime === startTime &&
        doctor.endTime === endTime
          ? {
              ...doctor,
              availability:
                doctor.availability === "Available"
                  ? "Unavailable"
                  : "Available",
            }
          : doctor
      )
    );
  };

  const [nameFilter, setNameFilter] = useState("");
  const [professionFilter, setProfessionFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesName =
      nameFilter === "" ||
      doctor.name.toLowerCase().includes(nameFilter.toLowerCase());

    const matchesProfession =
      professionFilter === "All" || doctor.profession === professionFilter;

    const matchesAvailability =
      availabilityFilter === "All" ||
      doctor.availability === availabilityFilter;

    const matchesDate =
      (!dateFilter.from || doctor.date >= dateFilter.from) &&
      (!dateFilter.to || doctor.date <= dateFilter.to);

    return (
      matchesName && matchesProfession && matchesAvailability && matchesDate
    );
  });

  return (
    <>
      <AdminNavBar />
      <div className="admin-doctor-wrapper">
        <h1>
          <strong>Dashboard</strong>
        </h1>
        <button className="button2 mx3" onClick={() => setShowModal(true)}>
          + Add Doctor
        </button>

        {/* 🔍 Filters Section */}
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

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="All">All Availability</option>
            <option value="Available">Available</option>
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
        </div>

        <section className="Admin-Doctor-Table">
          <table className="doctor-list-table">
            <thead>
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Profession</th>
                <th className="table-header">Available Date</th>
                <th className="table-header">Time Slot</th>
                <th className="table-header">Availability</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor, index) => (
                <tr key={index}>
                  <td className="table-data">{doctor.name}</td>
                  <td className="table-data">{doctor.profession}</td>
                  <td className="table-data">{doctor.date}</td>
                  <td className="table-data">
                    {doctor.startTime} - {doctor.endTime}
                  </td>
                  <td
                    className={`table-data ${
                      doctor.availability === "Available"
                        ? "available"
                        : "unavailable"
                    }`}
                  >
                    {doctor.availability}
                  </td>
                  <td className="table-data">
                    <button
                      className="edit-doctor-button"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-doctor-button"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                    <button
                      className={`toggle-availability-button ${
                        doctor.availability === "Available"
                          ? "available-btn"
                          : "unavailable-btn"
                      }`}
                      onClick={() =>
                        toggleAvailability(
                          doctor.name,
                          doctor.date,
                          doctor.startTime,
                          doctor.endTime
                        )
                      }
                    >
                      {doctor.availability === "Available"
                        ? "Mark Unavailable"
                        : "Mark Available"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 🔥 MODAL */}
        {showModal && (
          <div className="doctor-modal-overlay">
            <div
              className="doctor-modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{editIndex !== null ? "Edit Doctor" : "Add Doctor"}</h2>

              {/* Name */}
              <label className="doctor-modal-label">Name:</label>
              <input
                type="text"
                name="name"
                value={doctorData.name}
                className="doctor-modal-input"
                onChange={handleChange}
                required
              />

              {/* Profession */}
              <label className="doctor-modal-label">Profession:</label>
              <select
                name="profession"
                value={doctorData.profession}
                className="doctor-modal-input"
                onChange={handleChange}
                required
              >
                <option value="">Select Profession</option>
                <option value="Nurse">Nurse</option>
                <option value="Doctor">Doctor</option>
              </select>

              {/* Date */}
              <label className="doctor-modal-label">Available Date:</label>
              <input
                type="date"
                name="date"
                value={doctorData.date}
                className="doctor-modal-input"
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} // Restrict past dates
                required
              />

              {/* Time Slots */}
              <label className="doctor-modal-label">Time Slot:</label>
              <div className="time-slot-container">
                <input
                  type="time"
                  name="startTime"
                  value={doctorData.startTime}
                  className="doctor-modal-input"
                  onChange={handleChange}
                  required
                />
                <span className="time-slot-separator"> to </span>
                <input
                  type="time"
                  name="endTime"
                  value={doctorData.endTime}
                  className="doctor-modal-input"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Error Message */}
              {error && <p className="error-message">{error}</p>}

              {/* Action Buttons */}
              <div className="doctor-modal-actions">
                <button className="doctor-save-button" onClick={handleSave}>
                  {editIndex !== null ? "Update" : "Add"}
                </button>
                <button
                  className="doctor-cancel-button"
                  onClick={() => setShowModal(false)}
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
