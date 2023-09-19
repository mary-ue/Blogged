import {useContext, useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {tokenContext} from '../context/tokenContext';
import {postsContext} from '../context/postsContext';

export const useAuth = () => {
  const [auth, setAuth] = useState('');
  const {token, delToken} = useContext(tokenContext);
  const {delPosts} = useContext(postsContext);

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
    delPosts();
  };

  return [auth, clearAuth];
};
