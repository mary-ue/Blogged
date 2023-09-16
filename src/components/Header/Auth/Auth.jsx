import PropTypes from 'prop-types';
import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useEffect, useState} from 'react';
import {URL_API} from '../../../api/const';
import Logout from './Logout';

export const Auth = ({token, delToken}) => {
  const [auth, setAuth] = useState('');
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);

  const handleLogoutBtn = () => {
    setShowLogoutBtn(!showLogoutBtn);
  };

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem('bearer');
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then(({name, icon_img: iconImg}) => {
        console.log(iconImg);
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({name, img});
      })
      .catch((error) => {
        if (error.message === 'Unauthorized') {
          console.error('Unauthorized');
        }
        console.error(error);
        setAuth({});
      });
  }, [token]);

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
      {showLogoutBtn && <Logout delToken={delToken} />}
    </div>
  );
};

// Определение валидации для свойства auth
Auth.propTypes = {
  token: PropTypes.string,
  delToken: PropTypes.func,
};
