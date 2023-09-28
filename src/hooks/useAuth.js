import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout, authRequestAsync} from '../store/auth/authAction';
import {usePosts} from '../hooks/usePosts';

export const useAuth = () => {
  const auth = useSelector((state) => state.authReducer.data);
  const token = useSelector((state) => state.tokenReducer.token);
  const loading = useSelector((state) => state.authReducer.loading);
  const dispatch = useDispatch();
  const [, delPosts] = usePosts();

  useEffect(() => {
    dispatch(authRequestAsync());
  }, [token, dispatch]);

  const clearAuth = () => {
    dispatch(authLogout());
    localStorage.removeItem('bearer');
    window.history.replaceState({}, document.title, window.location.origin);
    delPosts();
  };

  return [auth, loading, clearAuth];
};
