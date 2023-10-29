import React from 'react';
import styles from '../MyPage.module.scss';
import classNames from 'classnames';
import editIcon from '../../../assets/icons/edit.svg';

const EventDetail = ({ eventTitle, eventDateStart, eventDateEnd }) => {
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
      <button className={styles.button}>
        <img src={editIcon} alt="edit" className={styles.icon} />
        일정 편집
      </button>
    </div>
  );
};

export default EventDetail;
