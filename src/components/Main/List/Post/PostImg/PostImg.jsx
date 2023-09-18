import style from './PostImg.module.css';
import PropTypes from 'prop-types';
import notphoto from './img/notphoto.jpg';

export const PostImg = ({title, imgUrl}) => {
  console.log(typeof imgUrl);
  return (
    <img
      className={style.img}
      src={imgUrl === 'default' ? notphoto : imgUrl}
      alt={title}
    />
  );
};

PostImg.propTypes = {
  title: PropTypes.string,
  imgUrl: PropTypes.string,
};
