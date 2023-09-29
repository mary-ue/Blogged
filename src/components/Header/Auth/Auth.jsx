import PropTypes from 'prop-types';
import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useState} from 'react';
import Logout from './Logout';
import {useAuth} from '../../../hooks/useAuth';
import AuthLoader from '../../../UI/Loader';

export const Auth = () => {
  const [auth, loading, clearAuth] = useAuth();
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);

  const handleLogoutBtn = () => {
    console.log('Logout button clicked');
    setShowLogoutBtn(!showLogoutBtn);
  };

  return (
    <div className={style.container}>
      {loading ? (
        <AuthLoader />
      ) : auth.name ? (
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
