import style from './Post.module.css';
import PropTypes from 'prop-types';
import PostImg from './PostImg';
import PostContent from './PostContent';
import PostRating from './PostRating';
import PostTime from './PostTime';
import RemoveButton from './RemoveButton';

export const Post = ({postData}) => {
  const {title, author, ups, date} = postData;

  return (
    <li className={style.post}>
      <PostImg title={title} />
      <PostContent title={title} author={author} />
      <PostRating ups={ups} />
      <PostTime date={date} />
      <RemoveButton />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
