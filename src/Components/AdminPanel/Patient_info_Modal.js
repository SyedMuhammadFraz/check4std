import React from "react";
import './PatientInfoModal.css'

const PatientInfoModal = ({ diseases, onClose }) => {
  if (!diseases || diseases.length === 0) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Diseases Information</h2>
        <table>
          <thead>
            <tr>
              <th>Disease Name</th>
              <th>Disease Price</th>
            </tr>
          </thead>
          <tbody>
            {diseases.map((disease, index) => (
              <tr key={index}>
                <td>{disease.name}</td>
                <td>{disease.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose} className="modal-close-button my-3">
          Close
        </button>
      </div>
    </div>
  );
};

export default PatientInfoModal;
