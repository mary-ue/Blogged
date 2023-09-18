import {useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {useToken} from './useToken';

export const useAuth = () => {
  const [auth, setAuth] = useState('');
  const [token, delToken] = useToken('');

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
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
          localStorage.removeItem('bearer');
          delToken();
          console.error('Unauthorized');
        }
        console.error(error);
        setAuth({});
      });
  }, [token]);

  const clearAuth = () => {
    setAuth({});
    delToken();
  };

  return [auth, clearAuth];
};
