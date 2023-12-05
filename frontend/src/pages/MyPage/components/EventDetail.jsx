import React, { useState } from 'react';
import styles from '../MyPage.module.scss';
import classNames from 'classnames';
import editIcon from '../../../assets/icons/edit.svg';
import { formatDate } from '../../../utils/dateUtils';
import { EventModal } from '../../../components';

const EventDetail = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 일정 편집 모달의 열림/닫힘 상태

  console.log('eventdetail', event);
  return (
    <div className={classNames(styles.eventWrapper, event.title === '' && styles.invisible)}>
      <div className={styles.titleWrapper}>
        <div
          className={styles.eventColor}
          style={{ backgroundColor: event.color || event.backgroundColor || event.color_code }}
        />
        <div className={styles.title}>{event.title}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.subtitleWrapper}>
          <div className={styles.subtitle}>기간</div>
        </div>
        <div className={styles.content}>
          {event.start == null || event.end == null ? (
            '없음'
          ) : (
            <>
              {formatDate(event.start)} ~ {event.end ? formatDate(event.end) : formatDate(event.start)}
            </>
          )}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.subtitleWrapper}>
          <div className={styles.subtitle}>메모</div>
        </div>
        <div className={styles.content}>{event.memo ? event.memo : '없음'}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.subtitleWrapper}>
          <div className={styles.subtitle}>URL</div>
        </div>
        <div className={styles.content}>
          {!event.url || event.url === 'null' ? (
            '없음'
          ) : (
            <a href={event.url} target="_blank" rel="noreferrer">
              {event.url}
            </a>
          )}
        </div>
      </div>
      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
        <img src={editIcon} alt="edit" className={styles.icon} />
        일정 편집
      </button>
      {/* 일정 편집 모달 */}
      {isModalOpen && (
        <EventModal
          modalTitle={'일정 편집'}
          saveEvent={() => {}}
          closeModal={() => setIsModalOpen(false)}
          prevData={event}
          isDeleteActive={true}
        />
      )}
    </div>
  );
};

export default EventDetail;
