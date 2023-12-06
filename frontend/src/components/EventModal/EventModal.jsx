// 새 이벤트를 추가하는 모달 또는 폼 컴포넌트
import React, { useEffect, useState } from 'react';
import styles from './EventModal.module.scss';
import closeIcon from '../../assets/icons/close.svg';
import { ConfigProvider, DatePicker } from 'antd';
import { colors } from '../../constants/eventColors';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from 'react-query';
import { deleteMyEvent } from '../../api/mypageAPI';

const { RangePicker } = DatePicker;

// prevData: 1 depth
export const EventModal = ({ eventId, modalTitle, saveEvent, closeModal, prevData, isDeleteActive, clearEvent }) => {
  const queryClient = useQueryClient();
  const mypageId = prevData ? prevData.my_page_id : null;
  const [title, setTitle] = useState(prevData && prevData.title !== '' ? prevData.title : '');
  const [start, setStart] = useState(prevData && prevData.start !== '' ? prevData.start : '');
  const [end, setEnd] = useState(prevData && prevData.end !== '' ? prevData.end : '');
  const [memo, setMemo] = useState(prevData && prevData.memo !== '' ? prevData.memo : '');
  const [url, setUrl] = useState(prevData && prevData.url !== '' ? prevData.url : '');
  const [color, setColor] = useState(prevData && prevData.color !== '' ? prevData.color : '');
  const [isMouseDownInside, setIsMouseDownInside] = useState(false);
  const { mutate: deleteMutate } = useMutation(eventId => deleteMyEvent(eventId), {
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
  // const location = window.location.pathname;

  const deleteEvent = mypageId => {
    // 삭제할건지 물어보기
    if (!window.confirm('일정을 삭제하시겠습니까?')) {
      return;
    }

    deleteMutate(mypageId);
    closeModal();
    clearEvent();

    alert('삭제되었습니다.');
  };

  const handleMouseDownInside = () => {
    setIsMouseDownInside(true);
  };

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget && !isMouseDownInside) {
      closeModal();
    }
    // 마우스를 떼는 순간에 상태를 초기화
    setIsMouseDownInside(false);
  };

  const handleColorClick = event => {
    setColor(colors[event.target.getAttribute('name')]);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (title === '') {
      alert('일정명을 입력해주세요');
      return;
    }

    if ((start !== '' || end !== '') && color === '') {
      alert('색상을 선택해주세요');
      return;
    }

    // 풀캘린더 전용 데이터 포맷으로 변환
    saveEvent({
      id: eventId,
      title,
      start,
      end,
      url,
      backgroundColor: color,
      extendedProps: {
        memo,
        my_page_id: mypageId,
      },
    });
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            /* here is your component tokens */
            cellActiveWithRangeBg: 'rgba(234, 85, 20, 0.1)',
            activeBorderColor: 'var(--orange)',
            activeShadow: '0 0 0 2px rgba(234, 85, 20, 0.1)',
            hoverBorderColor: 'var(--orange)',
            cellRangeBorderColor: 'var(--orange)',
          },
        },
      }}>
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <form onSubmit={handleSubmit} className={styles.container} onMouseDown={handleMouseDownInside}>
          <h1 className={styles.title}>{modalTitle}</h1>
          <img src={closeIcon} alt="close" className={styles.close} onClick={closeModal} />
          <div>
            <label className={styles.label}>일정명</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="일정명을 입력해주세요"
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.label}>메모</label>
            <input
              type="text"
              value={memo}
              onChange={e => setMemo(e.target.value)}
              placeholder="메모를 입력해주세요"
              className={styles.input}
            />
          </div>
          {url && url !== 'null' && (
            <div>
              <label className={styles.label}>URL</label>
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="URL을 입력해주세요"
                className={styles.input}
              />
            </div>
          )}
          <div>
            <label className={styles.label}>기간 </label>
            <div className={styles.wrapper}>
              <RangePicker
                defaultValue={prevData ? [dayjs(start), dayjs(end)] : [dayjs(new Date()), dayjs(new Date())]}
                onChange={dates => {
                  console.log(dates);
                  if (dates.length === 2) {
                    // 첫 번째 날짜의 시, 분, 초를 0으로 설정
                    const startDate = new Date(dates[0].$d);
                    startDate.setHours(0, 0, 0, 0);

                    // 두 번째 날짜의 시, 분, 초를 23:59:59.999로 설정
                    const endDate = new Date(dates[1].$d);
                    endDate.setHours(23, 59, 59, 999);

                    setStart(startDate);
                    setEnd(endDate);
                  }
                }}
              />
            </div>
          </div>
          <div>
            <label className={styles.label}>색상</label>
            <div className={styles.colorWrapper}>
              {Object.keys(colors).map(key => (
                <div
                  key={key}
                  name={key}
                  className={classNames(styles.color, {
                    [styles.colorActive]: color === colors[key],
                  })}
                  style={{ backgroundColor: colors[key] }}
                  onClick={handleColorClick}></div>
              ))}
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.button}>
              저장
            </button>
            {isDeleteActive && (
              <button type="button" className={styles.removeButton} onClick={() => deleteEvent(mypageId)}>
                삭제
              </button>
            )}
          </div>
        </form>
      </div>
    </ConfigProvider>
  );
};
