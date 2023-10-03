import {createAsyncThunk} from '@reduxjs/toolkit';
import {URL_API} from '../../api/const';
// import {commentsSlice} from './commentsSlice';

export const commentsRequestAsync = createAsyncThunk('comments/fetch',
  (id, {getState}) => {
    const token = getState().tokenReducer.token;
    if (!token || !id) return;

    return fetch(`${URL_API}/comments/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(
        ([
          {
            data: {
              children: [{data: post}],
            },
          },
          {
            data: {
              children,
            },
          },
        ]) => {
          const comments = children.map(item => item.data);
          // console.log([post, comments]);
          return [post, comments];
        },
      )
      .catch((error) => {
        console.error(error);
        return {error: error.toString()};
      });
  });
