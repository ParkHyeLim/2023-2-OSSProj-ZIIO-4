import React from 'react';
import styles from '../../MyPage/MyPage.module.scss';
import classNames from 'classnames';
import { formatDate } from '../../../utils/dateUtils';
import { AiOutlinePlus } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import closeIcon from '../../../assets/icons/close.svg';

const EventDetail = ({ eventTitle, eventDateStart, eventDateEnd, eventHost, eventColor, onOpen, clearEvent }) => {
  const isMax1150px = useMediaQuery({ query: '(max-width: 1150px)' });

  return (
    <div className={classNames(styles.eventWrapper, eventTitle === '' && styles.invisible)}>
      {isMax1150px ? (
        <div className={styles.titleWrapper}>
          <div className={styles.eventColor} style={{ backgroundColor: eventColor }} />
          <div className={styles.title}>{eventTitle}</div>
          <button className={styles.closeButton} onClick={clearEvent}>
            <img src={closeIcon} alt="close" onClick={clearEvent} />
          </button>
        </div>
      ) : (
        <div className={styles.titleWrapper}>
          <div className={styles.eventColor} style={{ backgroundColor: eventColor }} />
          <div className={styles.title}>{eventTitle}</div>
        </div>
      )}
      <div className={styles.row}>
        <div className={styles.subtitleWrapper}>
          <div className={styles.subtitle}>기간</div>
        </div>
        <div className={styles.content}>
          {eventDateEnd
            ? `${formatDate(eventDateStart)} ~ ${formatDate(eventDateEnd)}`
            : `${formatDate(eventDateStart)}`}
        </div>
      </div>
      {eventHost !== '' && <div className={styles.content}>{eventHost}</div>}
      <button className={styles.button} onClick={() => onOpen()}>
        <AiOutlinePlus className={styles.plusIcon} />내 일정 추가
      </button>
    </div>
  );
};

export default EventDetail;
