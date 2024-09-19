// EventList.js
import React from 'react';
import moment from 'moment';
import '../styles/CalendarComponent.css';
import EventBadge from "./EventBadge";

const CustomEventCard = ({ eventInfo }) => {
 // console.log("eventInfo", eventInfo);
  const {extendedProps} = eventInfo;
  const {events}= extendedProps;
  
  const startTime =  moment(new Date(events[0].start)).format('h:mm A');
  const endTime = events[0].end ? moment(new Date(events[0].end)).format('h:mm A') : 'N/A';
  return (
     <div className="custom-event-card">
      <div className="blue-side"></div>
      <div className="event-content">
      <div className="event-info">
       <span className="role">{events[0].title}</span>
       <span className="interviewer">Interviewer: {extendedProps.interviewer}</span>
       <span className="time">Time: {startTime} - {endTime}</span>
      </div>
      </div>
      <EventBadge count={extendedProps?.count} />
   </div>
  );
};

export default CustomEventCard;
