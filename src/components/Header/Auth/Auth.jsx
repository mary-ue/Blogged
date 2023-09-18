import PropTypes from 'prop-types';
import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useContext, useState} from 'react';
import Logout from './Logout';
import {authContext} from '../../../context/authContext';

export const Auth = () => {
  const {auth, clearAuth} = useContext(authContext);
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);

  const handleLogoutBtn = () => {
    setShowLogoutBtn(!showLogoutBtn);
  };

  return (
    <div className={style.container}>
      {auth.name ? (
        <button className={style.btn} onClick={handleLogoutBtn}>
          <img
            className={style.img}
            src={auth.img}
            title={auth.name}
            alt={`Аватар ${auth.name}`}
          />
        </button>
      ) : (
        <Text
          className={style.authLink}
          As='a'
          href={urlAuth}
        >
          <LoginIcon className={style.svg} />
        </Text>
      )}
      {showLogoutBtn &&
        <Logout
          clearAuth={clearAuth}
          setShowLogoutBtn={setShowLogoutBtn}
        />}
    </div>
  );
};

// Определение валидации для свойства auth
Auth.propTypes = {
  token: PropTypes.string,
};
