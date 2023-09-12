import PropTypes from 'prop-types';
import style from './Layout.module.css';

export const Layout = ({children}) => {
  return (
    <div className={style.container}>
      {children}
    </div>
  );
};

// Определение валидации для свойства children
Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};
