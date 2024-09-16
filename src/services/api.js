// api.js
import axios from 'axios';

export const fetchCalendarData = async (fromDate, toDate) => {
  return axios.get('/calendarfromtoenddate.json', {
    params: { from: fromDate, to: toDate }
  });
};

export const fetchEventDetails = async (eventId) => {
  return axios.get(`/calendar_meeting.json`, { params: { eventId } });
};
