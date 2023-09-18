import style from './Post.module.css';
import PropTypes from 'prop-types';
import PostImg from './PostImg';
import PostContent from './PostContent';
import PostRating from './PostRating';
import PostTime from './PostTime';
import RemoveButton from './RemoveButton';

export const Post = (props) => {
  const {title, author, ups, created} = props;
  const imgUrl = props?.thumbnail;

  return (
    <li className={style.post}>
      <PostImg imgUrl={imgUrl} title={title} />
      <PostContent title={title} author={author} />
      <PostRating ups={ups} />
      <PostTime created={created} />
      <RemoveButton />
    </li>
  );
};

Post.propTypes = {
  props: PropTypes.object,
  title: PropTypes.string,
  author: PropTypes.string,
  ups: PropTypes.number,
  created: PropTypes.string,
  thumbnail: PropTypes.object,
};
