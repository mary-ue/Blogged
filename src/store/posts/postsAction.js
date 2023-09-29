import {URL_API, USER_AGENT} from '../../api/const';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
export const POSTS_CLEAR = 'POSTS_CLEAR';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});

export const postsRequestSucess = (data) => ({
  type: POSTS_REQUEST_SUCCESS,
  data,
});

export const postsRequestError = (error) => ({
  type: POSTS_REQUEST_ERROR,
  error,
});

export const postsClear = () => ({
  type: POSTS_CLEAR,
});

export const postsRequestAsync = () => (dispatch, getState) => {
  const token = getState().tokenReducer.token;
  if (!token) return;

  dispatch(postsRequest());

  fetch(`${URL_API}/best`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': USER_AGENT,
    },
  }).then(response => response.json())
    .then(posts => {
      dispatch(postsRequestSucess(posts.data.children));
    })
    .catch(error => {
      dispatch(postsRequestError(error));
      console.error(error.message);
    });
};
