import {createAsyncThunk} from '@reduxjs/toolkit';
import {URL_API} from '../../api/const';
import axios from 'axios';

export const postsRequestAsync = createAsyncThunk('posts/fetch',
  async (newPage, {getState, dispatch}) => {
    const token = getState().tokenReducer.token;
    const after = getState().postsReducer.after;
    const isLast = getState().postsReducer.isLast;

    console.log('start');

    // if (!token || isLoading || isLast) return; //!!!!!!!!!!!
    if (!token || isLast) {
      return;
    }

    let page = getState().postsReducer.page;
    if (newPage) {
      page = newPage;
    }

    return axios({
      method: 'get',
      url: `${URL_API}/${page}?limit=10${after ? `&after=${after}` : ''}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => {
      const after = response.data.data.after;
      const data = response.data.data.children;
      return {after, data};
    })
      .catch(error => {
        console.error(error);
        return {error: error.toString()};
      });
  });
