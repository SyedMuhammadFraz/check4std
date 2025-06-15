import React from "react";
import "./PrescriptionModal.css";

const PrescriptionModal = ({ open, onClose, xml, actionUrl }) => {
  // Create a ref for the iframe
  const iframeRef = React.useRef(null);

  React.useEffect(() => {
    if (open && iframeRef.current) {
      // Create a form and submit the XML to the iframe
      const form = document.createElement("form");
      form.method = "POST";
      form.action = actionUrl;
      form.target = "prescription-iframe";

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "xml";
      input.value = xml;
      form.appendChild(input);

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }
  }, [open, xml, actionUrl]);

  // Only render when open
  if (!open) return null;

  return (
    <div className="prescription-modal-overlay">
      <div className="prescription-modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <iframe
          name="prescription-iframe"
          ref={iframeRef}
          title="Prescription"
          style={{ width: "100%", height: "80vh", border: "none" }}
        />
      </div>
    </div>
  );
};

export default PrescriptionModal;
