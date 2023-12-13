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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getUser } from '../../api/userAPI';
import { sortEventsByDate } from '../../utils/dateUtils';
import { getMyEvents, addMyEvent } from '../../api/mypageAPI';
import dayjs from 'dayjs';
import useGoogleCalendar from '../../hook/useGoogleCalendar';

const MyPage = () => {
  const { data: userData } = useQuery(['user'], () => getUser());
  const { data: events } = useQuery(['events'], () => getMyEvents(), {
    select: data => {
      const newData = data.map(event => {
        const { my_page_id, title, url, memo, color_code: color, start_date, end_date } = event;
        const start = start_date ? dayjs(start_date, 'YYYY-MM-DD').toDate() : null;
        const end = end_date
          ? dayjs(end_date, 'YYYY-MM-DD').hour(23).minute(59).toDate() // 여기에서 시간을 23시 59분으로 설정
          : start_date && dayjs(start_date, 'YYYY-MM-DD').toDate();

        return { title, url, memo, color, start, end, my_page_id };
      });
      return newData;
    },
    onSuccess: data => {
      const sortedEvents = sortEventsByDate(data);
      updateListedEvents(sortedEvents);
    },
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const { mutate: addEvent } = useMutation(event => addMyEvent(event), {
    onSuccess: () => {
      clearEvent();
      queryClient.invalidateQueries('events');
    },
  });

  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const { createGoogleEvent } = useGoogleCalendar(userData);
  const isLoggedin = useRecoilValue(loginState);
  const [isLoginModalOpen, setIsLoginModalOpen] = useRecoilState(loginModalState);
  const [listedEvents, setListedEvents] = useState([]); // 이미 지난 일정은 리스트에서 제외
  const [event, setEvent] = useState({ title: '', url: null, memo: '', color: '', start: '', end: '', my_page_id: '' }); // 선택된 이벤트 정보를 담는 객체
  const [showModal, setShowModal] = useState(false); // 일정 추가 모달을 보여줄지 여부
  const queryClient = useQueryClient();

  function clearEvent() {
    setEvent({ title: '', url: null, memo: '', color: '', start: '', end: '', my_page_id: '' });
  }

  // 일정 추가 버튼을 눌렀을 때 일정 추가 모달을 보여주는 함수
  const handleAddEventClick = () => {
    setShowModal(true);
  };

  // ListedEvents를 업데이트하는 함수
  function updateListedEvents(sortedEvents) {
    setListedEvents(
      sortedEvents?.filter(event => new Date(event.end) >= new Date() || event.end == null || event.start == null),
    );
  }

  // 일정 추가 모달에서 일정을 저장하는 함수
  // eventData는 풀캘린더 전용 데이터 포맷
  const saveEvent = (eventData, type) => {
    if (eventData.end) {
      const endDate = new Date(eventData.end);
      endDate.setHours(23, 59, 59, 999); // 날짜의 시간을 23:59:59.999로 설정
      eventData.end = endDate;
    }

    addEvent(eventData);
    setShowModal(false);
    createGoogleEvent(eventData);
  };

  // 일정 추가 모달을 닫는 함수
  const closeModal = () => {
    setShowModal(false);
  };

  // 선택한 이벤트의 상세 정보를 보여주는 함수
  const handleEventClick = (eventData, jsEvent) => {
    console.log(eventData);
    // jsEvent가 있으면 기본 동작 방지 (FullCalendar 이벤트에서만 적용)
    if (jsEvent) {
      jsEvent.preventDefault();
    }

    // eventData의 구조는 풀캘린더에서 나온 구조이거나 useQuery로 받아온 구조
    const { title, url, extendedProps, memo, backgroundColor, color, start, end, my_page_id } = eventData;

    // EventDetail에 표시할 정보를 담는 객체를 업데이트
    setEvent({
      my_page_id: extendedProps?.my_page_id || my_page_id,
      title,
      url,
      memo: extendedProps?.memo || memo,
      color: backgroundColor || color,
      start: start || null,
      end: end || null,
    });
  };

  const getMyGoogleEvents = async () => {
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
      },
    });
    const data = await response.json();
    console.log('구글 캘린더에서 받아온 일정', data);
  };

  // 로그인이 되어있지 않으면 홈으로 리다이렉트
  useEffect(() => {
    if (!isLoggedin) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/'); // 홈으로 리다이렉트
      setIsLoginModalOpen(true);
    }

    getMyGoogleEvents();
  }, []);

  return (
    <div className={styles.container}>
      {showModal && <EventModal modalTitle={'새 일정 추가'} saveEvent={saveEvent} closeModal={closeModal} />}
      <EventList listedEvents={listedEvents} handleEventClick={handleEventClick} />
      <EventDetail event={event} clearEvent={clearEvent} />
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
        eventColor={'#e5e7eb'}
        displayEventTime={false}
        eventClick={clickInfo => handleEventClick(clickInfo.event, clickInfo.jsEvent)}
        nextDayThreshold={'00:00:00'}
      />
    </div>
  );
};

export default MyPage;
