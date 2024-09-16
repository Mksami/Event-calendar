import { useMemo } from 'react';
import moment from 'moment';

const useGroupEvents = (events) => {
    console.log("events",events);
  // Memoize the grouped events to avoid unnecessary recalculations
  const groupedEvents = useMemo(() => {
     // Group events by start time and count occurrences
     const grouped = events.reduce((acc, event) => {
        console.log("Love", event);
        const key = event.start;
        if (!acc[key]) {
          acc[key] = {
            ...event,
            count: 0,
            events: []
          };
        }
        acc[key].events.push(event);
        acc[key].count += 1;
        return acc;
      }, {});
      return grouped;
  }, [events]);
   console.log("Sami", groupedEvents);
  return groupedEvents;
};

export default useGroupEvents;
