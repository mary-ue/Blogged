// import Loader from '../../../UI/Loader';
import {usePosts} from '../../../hooks/usePosts';
import style from './List.module.css';
import Post from './Post';

export const List = () => {
  const [posts, isLoading] = usePosts();
  console.log(isLoading);

  return (
    // isLoading ? (
    //   <Loader size={100} />
    // ) : (
    <ul className={style.list}>
      {
        posts &&
        posts.map(postData => (
          <Post key={postData.data.id} {...postData.data} />
        ))
      }
    </ul>
    // )
  );
};
