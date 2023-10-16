import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import styles from './Header.module.scss';
import classNames from 'classnames';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/')[1];

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
          <li className={classNames(styles.item, styles.active)} onClick={() => navigate('/login')}>
            로그인
          </li>
        </ul>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
