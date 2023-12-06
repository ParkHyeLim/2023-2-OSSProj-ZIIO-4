import React, { useState } from 'react';
import styles from '../MyPage.module.scss';
import classNames from 'classnames';
import editIcon from '../../../assets/icons/edit.svg';
import { formatDate } from '../../../utils/dateUtils';
import { EventModal } from '../../../components';
import { useMutation, useQueryClient } from 'react-query';
import { updateMyEvent } from '../../../api/mypageAPI';

const EventDetail = ({ event, clearEvent }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false); // 일정 편집 모달의 열림/닫힘 상태
  const { mutate: updateEvent } = useMutation(event => updateMyEvent(event), {
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });

  // 풀캘린더 전용 데이터 포맷이 인수로 들어옴
  const saveEvent = eventData => {
    if (eventData.end) {
      const endDate = new Date(eventData.end);
      endDate.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
      eventData.end = endDate;
    }

    updateEvent(eventData);
    clearEvent();
    setIsModalOpen(false);
  };

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
          {event.start == null && event.end == null ? (
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
          saveEvent={saveEvent}
          closeModal={() => setIsModalOpen(false)}
          prevData={{
            ...event, // extendedProps에 마이페이지 id가 있음
            start: event.start ? event.start : new Date(Date.now()),
            end: event.end ? event.end : new Date(Date.now()),
          }}
          isDeleteActive={true}
        />
      )}
    </div>
  );
};

export default EventDetail;
