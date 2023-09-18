import style from './PostImg.module.css';
import PropTypes from 'prop-types';
import notphoto from './img/notphoto.jpg';

export const PostImg = ({title, thumbnail}) => {
  return (
    <img
      className={style.img}
      src={thumbnail === 'default' ? notphoto : thumbnail}
      alt={title}
    />
  );
};

PostImg.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
};
