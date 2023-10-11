import {
  SEARCH_REQUEST,
  SEARCH_REQUEST_ERROR,
  SEARCH_REQUEST_SUCCESS
} from './searchAction';

const initialState = {
  isLoading: false,
  data: [],
  error: '',
  after: '',
  isLast: false,
  page: '',
  countPage: 0,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.posts,
        error: '',
        after: action.after,
      };
    case SEARCH_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};


