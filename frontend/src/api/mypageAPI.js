import axios from 'axios';
import instance from './instance';
import { formatDateToYMD } from '../utils/dateUtils';

// const mypageInstance = axios.create(instance.defaults);
// mypageInstance.defaults.baseURL += '/mypages';

export const getMyEvents = async () => {
  try {
    const response = await instance.get('/mypages');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const updateMyEvent = async eventData => {
  try {
    const response = await instance.post('/mypages', {
      start_date: formatDateToYMD(eventData.start),
      end_date: formatDateToYMD(eventData.end),
      title: eventData.title,
      memo: eventData.extendedProps.memo,
      color_code: eventData.backgroundColor,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
  }
};
