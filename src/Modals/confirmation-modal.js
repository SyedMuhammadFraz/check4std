import React, { useEffect } from "react";
import "./confirmation-modal.css";

function ConfirmationModal({ showModal, onClose, onConfirm }) {
  // Ensure `useEffect` is always called
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showModal]);

  // Return null if `showModal` is false
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-heading">Logout Confirmation</h2>
        <p>Are you sure you want to logout?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="button2">
            Yes
          </button>
          <button onClick={onClose} className="button1">
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
