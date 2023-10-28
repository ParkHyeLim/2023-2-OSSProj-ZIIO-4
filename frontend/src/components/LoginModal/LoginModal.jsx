import React, { useState } from "react";
import { AiOutlineClose } from 'react-icons/ai'
import styles from './LoginModal.module.scss';
import GoogleLogo from '../../assets/images/GoogleLogo.png'

const LoginModal = ({ onModalClose }) => {

  const handleClose = () => {
    onModalClose(false);
  };

  return (
    <div className={styles.modalBackgound}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.item}>로그인</div>
          <AiOutlineClose className={styles.button} onClick={handleClose} />
        </div>
        <div className={styles.modalButtonContainer}>
          <button className={styles.button}>
            <img src={GoogleLogo} alt="구글" />
            Sign in using Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
