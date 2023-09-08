import PropTypes from 'prop-types';
import style from './Heading.module.css';

export const Heading = ({text}) => {
  return (
    <h2 className={style.heading}>
      {text}
    </h2>
  );
};

// Определение валидации для свойства text
Heading.propTypes = {
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
