import ReactDOM from 'react-dom';
import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import Markdown from 'markdown-to-jsx';

export const Modal = ({title, author, markdown, closeModal}) => {
  const overlayRef = useRef(null);

  const handleClick = evt => {
    const target = evt.target;
    if (target === overlayRef.current) {
      closeModal();
    }
  };

  const handleEscapeKey = evt => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        <h2 className={style.title}>{title}</h2>
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
            {markdown}
          </Markdown>
        </div>
        <p className={style.author}>{author}</p>
        <button className={style.close} onClick={() => closeModal()}>
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
  closeModal: PropTypes.func,
};

