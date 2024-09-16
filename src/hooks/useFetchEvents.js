// useFetchEvents.js
import { useState, useEffect } from 'react';
import { fetchCalendarData } from '../services/api';

const useFetchEvents = (fromDate, toDate) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchCalendarData(fromDate, toDate);
        const responseData = response.data.map((item)=>
          ({...item,
              title: item.summary,
              extendedProps: { interviewer: item.user_det?.handled_by?.username },
              level: item.desc,
              interviewer: item.user_det?.handled_by?.username,
            })
        );
        setEvents(responseData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [fromDate, toDate]);

  return { events, loading, error };
};

export default useFetchEvents;
