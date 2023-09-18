import style from './PostTime.module.css';
import PropTypes from 'prop-types';
import formatDate from '../../../../../utils/formatDate';

export const PostTime = ({created}) => {
  return (
    <time className={style.date} dateTime={created}>
      {formatDate(created)}
    </time>
  );
};

PostTime.propTypes = {
  created: PropTypes.number,
};
