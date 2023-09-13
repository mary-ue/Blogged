import PropTypes from 'prop-types';
import style from './Heading.module.css';
import {Text} from '../../../UI/Text';

export const Heading = ({text}) => {
  return (
    <Text
      className={style.heading}
      As='h1'
      size={22}
      tsize={26}
      center
    >
      {text}
    </Text>
  );
};

// Определение валидации для свойства text
Heading.propTypes = {
  text: PropTypes.string,
};
