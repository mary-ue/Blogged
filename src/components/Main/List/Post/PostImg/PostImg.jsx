import style from './PostImg.module.css';
import PropTypes from 'prop-types';
import notphoto from './img/notphoto.jpg';

export const PostImg = ({title}) => {
  return (
    <img className={style.img} src={notphoto} alt={title} />
  );
};

PostImg.propTypes = {
  title: PropTypes.string,
};
