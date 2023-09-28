import style from './List.module.css';
import Post from './Post';
import {useSelector} from 'react-redux';

export const List = () => {
  const posts = useSelector(state => state.postsReducer.data);

  return (
    <ul className={style.list}>
      {posts && posts?.map((postData) => {
        return (
          <Post key={postData.data.id} {...postData.data} />
        );
      }
      )}
    </ul>
  );
};
