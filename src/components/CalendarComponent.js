import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Enables click and drag
import moment from 'moment';
import EventModal from './EventModal';
import useFetchEvents from '../hooks/useFetchEvents';
import useGroupEvents from '../hooks/useGroupEvents';
import CustomEventCard from './CustomEventCard';
import '../styles/CalendarComponent.css';

const CalendarComponent = () => {
  const [eventList, setEventList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { events, loading, error } = useFetchEvents(null, null); // Fetch events
  const groupedEvents = useGroupEvents(events);
 // Reference to the FullCalendar instance
 const calendarRef = useRef(null);
  // Sample API call (replace with real API)
  useEffect(() => {
      // Transform grouped events into FullCalendar format
      const calendarEvents = Object.entries(groupedEvents).flatMap(([start, events ]) =>
        events
      );
  console.log("calendarEvents", calendarEvents);
      setEventList(calendarEvents); 
  }, [groupedEvents]);

  // Event click handler to open modal
  const handleEventClick = (clickInfo) => {
    console.log("clickInfo", clickInfo);
    setSelectedEvent(clickInfo.event);
    setShowModal(true);
  };

  // Function to move to the previous week/month/day
  const handlePrevClick = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.prev(); // Call FullCalendar's prev method
  };

  // Function to move to the next week/month/day
  const handleNextClick = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.next(); // Call FullCalendar's next method
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
    <div className="calendar-container">
      
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={eventList}
        headerToolbar={{
          left: 'customPrev,customNext',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        customButtons={{
        customPrev: {
            text: '<',
            click: handlePrevClick,
          },
        customNext: {
            text: '>',
            click: handleNextClick,
          },
        }}
      // Custom function for title formatting
      titleFormat={renderTitleFormat}
       // dayCellContent={renderDayCellContent}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        height="100%"  // Make the calendar take the full height of its container
      />

      {selectedEvent && selectedEvent._def && (
        <EventModal
          show={showModal}
          onHide={() => setShowModal(false)}
          eventList={selectedEvent._def}
        />
      )}
    </div>
  );
};

// Event content renderer (optional)
function renderEventContent(eventInfo) {
  console.log(">>>>",eventInfo);
  return (
    <>{eventInfo &&
      <CustomEventCard
        eventInfo={eventInfo.event?._def}
      />
    }
    </>
  );
}
const renderTitleFormat = ({ start, end }) => {
    const startDate = moment(start).format('D MMMM YYYY'); // Format the start date
    const endDate = moment(end).format('D MMMM YYYY');     // Format the end date

    return `${startDate} – ${endDate}`;
  }

const renderDayCellContent = (info) => {
  const { date } = info;
  const formattedDate = moment(date).format('MMM d, yyyy');

  return (
    <div className="custom-day-cell-content">
      {formattedDate}
    </div>
  );
};


export default CalendarComponent;
