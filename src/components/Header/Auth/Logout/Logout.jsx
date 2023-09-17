import style from './Logout.module.css';
import PropTypes from 'prop-types';

export const Logout = ({delToken, setAuth, setShowLogoutBtn}) => {
  const handleLogout = () => {
    if (delToken) {
      delToken();
      setAuth({});
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
  setAuth: PropTypes.func,
  setShowLogoutBtn: PropTypes.func,
};
