import style from './Logout.module.css';
import PropTypes from 'prop-types';

export const Logout = ({delToken, clearAuth, setShowLogoutBtn}) => {
  const handleLogout = () => {
    if (delToken) {
      delToken();
      clearAuth({});
      setShowLogoutBtn(false);
    }
  };

  return (
    <button className={style.logout} onClick={handleLogout}>
      Выйти
    </button>
  );
};

Logout.propTypes = {
  delToken: PropTypes.func,
  clearAuth: PropTypes.func,
  setShowLogoutBtn: PropTypes.func,
};
