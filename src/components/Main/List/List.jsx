import Loader from '../../../UI/Loader';
import style from './List.module.css';
import Post from './Post';
import {useSelector} from 'react-redux';

export const List = () => {
  const posts = useSelector(state => state.postsReducer.data);
  const isLoading = useSelector(
    state => state.postsReducer.status === 'loading');

  return (
    <ul className={style.list}>
      {isLoading ? (
        <Loader size={100} />
      ) : (
        posts &&
        posts.map(postData => (
          <Post key={postData.data.id} {...postData.data} />
        ))
      )}
    </ul>
  );
};
