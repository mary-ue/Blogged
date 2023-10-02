import {
  CHANGE_PAGE,
  POSTS_CLEAR,
  POSTS_REQUEST,
  POSTS_REQUEST_ERROR,
  POSTS_REQUEST_SUCCESS,
  POSTS_REQUEST_SUCCESS_AFTER
} from './postsAction';

const initialState = {
  isLoading: false,
  data: [],
  error: '',
  after: '',
  isLast: false,
  page: '',
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: '',
        after: action.after,
        isLast: !action.after,
      };
    case POSTS_REQUEST_SUCCESS_AFTER:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.data],
        error: '',
        after: action.after,
        isLast: !action.after,
      };
    case POSTS_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case POSTS_CLEAR:
      return {
        ...state,
        isLoading: false,
        data: [],
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
        after: '',
        isLast: false,
      };
    default:
      return state;
  }
};
