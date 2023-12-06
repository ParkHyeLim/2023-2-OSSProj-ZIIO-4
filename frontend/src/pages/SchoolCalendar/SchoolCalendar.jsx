import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { EventDetail, EventList } from './components';
import styles from './SchoolCalendar.module.scss';
import { EventModal } from '../../components';
import instance from '../../api/instance';
import { useNavigate } from 'react-router-dom';

const fetchProjects = async (planData) => {
  if (planData === "") {
    const { data } = await instance.get('/academics');
    return data;
  } else {
    const { data } = await instance.post('/scraps', planData);
    return data;
  }
}

function formatDate(dateString) {
  const parsedDate = new Date(dateString);
  const formattedDate = `${parsedDate.getFullYear()}-${padZero(parsedDate.getMonth() + 1)}-${padZero(parsedDate.getDate())}`;
  return formattedDate;
}

function padZero(number) {
  return number.toString().padStart(2, '0');
}

const SchoolCalendar = () => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [listedEvents, setListedEvents] = useState([]);
  const [eventPostId, setEventPostId] = useState('');
  const [eventId, setEventId] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDateStart, setEventDateStart] = useState('');
  const [eventDateEnd, setEventDateEnd] = useState('');
  const [eventHost, setEventHost] = useState('');
  const [eventColor, setEventColor] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { data } = useQuery('academics', () => fetchProjects(""));

  useEffect(() => {
    if (data) {
      const transformedEvents = data.map(item => {
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
      setListedEvents(data);
    }
  }, [data]);

  const handleEventClick = (eventData, jsEvent) => {
    // jsEvent가 있으면 기본 동작 방지 (FullCalendar 이벤트에서만 적용)
    if (jsEvent) {
      jsEvent.preventDefault();
      const { id, title, backgroundColor, extendedProps, start, end } = eventData;
      setEventId(id);
      setEventTitle(title);
      setEventColor(backgroundColor);
      setEventHost(extendedProps ? extendedProps.host_department : '');
      setEventDateStart(start);
      setEventDateEnd(end);
    } else {
      // eventData의 구조에 따라 필요한 정보를 추출
      const { id, title, color_code, host_department, start_date, end_date } = eventData;
      setEventId(id);
      setEventTitle(title);
      setEventColor(color_code);
      setEventHost(host_department);
      setEventDateStart(start_date);
      setEventDateEnd(end_date);
    }
  };

  // 로그인 유무에 따른 일정 추가 모달 띄우기 동작
  const openShowModal = () => {
    const token = localStorage.getItem('ziio-token');
    if (token) setShowModal(!showModal);
    else alert("로그인이 필요한 기능입니다");
  }

  // 내 일정 추가(추후에는 DB에 보내기)
  const saveEvent = async (eventData) => {
    if (eventData.end) {
      const endDate = new Date(eventData.end);
      endDate.setHours(23, 59, 59, 999); // 날짜의 시간을 23:59:59.999로 설정
      eventData.end = endDate;
    }

    const resultData = {
      notice_id: eventData.id,
      title: eventData.title,
      memo: eventData.extendedProps.memo,
      url: eventData.url,
      color_code: eventData.backgroundColor,
    }

    const json = JSON.stringify(resultData);
    const SearchData = fetchProjects(json);
    try {
      const result = await SearchData; // Promise가 완료되고 해결될 때까지 대기하고 결과를 얻습니다.
      if (result === "This academic is already added to the MyPage") alert("해당 학사일정이 이미 내 일정에 저장되어 있습니다.");
      else {
        const response = window.confirm("저장된 내 일정을 확인하기 위해 마이페이지로 이동하시겠습니까?")
        if (response) navigate('/myPage')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.text1}>다음 학사일정 목록</div>
        <EventList listedEvents={listedEvents} handleEventClick={handleEventClick} />
        <EventDetail
          eventTitle={eventTitle}
          eventDateStart={eventDateStart}
          eventDateEnd={eventDateEnd}
          eventHost={eventHost}
          eventColor={eventColor}
          onOpen={openShowModal}
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
          eventId={eventId}
          prevData={{
            post: eventPostId,
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
