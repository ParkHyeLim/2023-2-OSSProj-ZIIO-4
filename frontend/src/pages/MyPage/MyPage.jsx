import React from 'react';
import styles from './MyPage.module.scss';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

const MyPage = () => {
  const handleEventClick = clickInfo => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };
  return (
    <div className={styles.container}>
      <FullCalendar
        customButtons={{
          add: {
            text: '✨ 새 일정 추가',
            click: function () {
              alert('clicked the custom button!');
            },
          },
        }}
        initialView="dayGridMonth"
        events={[
          { title: 'event 1', date: '2023-10-16' },
          { title: 'event 2', start: '2023-10-03', end: '2023-10-07' },
          { title: 'event 3', start: '2023-10-02T12:30:00', allDay: false },
          { title: 'event 4', start: '2023-10-04T12:30:00', allDay: false },
          { title: 'event 5', start: '2023-10-26', end: '2023-10-29' },
          { title: 'event 6', start: '2023-10-19T12:30:00', allDay: false },
        ]}
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
