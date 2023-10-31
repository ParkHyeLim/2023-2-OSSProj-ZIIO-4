import React from 'react';
import styles from '../MyPage.module.scss';
import classNames from 'classnames';
import editIcon from '../../../assets/icons/edit.svg';

const EventDetail = ({ eventTitle, eventDateStart, eventDateEnd, eventMemo, eventUrl, eventColor }) => {
  const formatDate = date => {
    if (date === '') return '';
    // 시, 분이 0일 경우에는 출력하지 않음
    if (date.getHours() === 0 && date.getMinutes() === 0) {
      return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    }
    return `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  };

  return (
    <div className={classNames(styles.eventWrapper, eventTitle === '' && styles.invisible)}>
      <div className={styles.titleWrapper}>
        <div className={styles.color} style={{ backgroundColor: eventColor }} />
        <div className={styles.title}>{eventTitle}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.subtitleWrapper}>
          <div className={styles.subtitle}>기간</div>
        </div>
        <div className={styles.content}>
          {formatDate(eventDateStart)} {eventDateEnd && `~ ${formatDate(eventDateEnd)}`}
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
