import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './MyPage.module.scss';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { EventDetail, EventList } from './components';
import { EventModal } from '../../components';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginModalState, loginState } from '../../store/loginStore';
import instance from '../../api/instance';
import axios from 'axios';
import { useQuery } from 'react-query';
import { getUser } from '../../api/userAPI';
import { sortEventsByDate } from '../../utils/dateUtils';

const MyPage = () => {
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const isLoggedin = useRecoilValue(loginState);
  const [isLoginModalOpen, setIsLoginModalOpen] = useRecoilState(loginModalState);
  const [events, setEvents] = useState([]);
  const [listedEvents, setListedEvents] = useState([]); // 이미 지난 일정은 리스트에서 제외
  const [event, setEvent] = useState({ title: '', url: '', memo: '', color: '', start: '', end: '' }); // 선택된 이벤트 정보를 담는 객체
  const [showModal, setShowModal] = useState(false); // 일정 추가 모달을 보여줄지 여부

  const userData = useQuery('events', () => getUser());

  // 일정 추가 버튼을 눌렀을 때 일정 추가 모달을 보여주는 함수
  const handleAddEventClick = () => {
    setShowModal(true);
  };

  // 일정 추가 모달에서 일정을 저장하는 함수
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

    // 구글 캘린더에 일정 추가
    createGoogleEvent(eventData);
  };

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
        Authorization: `Bearer ${userData.data.accessToken}`,
      },
    });
    console.log(response);
  };

  // 일정 추가 모달을 닫는 함수
  const closeModal = () => {
    setShowModal(false);
  };

  // 선택한 이벤트의 상세 정보를 보여주는 함수
  const handleEventClick = (eventData, jsEvent) => {
    // jsEvent가 있으면 기본 동작 방지 (FullCalendar 이벤트에서만 적용)
    if (jsEvent) {
      jsEvent.preventDefault();
    }

    // eventData의 구조에 따라 필요한 정보를 추출
    const { title, url, extendedProps, backgroundColor, start, end } = eventData;

    setEvent({
      title,
      url,
      memo: extendedProps ? extendedProps.memo : '',
      color: backgroundColor,
      start,
      end: end ? end : '',
    });
    // console.log(eventData);
  };

  // 로그인이 되어있지 않으면 홈으로 리다이렉트
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
          eventTitle={event.title}
          eventDateStart={event.start}
          eventDateEnd={event.end}
          eventMemo={event.memo}
          eventUrl={event.url}
          eventColor={event.color}
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
