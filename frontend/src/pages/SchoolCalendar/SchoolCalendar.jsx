import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import styles from './SchoolCalendar.module.scss';
import { EventModal } from "../../components/EventModal/EventModal";

const SchoolCalendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [listedEvents, setListedEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDateStart, setEventDateStart] = useState('');
  const [eventDateEnd, setEventDateEnd] = useState('');
  const [eventMemo, setEventMemo] = useState('');
  const [eventUrl, setEventUrl] = useState('');
  const [eventColor, setEventColor] = useState('');
  const [showModal, setShowModal] = useState(false);

  //localStorage에서 불러오는 거로 추후에는 백 연동 코드로 변경 예정
  useEffect(() => {
    const data = localStorage.getItem("sample");
    const redata = data ? JSON.parse(data) : '';
    setEvents(redata);
    setListedEvents(redata);
  }, []);

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
    setEventDateEnd(end);
    console.log(title);

  };


  // 내 일정 추가(추후에는 DB에 보내기)
  const saveEvent = (eventData) => {
    if (eventData.end) {
      const endDate = new Date(eventData.end);
      endDate.setHours(23, 59, 59, 999); // 날짜의 시간을 23:59:59.999로 설정
      eventData.end = endDate;
    }

    localStorage.setItem("akakakak", JSON.stringify(eventData));
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <EventList listedEvents={listedEvents} handleEventClick={handleEventClick} />
        <EventDetail
          eventTitle={eventTitle}
          eventDateStart={eventDateStart}
          eventDateEnd={eventDateEnd}
          eventMemo={eventMemo}
          eventUrl={eventUrl}
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
      {
        showModal && <EventModal
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
      }
    </div>
  );
}

export default SchoolCalendar;