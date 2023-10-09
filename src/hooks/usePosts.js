import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {postsRequestAsync} from '../store/posts/postsAction';

export const usePosts = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.tokenReducer.token);
  const posts = useSelector(state => state.postsReducer.data);
  const isLoading = useSelector(state => state.postsReducer.isLoading);
  const page = useSelector(state => state.postsReducer.page);

  // const delPosts = () => {
  //   dispatch(postsClear());
  // };

  useEffect(() => {
    // if (!page) return;      // !ВЕРНУТЬ
    dispatch(postsRequestAsync(page));
  }, [token]);

  return [posts, isLoading];
};
