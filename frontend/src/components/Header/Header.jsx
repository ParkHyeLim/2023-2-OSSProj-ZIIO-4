import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import logo_mobile from '../../assets/images/logo_mobile.png';
import menu from '../../assets/icons/menu.png';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import { useRecoilState } from 'recoil';
import { loginModalState, loginState } from '../../store/loginStore';
import { useMediaQuery } from 'react-responsive';
import eventModalStyles from '../EventModal/EventModal.module.scss';
import closeIcon from '../../assets/icons/close.svg';

export const Header = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/')[1];
  const [isHeaderVisible, setIsHeaderVisible] = useState(false); // 모바일에서 헤더 메뉴를 보여줄지 여부
  const [isLoggedin, setIsLoggedin] = useRecoilState(loginState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(loginModalState); // 로그인 모달을 보여줄지 여부

  const handleLogin = () => {
    if (isLoggedin && !isMobile) {
      setIsHeaderVisible(false);
      // 로그아웃 여부 물어보기
      const result = window.confirm('로그아웃 하시겠습니까?');
      if (result) {
        localStorage.removeItem('ziio-token');
        setIsLoggedin(false);
        window.location.reload();
      }
    } else {
      setIsHeaderVisible(false);
      setIsModalOpen(true);
    }

    if (isMobile) {
      window.location.href = process.env.REACT_APP_SERVER_URL + '/oauth2/authorization/google';
    }
  };

  const handleNavigate = path => {
    setIsHeaderVisible(false);
    navigate(path);
  };

  return (
    <>
      {isMobile ? (
        <header className={styles.header}>
          <img src={logo_mobile} alt="logo" className={styles.logo} />
          <img src={menu} alt="menu" className={styles.menu} onClick={() => setIsHeaderVisible(!isHeaderVisible)} />
          {isHeaderVisible && (
            <div className={eventModalStyles.overlay}>
              <img
                src={closeIcon}
                alt="close"
                onClick={() => setIsHeaderVisible(false)}
                className={styles.closeButton}
              />
              <ul className={styles.list}>
                <li className={styles.item} onClick={() => handleNavigate('')}>
                  공지사항
                </li>
                <li className={styles.item} onClick={() => handleNavigate('schoolCalendar')}>
                  학사일정
                </li>
                <li className={styles.item} onClick={() => handleNavigate('myPage')}>
                  마이페이지
                </li>
                <li className={styles.item} onClick={handleLogin}>
                  {isLoggedin ? '로그아웃' : '로그인'}
                </li>
              </ul>
            </div>
          )}
        </header>
      ) : (
        <header className={styles.header}>
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
      )}
      <Outlet />
      {isModalOpen && !isMobile && <LoginModal onModalClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;
