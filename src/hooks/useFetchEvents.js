// useFetchEvents.js
import { useState, useEffect } from 'react';
import { fetchCalendarData } from '../services/api';
import { toCapitalCase } from '../utils/textUtils';

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
              title: toCapitalCase(item.user_det?.job_id?.jobRequest_Title),
              extendedProps: { interviewer: item.user_det?.handled_by?.firstName },
              level: item.desc,
              interviewer: item.user_det?.handled_by?.firstName,
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
