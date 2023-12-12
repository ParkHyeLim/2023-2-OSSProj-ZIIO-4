import axios from 'axios';

const useGoogleCalendar = userData => {
  // 구글 캘린더에 일정 추가하는 함수
  const createGoogleEvent = async eventData => {
    const { title, memo, start, end } = eventData;
    const event = {
      summary: title,
      description: memo,
      start: {
        dateTime: start,
        timeZone: 'Asia/Seoul',
      },
      end: {
        dateTime: end,
        timeZone: 'Asia/Seoul',
      },
      colorId: 5,
      status: 'confirmed',
      visibility: 'private',
    };

    const response = await axios.post('https://www.googleapis.com/calendar/v3/calendars/primary/events', event, {
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
      },
    });
  };
  return { createGoogleEvent };
};

export default useGoogleCalendar;
