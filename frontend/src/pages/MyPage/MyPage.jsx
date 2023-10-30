import React, { useState } from 'react';
import styles from './MyPage.module.scss';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import classNames from 'classnames';

const MyPage = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDateStart, setEventDateStart] = useState('');
  const [eventDateEnd, setEventDateEnd] = useState('');

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

  const formatDate = date => {
    // 시, 분이 0일 경우에는 출력하지 않음
    if (date.getHours() === 0 && date.getMinutes() === 0) {
      return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    }
    return `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  };

  return (
    <div className={styles.container}>
      {eventTitle && (
        <div className={styles.eventWrapper}>
          <div className={styles.titleWrapper}>
            <div className={classNames(styles.color, styles.colorOrange)}></div>
            <div className={styles.title}>{eventTitle}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.subtitle}>기간</div>
            <div className={styles.content}>
              {formatDate(eventDateStart)} {eventDateEnd && `~ ${formatDate(eventDateEnd)}`}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.subtitle}>메모</div>
            <div className={styles.content}>메모 내용</div>
          </div>
          <div className={styles.row}>
            <div className={styles.subtitle}>URL</div>
            <div className={styles.content}>https://www.naver.com</div>
          </div>
          <button className={styles.button}>일정 편집</button>
        </div>
      )}
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
