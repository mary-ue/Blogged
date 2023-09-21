import {useContext, useRef, useState} from 'react';
import {Text} from '../../../UI/Text';
import style from './FormComment.module.css';
import {authContext} from '../../../context/authContext';

export const FormComment = () => {
  const {auth} = useContext(authContext);
  const [isShowTextarea, setIsShowTextarea] = useState(false);
  const textareaRef = useRef(null);

  const handleShowTextarea = () => {
    setIsShowTextarea(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  const handleSubmitClick = (evt) => {
    evt.preventDefault();
    console.log(textareaRef.current.value);
    textareaRef.current.value = '';
    setIsShowTextarea(false);
  };

  return (
    <>
      {isShowTextarea ? (
      <form className={style.form}>
        <Text As="h3" size={14} tsize={18}>{auth.name}</Text>
        <textarea className={style.textarea} ref={textareaRef}></textarea>
        <button
          className={style.btn}
          onClick={handleSubmitClick}
        >
          Отправить
        </button>
      </form>
      ) : (
      <button
        className={style.btn}
        onClick={handleShowTextarea}
      >
        Написать комментарий
      </button>
      )}
    </>
  );
};
