import {URL_API} from '../../api/const';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_REQUEST_SUCCESS = 'COMMENTS_REQUEST_SUCCESS';
export const COMMENTS_REQUEST_ERROR = 'COMMENTS_REQUEST_ERROR';
export const COMMENTS_CLEAR = 'COMMENTS_CLEAR';

export const commentsRequest = () => ({
  type: COMMENTS_REQUEST,
});

export const commentsRequestSuccess = (data) => ({
  type: COMMENTS_REQUEST_SUCCESS,
  data,
});

export const commentsRequestError = (error) => ({
  type: COMMENTS_REQUEST_ERROR,
  error,
});

export const commentsClear = () => ({
  type: COMMENTS_CLEAR,
});

export const commentsRequestAsync = (id) => (dispatch, getState) => {
  const token = getState().tokenReducer.token;
  if (!token || !id) return;

  dispatch(commentsRequest());

  fetch(`${URL_API}/comments/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(
      ([
        {
          data: {
            children: [{data: post}],
          },
        },
        {
          data: {
            children,
          },
        },
      ]) => {
        const comments = children.map(item => item.data);
        dispatch(commentsRequestSuccess([post, comments]));
      },
    )
    .catch((err) => {
      dispatch(commentsRequestError());
      console.error(err);
    });
};
