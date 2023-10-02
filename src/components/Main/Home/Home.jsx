import {Text} from '../../../UI/Text';
import style from './Home.module.css';

export const Home = () => {
  return (
    <div className={style.wrapper}>
      <Text
        As='p'
        size={22}
        tsize={26}
        bold
      >
        Стартовая страница
      </Text>
      <Text
        As='p'
        size={22}
        tsize={26}
      >
        Добро пожаловать!
      </Text>
      <Text
        As='p'
        size={22}
        tsize={26}
      >
        Выберите категорию
      </Text>
    </div>
  );
};
