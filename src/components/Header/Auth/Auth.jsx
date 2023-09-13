import PropTypes from 'prop-types';
import style from './Auth.module.css';
import {ReactComponent as Login} from './img/login.svg';

export const Auth = ({auth}) => {
  return (
    <button className={style.button}>
      {auth ? (
        auth
      ) : (
        <Login className={style.svg} />
      )}
    </button>
  );
};

// Определение валидации для свойства auth
Auth.propTypes = {
  auth: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
};
