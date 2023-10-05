import {createAsyncThunk} from '@reduxjs/toolkit';
import {URL_API, USER_AGENT} from '../../api/const';
// import postsSlice from './postsSlice';
// import {changePage} from './postsSlice';

export const postsRequestAsync = createAsyncThunk('posts/fetch',
  (newPage, {getState, dispatch}) => {
    let page = getState().postsReducer.page;
    if (newPage) {
      page = newPage;
      // dispatch(changePage(page));
    }

    const token = getState().tokenReducer.token;
    // console.log('token: ', token);
    const after = getState().postsReducer.after;
    // console.log('after: ', after);
    // const isLoading = getState().postsReducer.isLoading;
    // console.log('isLoading: ', isLoading);
    // const isLast = getState().postsReducer.isLast;
    // console.log('isLast: ', isLast);

    // if (!token || isLoading || isLast) return;

    // dispatch(postsRequest());

    fetch(
      `${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'User-Agent': USER_AGENT,
        },
      }).then(response => response.json())
      .then(posts => {
        console.log('posts.data: ', posts.data);
        return posts.data;
      })
      .catch(error => {
        console.error(error.message);
        return error.message;
      });
  });
