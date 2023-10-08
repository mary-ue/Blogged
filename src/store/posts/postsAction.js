import {createAsyncThunk} from '@reduxjs/toolkit';
import {URL_API, USER_AGENT} from '../../api/const';
import {postsSlice} from './postsSlice';
// import {changePage} from './postsSlice';
// import postsSlice from './postsSlice';

export const postsRequestAsync = createAsyncThunk('posts/fetch',
  async (newPage, {getState, dispatch}) => {
    // console.log('newPage: ', newPage);

    if (!newPage) return;
    let page = getState().postsReducer.page;
    if (newPage) {
      page = newPage;
      dispatch(postsSlice.actions.changePage(page));
    }

    // console.log('page: ', page);

    const token = getState().tokenReducer.token;
    // console.log('token: ', token);
    const after = getState().postsReducer.after;
    // console.log('after: ', after);
    const isLoading = getState().postsReducer.isLoading;
    // console.log('isLoading: ', isLoading);
    const isLast = getState().postsReducer.isLast;
    // console.log('isLast: ', isLast);

    if (!token || !isLoading || isLast) return;

    // dispatch(postsRequest());

    return fetch(
      `${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'User-Agent': USER_AGENT,
        },
      }).then(response => response.json())
      .then(posts => {
        // console.log('posts.data: ',
        //   {after: posts.data.after, data: posts.data.children});
        return {after: posts.data.after, data: posts.data.children};
      })
      .catch(error => {
        console.error(error.message);
        return {error: error.toString()};
      });
  });
