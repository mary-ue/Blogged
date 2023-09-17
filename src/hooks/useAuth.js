import {useEffect, useState} from 'react';
import {URL_API} from '../api/const';

export const useAuth = (token) => {
  const [auth, setAuth] = useState('');

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

  const clearAuth = () => setAuth({});

  return [auth, clearAuth];
};
