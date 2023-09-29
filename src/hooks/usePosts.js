import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {postsRequestAsync, postsClear} from '../store/posts/postsAction';

export const usePosts = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.tokenReducer.token);
  const posts = useSelector(state => state.postsReducer.data);
  const isLoading = useSelector(state => state.postsReducer.isLoading);

  const delPosts = () => {
    dispatch(postsClear());
  };

  useEffect(() => {
    dispatch(postsRequestAsync());
  }, [token, dispatch]);

  return [posts, isLoading, delPosts];
};
