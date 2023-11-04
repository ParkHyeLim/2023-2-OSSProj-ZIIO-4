import React from 'react';
import styles from '../MyPage.module.scss';
import classNames from 'classnames';
import editIcon from '../../../assets/icons/edit.svg';
import { formatDate } from '../../../utils/dateUtils';

const EventDetail = ({ eventTitle, eventDateStart, eventDateEnd, eventMemo, eventUrl, eventColor }) => {
  return (
    <div className={classNames(styles.eventWrapper, eventTitle === '' && styles.invisible)}>
      <div className={styles.titleWrapper}>
        <div className={styles.eventColor} style={{ backgroundColor: eventColor }} />
        <div className={styles.title}>{eventTitle}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.subtitleWrapper}>
          <div className={styles.subtitle}>기간</div>
        </div>
        <div className={styles.content}>
          {eventDateStart === '' && eventDateEnd === '' ? (
            '없음'
          ) : (
            <>
              {formatDate(eventDateStart)} ~ {eventDateEnd ? formatDate(eventDateEnd) : formatDate(eventDateStart)}
            </>
          )}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.subtitleWrapper}>
          <div className={styles.subtitle}>메모</div>
        </div>
        <div className={styles.content}>{eventMemo ? eventMemo : '없음'}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.subtitleWrapper}>
          <div className={styles.subtitle}>URL</div>
        </div>
        <div className={styles.content}>
          {eventUrl ? (
            <a href={eventUrl} target="_blank" rel="noreferrer">
              {eventUrl}
            </a>
          ) : (
            '없음'
          )}
        </div>
      </div>
      <button className={styles.button}>
        <img src={editIcon} alt="edit" className={styles.icon} />
        일정 편집
      </button>
    </div>
  );
};

export default EventDetail;
