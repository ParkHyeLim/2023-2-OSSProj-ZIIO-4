import React from 'react';
import styles from '../MyPage.module.scss';
import { calculateDDay } from '../../../utils/dateUtils';

const EventList = ({ listedEvents, handleEventClick }) => {
  return (
    <div className={styles.eventList}>
      {listedEvents?.map(event => (
        <div key={event.defId} className={styles.eventListRow} onClick={() => handleEventClick(event)}>
          <div className={styles.eventColor} style={{ backgroundColor: event.color }}></div>
          <div className={styles.eventText}>{event.title}</div>
          {(event.end || event.start) && (
            <div className={styles.eventDday}>{calculateDDay(event.end || event.start)}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;
