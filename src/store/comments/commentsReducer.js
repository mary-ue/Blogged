import {
  COMMENTS_CLEAR,
  COMMENTS_REQUEST, COMMENTS_REQUEST_ERROR, COMMENTS_REQUEST_SUCCESS
} from './commentsAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case COMMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: '',
      };
    case COMMENTS_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case COMMENTS_CLEAR:
      return {
        ...state,
        loading: false,
        data: [],
        error: '',
      };
    default:
      return state;
  }
};

