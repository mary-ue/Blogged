import {createSlice} from '@reduxjs/toolkit';
import {postsRequestAsync} from './postsAction';

const initialState = {
  isLoading: false,
  data: [],
  error: '',
  after: '',
  isLast: false,
  page: '',
  countPage: 0,
};

export const postsSlice = createSlice({
  name: 'postsReducer',
  initialState,
  reducers: {
    postsClear: (state) => {
      state.isLoading = false;
      state.data = [];
      state.countPage = 0;
    },
    changePage: (state, action) => {
      state.page = action.payload.page;
      state.after = '';
      state.isLast = false;
      state.countPage = 0;
    },
    resetCountPage: (state) => {
      state.countPage = 0;
    },
  },
  extraReducers: {
    [postsRequestAsync.pending.type]: (state) => {
      // console.log('pending: ', state.isLoading);
      state.isLoading = true;
      state.error = '';
      // console.log('pending: ', state.isLoading);
    },
    [postsRequestAsync.fulfilled.type]: (state, action) => {
      // console.log('fulfilled: ', action);
      state.isLoading = false;
      state.after = action.payload?.after || '';
      state.data = state.after ?
        [...state.data, ...action.payload?.data.children || []] : state.data;
      state.error = '';
      state.isLast = !state.after;
      state.countPage += 1;
      console.log('fulfilled: ', action.payload);
    },
    [postsRequestAsync.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.countPage = 0;
      console.error('Rejected error:', action.error);
    },
  },
});

export const {postsClear, changePage, resetCountPage} = postsSlice.actions;

export default postsSlice.reducer;

