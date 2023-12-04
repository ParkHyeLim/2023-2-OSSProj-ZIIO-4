import React, { useEffect } from 'react';
import styles from '../SchoolCalendar.module.scss';
import { calculateDDay } from '../../../utils/dateUtils';

const EventList = ({ listedEvents, handleEventClick }) => {
  const nowDate = new Date().toISOString().slice(0, 10).replace(/-/g, '.');
  return (
    <div className={styles.eventList}>
      {listedEvents?.map(event => (
        event.start_date > nowDate && (
          <div key={event.defId} className={styles.eventListRow} onClick={() => handleEventClick(event)}>
            <div className={styles.eventColor} style={{ backgroundColor: event.color_code }}></div>
            <div className={styles.eventText}>{event.title}</div>
            <div className={styles.eventDday}>{calculateDDay(event.end_date !== null ? event.end_date : event.start_date)}</div>
          </div>
        )
      ))}
    </div>
  );
};

export default EventList;
