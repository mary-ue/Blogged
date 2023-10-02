import {useEffect, useRef} from 'react';
import Loader from '../../../UI/Loader';
import style from './List.module.css';
import Post from './Post';
import {useDispatch, useSelector} from 'react-redux';
import {postsRequestAsync} from '../../../store/posts/postsAction';

export const List = () => {
  const posts = useSelector(state => state.postsReducer.data);
  const isLoading = useSelector(state => state.postsReducer.isLoading);
  const endList = useRef(null);
  const dispatch = useDispatch();
  console.log(endList);

  useEffect(() => {
    if (endList.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(postsRequestAsync());
          // .then(() => {
          //   window.scrollTo({
          //     top: window.scrollY + 100,
          //     behavior: 'smooth',
          //   });
          // });
        }
      }, {
        rootMargin: '100px',
      });
      observer.observe(endList.current);

      // return () => {
      //   observer.disconnect();
      // };
    }
  }, [endList.current]);

  return (
    isLoading ? (
      <Loader size={100} />
    ) : (
    <ul className={style.list}>
      {
        posts &&
        posts.map(postData => (
          <Post key={postData.data.id} {...postData.data} />
        ))
      }
      <li ref={endList} className={style.end} />
    </ul>
    )
  );
};
