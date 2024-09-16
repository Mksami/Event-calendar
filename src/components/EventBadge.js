import React from 'react';
import '../styles/CalendarComponent.css';

const EventBadge = ({ count }) => {
  if (!count || count <= 1) return null; // If no events, don't show the badge

  return (
    <div className="event-badge">
      {count}
    </div>
  );
};

export default EventBadge;
