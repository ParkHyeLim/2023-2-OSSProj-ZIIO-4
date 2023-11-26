import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import { useRecoilState } from 'recoil';
import { loginModalState, loginState } from '../../store/loginStore';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/')[1];
  const [isLoggedin, setIsLoggedin] = useRecoilState(loginState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(loginModalState);

  const handleLogin = () => {
    if (isLoggedin) {
      // 로그아웃 여부 물어보기
      const result = window.confirm('로그아웃 하시겠습니까?');
      if (result) {
        localStorage.removeItem('ziio-token');
        setIsLoggedin(false);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <header>
        <img src={logo} alt="logo" className={styles.logo} />
        <ul className={styles.list}>
          <li className={classNames(styles.item, path === '' ? styles.active : '')} onClick={() => navigate('/')}>
            공지사항
          </li>
          <li
            className={classNames(styles.item, path === 'schoolCalendar' ? styles.active : '')}
            onClick={() => navigate('/schoolCalendar')}>
            학사일정
          </li>
          <li
            className={classNames(styles.item, path === 'myPage' ? styles.active : '')}
            onClick={() => navigate('/myPage')}>
            마이페이지
          </li>
          <li className={classNames(styles.item, styles.active)} onClick={handleLogin}>
            {isLoggedin ? '로그아웃' : '로그인'}
          </li>
        </ul>
      </header>
      <Outlet />
      {isModalOpen && <LoginModal onModalClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;
