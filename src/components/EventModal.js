import React from 'react';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import '../styles/EventModal.css';

const EventModal = ({ show, onHide, eventList }) => {
    const eventsDetail = eventList.extendedProps;
    const events = eventsDetail.events;

  return (
    <Modal
      show={show}
      onHide={onHide}
      className="event-modal"
      centered         
      backdrop="static"
      keyboard={false}  
    >
      <Modal.Header>
        <Modal.Title>Meetings</Modal.Title>
        <Button variant="link" className="close-btn" onClick={onHide}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event-item">
              <h5>{event.title}</h5>
              <p>
                <span>{event.level}</span> | Interviewer: {event.interviewer}
              </p>
              <p>
                Date: {moment(new Date(event.start)).format('DD MMM YYYY')} &nbsp;&nbsp;&nbsp; Time: {moment(new Date(event.start)).format('h:mm A')} - {moment(new Date(event.end)).format('h:mm A')}
              </p>
              {index !== events.length - 1 && <hr />}
            </div>
          ))
        ) : (
          <p>No meetings available.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EventModal;
