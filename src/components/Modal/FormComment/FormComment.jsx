import {useState} from 'react';
import {Text} from '../../../UI/Text';
import style from './FormComment.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {updateComment} from '../../../store/commentReducer';
import {useAuth} from '../../../hooks/useAuth';

export const FormComment = () => {
  const value = useSelector(state => state.commentReducer.comment);
  const dispatch = useDispatch();

  const [auth] = useAuth();
  const [isShowTextarea, setIsShowTextarea] = useState(false);

  const handleShowTextarea = () => {
    setIsShowTextarea(true);
  };

  const handleChange = (evt) => {
    dispatch(updateComment(evt.target.value));
  };

  const handleSubmitClick = (evt) => {
    evt.preventDefault();
    // setIsShowTextarea(false);
    console.log(value);
  };

  return (
    <>
      {isShowTextarea ? (
      <form className={style.form}>
        <Text As="h3" size={14} tsize={18}>{auth.name}</Text>
        <textarea
          className={style.textarea}
          value={value}
          onChange={handleChange}
        />
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
