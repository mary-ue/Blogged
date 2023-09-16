import style from './Logout.module.css';
import PropTypes from 'prop-types';

export const Logout = ({delToken}) => {
  return (
    <button className={style.logout} onClick={delToken}>
      Выйти
    </button>
  );
};

Logout.propTypes = {
  delToken: PropTypes.func,
};
