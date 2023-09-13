import style from './PostContent.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text';

export const PostContent = ({title, author}) => {
  return (
    <div className={style.content}>
      <Text As="h2" className={style.title}>
        <Text
          As="a"
          size={18}
          tsize={24}
          className={style.linkPost}
          href="post"
        >
          {title}
        </Text>
      </Text>
      <Text
        className={style.linkAuthor}
        href="#author"
        As="a"
        color="orange"
        size={12}
        tsize={14}
      >
        {author}
      </Text>
    </div>
  );
};

PostContent.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
};
