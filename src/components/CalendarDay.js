// CalendarDay.js
import React from 'react';
import '../styles/CalendarComponent.css';

const CalendarDay = ({ date, events, onClick }) => {
   //debugger;
  const hasEvents = events && events.length > 0;
 // console.log(date.getDate(), hasEvents);
 
  return (
    <div className="calendar-day" onClick={() => onClick(events)}>
      <h4>{date.getDate()}</h4>
      {hasEvents && (
        <div className="event-badge">
          {events.length}
        </div>
      )}
    </div>
  );
};

export default CalendarDay;
