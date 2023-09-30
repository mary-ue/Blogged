import {useState} from 'react';
import {Text} from '../../../UI/Text';
import style from './FormComment.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {updateComment} from '../../../store/commentReducer';

export const FormComment = () => {
  const dispatch = useDispatch();
  const value = useSelector(state => state.commentReducer.comment);
  const name = useSelector((state) => state.authReducer.data.name);

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
        <Text As="h3" size={14} tsize={18}>{name}</Text>
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
