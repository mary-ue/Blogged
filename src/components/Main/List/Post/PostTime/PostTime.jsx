import style from './PostTime.module.css';
import PropTypes from 'prop-types';
import formatDate from '../../../../../utils/formatDate';

export const PostTime = ({date}) => {
  return (
    <time className={style.date} dateTime={date}>
      {formatDate(date)}
    </time>
  );
};

PostTime.propTypes = {
  date: PropTypes.string,
};
