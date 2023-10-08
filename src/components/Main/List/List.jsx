import {useEffect, useRef} from 'react';
import Loader from '../../../UI/Loader';
import style from './List.module.css';
import Post from './Post';
import {useDispatch, useSelector} from 'react-redux';
// import {postsRequest} from '../../../store/posts/postsAction';
import {postsSlice} from '../../../store/posts/postsSlice';
import {Outlet, useParams} from 'react-router-dom';
import {postsRequestAsync} from '../../../store/posts/postsAction';

export const List = () => {
  const posts = useSelector(state => state.postsReducer.data);
  const isLoading = useSelector(state => state.postsReducer.isLoading);
  const after = useSelector(state => state.postsReducer.after);
  const endList = useRef(null);
  const dispatch = useDispatch();
  const {page} = useParams();
  const countPage = useSelector((state) => state.postsReducer.countPage);
  // const [observeActive, setObserveActive] = useState(true);
  // const [isShowMoreBtn, setIsShowMoreBtn] = useState(false);

  // const handleMorePosts = () => {
  //   dispatch(postsSlice.actions.resetCountPage());
  //   setObserveActive(true);
  //   setIsShowMoreBtn(false);
  // };

  useEffect(() => {
    if (countPage === 3) {
      dispatch(postsSlice.actions.resetCountPage());
      // setObserveActive(false);
      // setIsShowMoreBtn(true);
    }
  }, [countPage]);

  useEffect(() => {
    dispatch(postsRequestAsync(page));
    dispatch(postsSlice.actions.postsClear());
    dispatch(postsSlice.actions.resetCountPage());
  }, [page]);

  useEffect(() => {
    // if (endList.current && observeActive) {
    if (endList.current) {
      const observer = new IntersectionObserver((entries) => {
        if (posts && entries[0].isIntersecting && endList.current) {
          console.log('postsRequestAsync');
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
  // }, [endList.current, observeActive]);
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
        {
        /*  isShowMoreBtn &&
            <button className={style.btn} onClick={handleMorePosts}>
              Загрузить больше постов
            </button> */
        }
        <Outlet />
      </>
  )
  );
};
