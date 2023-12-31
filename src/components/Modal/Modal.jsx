import ReactDOM from 'react-dom';
import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import Markdown from 'markdown-to-jsx';
// import {useCommentsData} from '../../hooks/useCommentsData';
import {Text} from '../../UI/Text';
import {FormComment} from './FormComment/FormComment';
import {Comments} from './Comments/Comments';
import {useDispatch, useSelector} from 'react-redux';
import {
  commentsRequestAsync
} from '../../store/comments/commentsAction';
import {useNavigate, useParams} from 'react-router-dom';
// import {commentsSlice} from '../../store/comments/commentsSlice';

export const Modal = () => {
  const {id, page} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const commentsData = useSelector(state => state.commentsReducer.data);
  const status = useSelector(state => state.commentsReducer.status);
  // console.log(commentsData);
  // const data = useSelector(state => state.commentsReducer);
  // console.log('data: ', data);
  const post = commentsData[0];
  const comments = commentsData[1];
  const overlayRef = useRef(null);

  const handleClick = evt => {
    const target = evt.target;
    if (target === overlayRef.current) {
      navigate(`/category/${page}`);
    }
  };

  const handleEscapeKey = evt => {
    if (evt.key === 'Escape') {
      navigate(`/category/${page}`);
    }
  };

  // useEffect(() => {
  //   console.log('Modal rendered');
  // }, []);

  useEffect(() => {
    dispatch(commentsRequestAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscapeKey);
      // dispatch(commentsSlice.actions.commentsClear());
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {status === 'loading' && (<Text size={26} bold>Загрузка...</Text>)}
        {status === 'error' && (<Text size={26} bold>Ошибка...</Text>)}
        {status === 'loaded' && (
          <>
            <h2 className={style.title}>{post?.title}</h2>
            <div className={style.content}>
              <Markdown options={{
                overrides: {
                  a: {
                    props: {
                      target: '_blank'
                    },
                  },
                },
              }}>
                {post?.selftext}
              </Markdown>
            </div>
            <Text As='p' className={style.author}>{post?.author}</Text>
            <FormComment />
            {comments && comments.length > 0 &&
              <Comments comments={comments} />}
            <button
              className={style.close}
              onClick={() => navigate(`/category/${page}`)}
            >
              <CloseIcon />
            </button>
          </>
        )}
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  id: PropTypes.string,
};
