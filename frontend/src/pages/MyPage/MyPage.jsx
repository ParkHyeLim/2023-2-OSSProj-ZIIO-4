import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './MyPage.module.scss';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import EventDetail from './components/EventDetail';
import { EventModal } from '../../components';
import { calculateDDay } from '../../utils/dateUtils';
import { EventList } from './components/EventList';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginModalState, loginState } from '../../store/loginStore';

const MyPage = () => {
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const isLoggedin = useRecoilValue(loginState);
  const [isLoginModalOpen, setIsLoginModalOpen] = useRecoilState(loginModalState);
  const [events, setEvents] = useState([]);
  const [listedEvents, setListedEvents] = useState([]); // 이미 지난 일정은 리스트에서 제외
  const [eventTitle, setEventTitle] = useState('');
  const [eventDateStart, setEventDateStart] = useState('');
  const [eventDateEnd, setEventDateEnd] = useState('');
  const [eventMemo, setEventMemo] = useState('');
  const [eventUrl, setEventUrl] = useState('');
  const [eventColor, setEventColor] = useState('');
  const [showModal, setShowModal] = useState(false);

  const sortEventsByDate = eventData => {
    return [...eventData].sort((a, b) => {
      const today = new Date();
      const diffA = today - new Date(a.end);
      const diffB = today - new Date(b.end);
      return diffB - diffA;
    });
  };

  const handleAddEventClick = () => {
    setShowModal(true);
  };

  const saveEvent = eventData => {
    if (eventData.end) {
      const endDate = new Date(eventData.end);
      endDate.setHours(23, 59, 59, 999); // 날짜의 시간을 23:59:59.999로 설정
      eventData.end = endDate;
    }
    const updatedEvents = [...events, eventData];
    setEvents(updatedEvents);
    const sortedEvents = sortEventsByDate(updatedEvents);
    setListedEvents(sortedEvents.filter(event => new Date(event.end) >= new Date() || event.end === ''));
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEventClick = (eventData, jsEvent) => {
    // jsEvent가 있으면 기본 동작 방지 (FullCalendar 이벤트에서만 적용)
    if (jsEvent) {
      jsEvent.preventDefault();
    }

    // eventData의 구조에 따라 필요한 정보를 추출
    const { title, url, extendedProps, backgroundColor, start, end } = eventData;

    setEventTitle(title);
    setEventUrl(url);
    setEventMemo(extendedProps ? extendedProps.memo : '');
    setEventColor(backgroundColor);
    setEventDateStart(start);
    setEventDateEnd(end ? end : '');
    console.log(eventData);
  };

  useEffect(() => {
    if (!isLoggedin) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/'); // 홈으로 리다이렉트
      setIsLoginModalOpen(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      {showModal && <EventModal modalTitle={'새 일정 추가'} saveEvent={saveEvent} closeModal={closeModal} />}
      <div className={styles.leftWrapper}>
        <EventList listedEvents={listedEvents} handleEventClick={handleEventClick} />
        <EventDetail
          eventTitle={eventTitle}
          eventDateStart={eventDateStart}
          eventDateEnd={eventDateEnd}
          eventMemo={eventMemo}
          eventUrl={eventUrl}
          eventColor={eventColor}
        />
      </div>
      <FullCalendar
        ref={calendarRef}
        customButtons={{
          add: {
            text: '✨ 새 일정 추가',
            click: handleAddEventClick,
          },
        }}
        initialView="dayGridMonth"
        events={events}
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: '',
          center: 'prev title next',
          right: 'add',
        }}
        titleFormat={({ date }) => `${date.year}. ${date.month + 1}`}
        // eventColor={'#f5a986'}
        editable={false}
        // selectable={true}
        displayEventTime={false}
        eventClick={clickInfo => handleEventClick(clickInfo.event, clickInfo.jsEvent)}
        nextDayThreshold={'00:00:00'}
      />
    </div>
  );
};

export default MyPage;
