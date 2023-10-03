// import {
//   COMMENTS_CLEAR,
//   COMMENTS_REQUEST, COMMENTS_REQUEST_ERROR, COMMENTS_REQUEST_SUCCESS
// } from './commentsAction';

// const initialState = {
//   loading: false,
//   data: [],
//   error: '',
//   status: null,
// };

// export const commentsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case COMMENTS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: '',
//         status: 'loading',
//       };
//     case COMMENTS_REQUEST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.data,
//         error: '',
//         status: 'loaded',
//       };
//     case COMMENTS_REQUEST_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.error,
//         status: 'error',
//       };
//     case COMMENTS_CLEAR:
//       return {
//         ...state,
//         loading: false,
//         data: [],
//         error: '',
//         status: null,
//       };
//     default:
//       return state;
//   }
// };

