import style from './RemoveButton.module.css';
import {ReactComponent as RemoveIcon} from './img/delete.svg';

export const RemoveButton = () => {
  return (
    <button className={style.delete}>
      <RemoveIcon />
    </button>
  );
};
