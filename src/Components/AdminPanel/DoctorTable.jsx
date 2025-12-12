import React from "react";
import DeleteIcon from "../common/deleteIcon";

const DoctorTable = ({ doctors, onDelete }) => {
  return (
    <section className="Admin-Doctor-Table">
      <h2><strong>Doctors & Nurse Practitioners</strong></h2>

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
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="table-data">{doctor.name}</td>
                <td className="table-data">{doctor.professionName || doctor.profession}</td>
                <td className="table-data">{doctor.email}</td>

                <td className="table-data">
                  <span onClick={() => onDelete(doctor.id)}>
                    <DeleteIcon size={30} color="#d51e1e" />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="table-data">
                No doctors found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default DoctorTable;
