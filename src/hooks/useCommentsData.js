import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  commentsClear,
  commentsRequestAsync
} from '../store/comments/commentsAction';

export const useCommentsData = (id) => {
  const commentsData = useSelector(state => state.commentsReducer.data);
  const dispatch = useDispatch();

  const clearCommentsData = () => {
    dispatch(commentsClear());
  };

  useEffect(() => {
    dispatch(commentsRequestAsync(id));
  }, [id, dispatch]);

  return [commentsData, clearCommentsData];
};
