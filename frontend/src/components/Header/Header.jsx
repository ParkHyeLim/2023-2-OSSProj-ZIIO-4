import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import styles from './Header.module.scss';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  return (
    <>
      <header>
        <img src={logo} alt="logo" className={styles.logo} />
        <ul className={styles.list}>
          <li className={`${styles.item} ${path === '/' ? styles.selected : ''}`} onClick={() => navigate('/')}>
            공지사항
          </li>
          <li
            className={`${styles.item} ${path === '/schoolCalendar' ? styles.selected : ''}`}
            onClick={() => navigate('/schoolCalendar')}>
            학사일정
          </li>
          <li
            className={`${styles.item} ${path === '/myPage' ? styles.selected : ''}`}
            onClick={() => navigate('/myPage')}>
            마이페이지
          </li>
          <li
            className={`${styles.item} ${path === '/login' ? styles.selected : ''}`}
            onClick={() => navigate('/login')}>
            로그인
          </li>
        </ul>
      </header>
      <Outlet />
    </>
  );
};
