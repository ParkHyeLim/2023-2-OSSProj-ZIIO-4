import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { EventDetail, EventList } from './components';
import styles from './SchoolCalendar.module.scss';
import { EventModal } from '../../components';
import instance from '../../api/instance';

const fetchProjects = async () => {
  const { data } = await instance.get('/academics');
  return data;
}


function formatDate(dateString) {
  const parsedDate = new Date(dateString.replace(/\./g, '-'));
  const formattedDate = `${parsedDate.getFullYear()}-${padZero(parsedDate.getMonth() + 1)}-${padZero(parsedDate.getDate())}`;
  return formattedDate;
}

function padZero(number) {
  return number.toString().padStart(2, '0');
}

const SchoolCalendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [listedEvents, setListedEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDateStart, setEventDateStart] = useState('');
  const [eventDateEnd, setEventDateEnd] = useState('');
  const [eventHost, setEventHost] = useState('');
  const [eventColor, setEventColor] = useState('');
  const [showModal, setShowModal] = useState(false);
  const state = useQuery('academics', fetchProjects);

  useEffect(() => {
    if (listedEvents.length === 0) {
      if (state.isLoading) console.log("Loading");
      else if (state.isError) console.log(state.error);
      else {
        const transformedEvents = state.data.map(item => {
          const start = formatDate(item.start_date);
          const end = formatDate(item.end_date);
          return {
            id: item.id,
            title: item.title,
            start: start,
            end: end,
            backgroundColor: item.color_code,
            extendedProps: { host_department: item.host_department }
          }
        });
        setEvents(transformedEvents);
        setListedEvents(state.data);
      }
    }
  }, [state]);

  const handleEventClick = (eventData, jsEvent) => {
    // jsEvent가 있으면 기본 동작 방지 (FullCalendar 이벤트에서만 적용)
    if (jsEvent) {
      jsEvent.preventDefault();
      const { title, backgroundColor, extendedProps, start, end } = eventData;
      setEventTitle(title);
      setEventColor(backgroundColor);
      setEventHost(extendedProps ? extendedProps.host_department : '');
      setEventDateStart(start);
      setEventDateEnd(end);
    } else {
      // eventData의 구조에 따라 필요한 정보를 추출
      const { title, color_code, host_department, start_date, end_date } = eventData;
      setEventTitle(title);
      setEventColor(color_code);
      setEventHost(host_department);
      setEventDateStart(start_date);
      setEventDateEnd(end_date);
    }
  };

  // 내 일정 추가(추후에는 DB에 보내기)
  const saveEvent = eventData => {
    if (eventData.end) {
      const endDate = new Date(eventData.end);
      endDate.setHours(23, 59, 59, 999); // 날짜의 시간을 23:59:59.999로 설정
      eventData.end = endDate;
    }

    localStorage.setItem('akakakak', JSON.stringify(eventData));
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div>앞으로의 학사일정 목록</div>
        <EventList listedEvents={listedEvents} handleEventClick={handleEventClick} />
        <EventDetail
          eventTitle={eventTitle}
          eventDateStart={eventDateStart}
          eventDateEnd={eventDateEnd}
          eventHost={eventHost}
          eventColor={eventColor}
          onOpen={() => setShowModal(!showModal)}
        />
      </div>
      <FullCalendar
        ref={calendarRef}
        initialView="dayGridMonth"
        events={events}
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: '',
          center: 'prev title next',
          right: '',
        }}
        titleFormat={({ date }) => `${date.year}. ${date.month + 1}`}
        // eventColor={'#f5a986'}
        editable={true}
        // selectable={true}
        displayEventTime={false}
        eventClick={clickInfo => handleEventClick(clickInfo.event, clickInfo.jsEvent)}
        nextDayThreshold={'00:00:00'}
      />
      {showModal && (
        <EventModal
          modalTitle={'내 일정으로 추가'}
          prevData={{
            title: eventTitle,
            start: eventDateStart,
            end: eventDateEnd,
            color: eventColor,
          }}
          saveEvent={saveEvent}
          closeModal={() => setShowModal(!showModal)}
        />
      )}
    </div>
  );
};

export default SchoolCalendar;
