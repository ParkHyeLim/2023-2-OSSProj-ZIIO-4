import axios from 'axios';
import instance from './instance';
import dayjs from 'dayjs';

// const mypageInstance = axios.create(instance.defaults);
// mypageInstance.defaults.baseURL += '/mypages';

export const getMyEvents = async () => {
  try {
    const response = await instance.get('/mypages');
    // console.log('mypageAPI.js getMyEvents response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const addMyEvent = async eventData => {
  try {
    const response = await instance.post('/mypages', {
      start_date: dayjs(eventData.start).format('YYYY.MM.DD'),
      end_date: dayjs(eventData.end).format('YYYY.MM.DD'),
      title: eventData.title,
      memo: eventData.extendedProps.memo,
      color_code: eventData.backgroundColor,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
  }
};

export const updateMyEvent = async eventData => {
  try {
    const response = await instance.patch('/mypages', {
      my_page_id: eventData.extendedProps.my_page_id,
      start_date: dayjs(eventData.start).format('YYYY.MM.DD'),
      end_date: dayjs(eventData.end).format('YYYY.MM.DD'),
      title: eventData.title,
      memo: eventData.extendedProps.memo,
      color_code: eventData.backgroundColor,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
  }
};

export const deleteMyEvent = async id => {
  try {
    const response = await instance.delete('/mypages', {
      data: {
        my_page_id: id,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};
