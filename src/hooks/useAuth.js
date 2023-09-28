import {useContext, useEffect} from 'react';
// import {tokenContext} from '../context/tokenContext';
import {postsContext} from '../context/postsContext';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout, authRequestAsync} from '../store/auth/authAction';

export const useAuth = () => {
  const auth = useSelector((state) => state.authReducer.data);
  // const {token, delToken} = useContext(tokenContext);
  const token = useSelector((state) => state.tokenReducer.token);
  const loading = useSelector((state) => state.authReducer.loading);
  const dispatch = useDispatch();
  const {delPosts} = useContext(postsContext);

  useEffect(() => {
    dispatch(authRequestAsync());
  }, [token]);

  const clearAuth = () => {
    dispatch(authLogout());
    localStorage.removeItem('bearer');
    window.history.replaceState({}, document.title, window.location.origin);
    delPosts();
  };

  return [auth, loading, clearAuth];
};
