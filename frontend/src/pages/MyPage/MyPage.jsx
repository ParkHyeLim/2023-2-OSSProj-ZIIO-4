import React, { useRef, useState } from 'react';
import styles from './MyPage.module.scss';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import EventDetail from './components/EventDetail';
import { EventModal } from '../../components';

const MyPage = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDateStart, setEventDateStart] = useState('');
  const [eventDateEnd, setEventDateEnd] = useState('');
  const [eventMemo, setEventMemo] = useState('');
  const [eventUrl, setEventUrl] = useState('');
  const [eventColor, setEventColor] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAddEventClick = () => {
    setShowModal(true);
  };

  const saveEvent = eventData => {
    setEvents([...events, eventData]);
    setShowModal(false);
    console.log(eventData);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEventClick = clickInfo => {
    clickInfo.jsEvent.preventDefault();

    setEventTitle(clickInfo.event.title);
    setEventUrl(clickInfo.event.url);
    setEventMemo(clickInfo.event.extendedProps.memo);
    setEventColor(clickInfo.event.backgroundColor);
    if (clickInfo.event.end === null) {
      setEventDateStart(clickInfo.event.start);
      setEventDateEnd('');
    } else {
      setEventDateStart(clickInfo.event.start);
      setEventDateEnd(clickInfo.event.end);
    }
    console.log(clickInfo);
  };

  return (
    <div className={styles.container}>
      <EventDetail
        eventTitle={eventTitle}
        eventDateStart={eventDateStart}
        eventDateEnd={eventDateEnd}
        eventMemo={eventMemo}
        eventUrl={eventUrl}
        eventColor={eventColor}
      />
      {showModal && <EventModal modalTitle={'새 일정 추가'} onSave={saveEvent} onClose={closeModal} />}
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
        editable={true}
        selectable={true}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default MyPage;
