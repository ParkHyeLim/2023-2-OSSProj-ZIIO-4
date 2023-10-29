// 새 이벤트를 추가하는 모달 또는 폼 컴포넌트
import React, { useState } from 'react';
import styles from './AddEventModal.module.scss';
import closeIcon from '../../assets/icons/close.svg';
import { ConfigProvider, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export const AddEventModal = ({ onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [isMouseDownInside, setIsMouseDownInside] = useState(false);

  const handleMouseDownInside = () => {
    setIsMouseDownInside(true);
  };

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget && !isMouseDownInside) {
      onClose();
    }
    // 마우스를 떼는 순간에 상태를 초기화
    setIsMouseDownInside(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSave({
      id: Date.now(),
      title,
      start,
      end,
      allDay: !start.includes('T'),
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
          <h1 className={styles.title}>새 일정 추가</h1>
          <img src={closeIcon} alt="close" className={styles.close} onClick={onClose} />
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
              // value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="메모를 입력해주세요"
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.label}>URL</label>
            <input
              type="text"
              // value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="URL을 입력해주세요"
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.label}>기간 </label>
            <div className={styles.wrapper}>
              {/* <DatePicker onChange={(_, dateString) => setStart(dateString)} />
              ~
              <DatePicker onChange={(_, dateString) => setEnd(dateString)} /> */}
              <RangePicker
                onChange={(_, dateString) => {
                  setStart(dateString[0]);
                  setEnd(dateString[1]);
                }}
              />
            </div>
          </div>
          <div>
            <label className={styles.label}>색상</label>
            <input
              type="text"
              // value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="색상"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            일정 추가
          </button>
        </form>
      </div>
    </ConfigProvider>
  );
};

export default AddEventModal;
