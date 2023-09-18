import style from './Logout.module.css';
import PropTypes from 'prop-types';

export const Logout = ({clearAuth, setShowLogoutBtn}) => {
  const handleLogout = () => {
    clearAuth({});
    setShowLogoutBtn(false);
  };

  return (
    <button className={style.logout} onClick={handleLogout}>
      Выйти
    </button>
  );
};

Logout.propTypes = {
  clearAuth: PropTypes.func,
  setShowLogoutBtn: PropTypes.func,
};
