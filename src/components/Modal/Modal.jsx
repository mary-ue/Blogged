import ReactDOM from 'react-dom';
import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import Markdown from 'markdown-to-jsx';
import {useCommentsData} from '../../hooks/useCommentsData';
import {Text} from '../../UI/Text';
import {FormComment} from './FormComment/FormComment';
import {Comments} from './Comments/Comments';

export const Modal = ({closeModal, id}) => {
  const [commentsData, clearCommentsData] = useCommentsData(id);
  const [isLoading, setIsLoading] = useState(true);
  const post = commentsData[0];
  const comments = commentsData[1];
  const overlayRef = useRef(null);

  const handleClick = evt => {
    const target = evt.target;
    if (target === overlayRef.current) {
      closeModal();
      clearCommentsData();
    }
  };

  const handleEscapeKey = evt => {
    if (evt.key === 'Escape') {
      closeModal();
      clearCommentsData();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscapeKey);
    console.log('Modal');

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (commentsData.length > 0) {
      setIsLoading(false);
    }
  }, [commentsData]);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {isLoading ? (
          <Text size={26} bold>Загрузка...</Text>
        ) : (
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
              {post.selftext}
            </Markdown>
          </div>
          <Text As='p' className={style.author}>{post?.author}</Text>
          <FormComment />
          <Comments comments={comments} />
          <button className={style.close} onClick={() => closeModal()}>
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

