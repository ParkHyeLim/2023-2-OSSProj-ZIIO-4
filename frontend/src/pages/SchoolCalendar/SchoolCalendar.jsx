import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { EventDetail, EventList } from './components';
import styles from '../MyPage/MyPage.module.scss';
import { EventModal } from '../../components';
import { useNavigate } from 'react-router-dom';
import { addEventAcademics, getAcademics } from '../../api/schoolCalendarAPI';
import { formatDateToYMD } from '../../utils/dateUtils';

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
  const academicsQuery = useQuery('academics', getAcademics, {
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  // 받아온 데이터를 fullcalendar에 넣기 위한 데이터 형태 커스텀
  useEffect(() => {
    if (events.length === 0 && academicsQuery && academicsQuery.data) {
      const transformedEvents = academicsQuery.data.map(item => {
        const start = formatDateToYMD(item.start_date);
        const end = formatDateToYMD(item.end_date);
        return {
          id: item.id,
          title: item.title,
          start: start,
          end: end,
          backgroundColor: item.color_code,
          extendedProps: { host_department: item.host_department },
        };
      });
      setEvents(transformedEvents);
      setListedEvents(academicsQuery.data);
    }
  }, [academicsQuery]);

  // 데이터 초기화
  function clearEvent() {
    setEventPostId('');
    setEventId('');
    setEventTitle('');
    setEventDateStart('');
    setEventDateEnd('');
    setEventHost('');
    setEventColor('');
  }

  // fullCalendar를 누르면 해당 데이터를 가져오는 함수
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
    else alert('로그인이 필요한 기능입니다');
  };

  // 내 일정 추가(추후에는 DB에 보내기)
  const saveEvent = async eventData => {
    if (eventData.end) {
      const endDate = new Date(eventData.end);
      endDate.setHours(23, 59, 59, 999); // 날짜의 시간을 23:59:59.999로 설정
      eventData.end = endDate;
    }

    const resultData = {
      academic_id: eventData.id,
      start_date: dayjs(eventData.start).format('YYYY.MM.DD'),
      end_date: dayjs(eventData.end).format('YYYY.MM.DD'),
      title: eventData.title,
      memo: eventData.extendedProps.memo,
      url: eventData.url,
      color_code: eventData.backgroundColor,
    };

    try {
      const SearchData = addEventAcademics(resultData);
      const result = await SearchData;
      if (result) {
        console.log("zja", result);
        const response = window.confirm('저장된 내 일정을 확인하기 위해 마이페이지로 이동하시겠습니까?');
        if (response) navigate('/myPage');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <EventList listedEvents={listedEvents} handleEventClick={handleEventClick} />
      <EventDetail
        eventTitle={eventTitle}
        eventDateStart={eventDateStart}
        eventDateEnd={eventDateEnd}
        eventHost={eventHost}
        eventColor={eventColor}
        onOpen={openShowModal}
        clearEvent={clearEvent}
      />
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
