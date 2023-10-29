import React, { useRef, useState } from 'react';
import styles from './MyPage.module.scss';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import EventDetail from './components/EventDetail';
import { AddEventModal } from '../../components';

const MyPage = () => {
  const calendarRef = useRef(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDateStart, setEventDateStart] = useState('');
  const [eventDateEnd, setEventDateEnd] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);

  const handleAddEventClick = () => {
    setShowModal(true);
  };

  const saveEvent = eventData => {
    setEvents([...events, eventData]);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEventClick = clickInfo => {
    /*  if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    } */
    setEventTitle(clickInfo.event.title);
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
      <EventDetail eventTitle={eventTitle} eventDateStart={eventDateStart} eventDateEnd={eventDateEnd} />
      {showModal && <AddEventModal onSave={saveEvent} onClose={closeModal} />}
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
        titleFormat={{ year: 'numeric', month: 'numeric' }}
        eventColor={'#f5a986'}
        editable={true}
        selectable={true}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default MyPage;
