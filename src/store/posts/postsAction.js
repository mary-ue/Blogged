import {createAsyncThunk} from '@reduxjs/toolkit';
import {URL_API} from '../../api/const';
import {postsSlice} from './postsSlice';
import axios from 'axios';
// import {changePage} from './postsSlice';
// import postsSlice from './postsSlice';

export const postsRequestAsync = createAsyncThunk('posts/fetch',
  async (newPage, {getState, dispatch}) => {
    // console.log('newPage: ', newPage);

    // if (!newPage) return;
    let page = getState().postsReducer.page;

    if (newPage !== page) {
      dispatch(postsSlice.actions.changePage(page));
    }

    if (newPage) {
      page = newPage;
    }

    console.log('page:::::::::::::::::::::: ', page);

    // console.log('page: ', page);

    const token = getState().tokenReducer.token;
    // console.log('token: ', token);
    const after = getState().postsReducer.after;
    // console.log('after: ', after);
    const isLoading = getState().postsReducer.isLoading;
    console.log('isLoading: ', isLoading);
    const isLast = getState().postsReducer.isLast;
    // console.log('isLast: ', isLast);

    console.log('start');

    // if (!token || isLoading || isLast) return; //!!!!!!!!!!!
    if (!token || isLast) return;

    console.log('finish');

    // dispatch(postsRequest());

    return axios({
      method: 'get',
      url: `${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        // 'User-Agent': USER_AGENT,
      },
    }).then(response => {
      const after = response.data.data.after;
      const data = response.data.data.children;
      return {after, data};
    })
    // .then(response => response.json())
    //   .then(posts => {
    //     // console.log('posts.data: ',
    //     //   {after: posts.data.after, data: posts.data.children});
    //     // console.log('posts::::::::::::::::', posts);
    //     // return {after: posts.data.after, data: posts.data.children};
    //   })
      .catch(error => {
        console.error(error);
        return {error: error.toString()};
      });
  });
