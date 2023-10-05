import {
  CHANGE_PAGE,
  POSTS_CLEAR,
  POSTS_REQUEST,
  POSTS_REQUEST_ERROR,
  POSTS_REQUEST_SUCCESS,
  POSTS_REQUEST_SUCCESS_AFTER,
  RESET_COUNT_PAGE
} from './postsAction';

const initialState = {
  isLoading: false,
  data: [],
  error: '',
  after: '',
  isLast: false,
  page: '',
  countPage: 0,
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
        countPage: state.countPage + 1,
      };
    case POSTS_REQUEST_SUCCESS_AFTER:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.data],
        error: '',
        after: action.after,
        isLast: !action.after,
        countPage: state.countPage + 1,
      };
    case POSTS_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        countPage: 0,
      };
    case POSTS_CLEAR:
      return {
        ...state,
        isLoading: false,
        data: [],
        countPage: 0,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
        after: '',
        isLast: false,
        countPage: 0,
      };
    case RESET_COUNT_PAGE:
      return {
        ...state,
        countPage: 0,
      };
    default:
      return state;
  }
};
