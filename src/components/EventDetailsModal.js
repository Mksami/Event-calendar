import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/EventDetailsModal.css';  // Importing external CSS

const EventDetailsModal = ({ show, onHide, event }) => {
  if (!event) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Interview Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-content-container">
          {/* Left column */}
          <div className="modal-details">
            <p><strong>Interview With:</strong> John Smith</p>
            <p><strong>Position:</strong> Python Developer</p>
            <p><strong>Created By:</strong> HR Manager</p>
            <p><strong>Interview Date:</strong> 6th March 2024</p>
            <p><strong>Interview Time:</strong> 10 - 11 A.M</p>
            <p><strong>Interview Via:</strong> Google Meet</p>

            {/* Document download buttons */}
            <div className="document-buttons">
              <Button variant="outline-primary" className="doc-btn">
                Resume.docx <i className="fa fa-download"></i>
              </Button>
              <Button variant="outline-primary" className="doc-btn">
                Aadharcard <i className="fa fa-download"></i>
              </Button>
            </div>
          </div>

          {/* Right column */}
          <div className="modal-logo-section">
            <img
              src="https://www.gstatic.com/images/branding/product/2x/meet_2020q4_48dp.png"
              alt="Google Meet"
              className="meet-logo"
            />
            <Button
              variant="primary"
              href="https://meet.google.com/"
              target="_blank"
              className="join-btn"
            >
              Join
            </Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventDetailsModal;
