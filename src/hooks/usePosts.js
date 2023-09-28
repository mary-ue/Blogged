import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {postsRequestAsync, postsClear} from '../store/posts/postsAction';

export const usePosts = () => {
  const token = useSelector(state => state.tokenReducer.token);
  const posts = useSelector(state => state.postsReducer.data);
  const dispatch = useDispatch();

  const delPosts = () => {
    dispatch(postsClear());
  };

  useEffect(() => {
    dispatch(postsRequestAsync());
  }, [token, dispatch]);

  return [posts, delPosts];
};
