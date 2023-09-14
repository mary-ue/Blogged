import PropTypes from 'prop-types';
import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useEffect, useState} from 'react';
import {URL_API} from '../../../api/const';

export const Auth = ({token}) => {
  const [auth, setAuth] = useState('');

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(({name, icon_img: iconImg}) => {
        console.log(iconImg);
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({name, img});
      });
  }, [token]);

  return (
    <div className={style.container}>
      {auth.name ? (
        <img src={auth.img} title={auth.name} alt={`Аватар ${auth.name}`} />
      ) : (
        <Text As='a' href={urlAuth}>
          <LoginIcon className={style.svg} />
        </Text>
      )}
    </div>
  );
};

// Определение валидации для свойства auth
Auth.propTypes = {
  token: PropTypes.string,
};
