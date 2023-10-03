import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout, authRequestAsync} from '../store/auth/authAction';
import {postsClear} from '../store/posts/postsAction';
import {deleteToken} from '../store/tokenReducer';
// import {usePosts} from '../hooks/usePosts';

export const useAuth = () => {
  const auth = useSelector((state) => state.authReducer.data);
  const token = useSelector((state) => state.tokenReducer.token);
  const loading = useSelector((state) => state.authReducer.loading);
  const dispatch = useDispatch();
  // const [, , delPosts] = usePosts();

  useEffect(() => {
    dispatch(authRequestAsync());
  }, [token, dispatch]);

  const clearAuth = () => {
    dispatch(authLogout());
    localStorage.removeItem('bearer');
    window.history.replaceState({}, document.title, window.location.origin);
    // delPosts();
    dispatch(postsClear());
    dispatch(deleteToken());
  };

  return [auth, loading, clearAuth];
};
