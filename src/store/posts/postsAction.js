import {URL_API, USER_AGENT} from '../../api/const';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_SUCCESS_AFTER = 'POSTS_REQUEST_SUCCESS_AFTER';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
export const POSTS_CLEAR = 'POSTS_CLEAR';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});

export const postsRequestSucess = (data) => ({
  type: POSTS_REQUEST_SUCCESS,
  data: data.children,
  after: data.after,
});

export const postsRequestSucessAfter = (data) => ({
  type: POSTS_REQUEST_SUCCESS_AFTER,
  data: data.children,
  after: data.after,
});

export const postsRequestError = (error) => ({
  type: POSTS_REQUEST_ERROR,
  error,
});

export const postsClear = () => ({
  type: POSTS_CLEAR,
});

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  page,
});

export const postsRequestAsync = (newPage) => (dispatch, getState) => {
  let page = getState().postsReducer.page;
  if (newPage) {
    page = newPage;
    dispatch(changePage(page));
  }

  const token = getState().tokenReducer.token;
  const after = getState().postsReducer.after;
  const isLoading = getState().postsReducer.isLoading;
  const isLast = getState().postsReducer.isLast;

  if (!token || isLoading || isLast) return;

  dispatch(postsRequest());

  fetch(`${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': USER_AGENT,
    },
  }).then(response => response.json())
    .then(posts => {
      if (after) {
        dispatch(postsRequestSucessAfter(posts.data));
      } else {
        dispatch(postsRequestSucess(posts.data));
      }
    })
    .catch(error => {
      dispatch(postsRequestError(error));
      console.error(error.message);
    });
};
