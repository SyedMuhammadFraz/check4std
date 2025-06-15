import React, { useEffect, useRef } from "react";
import "./PrescriptionModal.css";

const PrescriptionModal = ({ open, onClose, iframeUrl, htmlContent }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (open && htmlContent && iframeRef.current) {
      // Write the HTML content into the iframe
      const doc = iframeRef.current.contentWindow.document;
      doc.open();
      doc.write(htmlContent);
      doc.close();
    }
  }, [open, htmlContent]);
  
  useEffect(() => {
    console.log("HTML Content:", htmlContent);
  }, []);

  // Only render when open
  if (!open) return null;

  return (
    <div className="prescription-modal-overlay">
      <div className="prescription-modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        {htmlContent ? (
          <iframe
            ref={iframeRef}
            title="Prescription HTML"
            style={{ width: "100%", height: "80vh", border: "none" }}
          />
        ) : iframeUrl ? (
          <iframe
            src={iframeUrl}
            title="Prescription"
            style={{ width: "100%", height: "80vh", border: "none" }}
          />
        ) : (
          <div>No prescription to display.</div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionModal;
