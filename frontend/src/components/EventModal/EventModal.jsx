// 새 이벤트를 추가하는 모달 또는 폼 컴포넌트
import React, { useState } from 'react';
import styles from './EventModal.module.scss';
import closeIcon from '../../assets/icons/close.svg';
import { ConfigProvider, DatePicker } from 'antd';
import { colors } from '../../constants/eventColors';
import classNames from 'classnames';

const { RangePicker } = DatePicker;

export const EventModal = ({ modalTitle, saveEvent, closeModal }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [memo, setMemo] = useState('');
  const [url, setUrl] = useState('');
  const [color, setColor] = useState('');
  const [isMouseDownInside, setIsMouseDownInside] = useState(false);

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

    saveEvent({
      id: Date.now(),
      title,
      start: start,
      end: end,
      url,
      backgroundColor: color,
      extendedProps: {
        memo,
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
          <div>
            <label className={styles.label}>기간 </label>
            <div className={styles.wrapper}>
              <RangePicker
                onChange={dates => {
                  if (dates.length === 2) {
                    // 첫 번째 날짜의 시, 분, 초를 0으로 설정
                    const startDate = new Date(dates[0].$d);
                    startDate.setHours(0, 0, 0, 0);

                    // 두 번째 날짜의 시, 분, 초를 0으로 설정
                    const endDate = new Date(dates[1].$d);
                    endDate.setHours(0, 0, 0, 0);

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
          <button type="submit" className={styles.button}>
            일정 추가
          </button>
        </form>
      </div>
    </ConfigProvider>
  );
};
