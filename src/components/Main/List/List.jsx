import {useEffect, useRef} from 'react';
import Loader from '../../../UI/Loader';
import style from './List.module.css';
import Post from './Post';
import {useDispatch, useSelector} from 'react-redux';
import {postsRequestAsync} from '../../../store/posts/postsAction';
import {Outlet, useParams} from 'react-router-dom';

export const List = () => {
  const posts = useSelector(state => state.postsReducer.data);
  const isLoading = useSelector(state => state.postsReducer.isLoading);
  const after = useSelector(state => state.postsReducer.after);
  const endList = useRef(null);
  const dispatch = useDispatch();
  const {page} = useParams();

  useEffect(() => {
    dispatch(postsRequestAsync(page));
  }, [page]);

  useEffect(() => {
    if (endList.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(postsRequestAsync());
        }
      }, {
        rootMargin: '100px',
      });
      observer.observe(endList.current);

      return () => {
        if (endList.current) {
          observer.unobserve(endList.current);
        }
      };
    }
  }, [endList.current]);

  return (
    (isLoading && !after) ? (
      <Loader size={100} />
    ) : (
      <>
        <ul className={style.list}>
          {
            posts &&
            posts.map(postData => (
              <Post key={postData.data.id} {...postData.data} />
            ))
          }
          <li ref={endList} className={style.end} />
        </ul>
        <Outlet />
      </>
  )
  );
};
