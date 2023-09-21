import PropTypes from 'prop-types';
import {Text} from '../../../UI/Text';
import PostTime from '../../Main/List/Post/PostTime';
import style from './Comments.module.css';

export const Comments = ({comments}) => {
  // console.log('comments', comments.length);

  return (
    comments.length ? (
      <ul className={style.list}>
        {comments?.map(comment => {
          return (
            <li
              key={`${comment.author_fullname}-${comment.subreddit_id}`}
              className={style.item}
            >
              <Text As='h3' className={style.author} size={18} tsize={22}>
                {comment.author}
              </Text>
              <Text As='p' className={style.comment} size={14} tsize={18}>
                {comment.body}
              </Text>
              {comment.created &&
                <PostTime created={comment.created} />}
            </li>
          );
        })}
      </ul>
    ) : (
      <Text As="p">Нет комментариев</Text>
    )
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};
