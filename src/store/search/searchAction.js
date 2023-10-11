export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS';
export const SEARCH_REQUEST_ERROR = 'SEARCH_REQUEST_ERROR';

export const searchRequest = ({token, search}) => ({
  type: SEARCH_REQUEST,
  token,
  search,
});

export const searchRequestSuccess = ({children, after}) => ({
  type: SEARCH_REQUEST_SUCCESS,
  post: children,
  after
});

export const searchRequestError = (error) => ({
  type: SEARCH_REQUEST_ERROR,
  error,
});
