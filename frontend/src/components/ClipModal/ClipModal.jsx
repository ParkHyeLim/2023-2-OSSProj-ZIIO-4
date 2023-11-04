import React, { useState } from "react";
import { AiOutlineClose } from 'react-icons/ai'
import styles from './ClipModal.module.scss';

const ClipModal = ({ onModalClose }) => {

  const handleClose = () => {
    onModalClose(false);
  };

  return (
    <div className={styles.modalBackgound}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.item}>일정 등록 여부 확인</div>
          <AiOutlineClose className={styles.button} onClick={handleClose} />
        </div>
        <div className={styles.modalButtonContainer}>
          <button className={styles.button}>스크랩만 하기</button>
          <button className={styles.button}>일정 등록</button>
        </div>
      </div>
    </div>
  );
};

export default ClipModal;
