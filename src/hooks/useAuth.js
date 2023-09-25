import {useContext, useEffect, useState} from 'react';
import {URL_API} from '../api/const';
// import {tokenContext} from '../context/tokenContext';
import {postsContext} from '../context/postsContext';
import {useDispatch, useSelector} from 'react-redux';
import {deleteToken, updateToken} from '../store/tokenReducer';

export const useAuth = () => {
  const [auth, setAuth] = useState('');
  // const {token, delToken} = useContext(tokenContext);
  const token = useSelector(state => state.tokenReducer.token);
  const dispatch = useDispatch();
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
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({name, img});
        dispatch(updateToken(token));
      })
      .catch((error) => {
        if (error.message === 'Unauthorized') {
          localStorage.removeItem('bearer');
          dispatch(deleteToken());
          window.history.replaceState({},
            document.title, window.location.origin);
          console.error('Unauthorized');
        }
        console.error(error);
        setAuth({});
      });
  }, [token]);

  const clearAuth = () => {
    setAuth({});
    dispatch(deleteToken());
    localStorage.removeItem('bearer');
    window.history.replaceState({}, document.title, window.location.origin);
    delPosts();
  };

  return [auth, clearAuth];
};
