import {Text} from '../../../UI/Text';
import style from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div className={style.wrapper}>
      <Text
        color='orange'
        bold
        size={26}
        tsize={26}
      >
        404
      </Text>
    </div>
  );
};
