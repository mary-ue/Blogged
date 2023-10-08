import {createSlice} from '@reduxjs/toolkit';
// import {produce} from 'immer';
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
  name: 'posts',
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
    [postsRequestAsync.pending.type]: (state, action) => {
      // console.log('pending: ', action);
      state.isLoading = true;
      state.error = '';
    },
    [postsRequestAsync.fulfilled.type]: (state, action) => {
      // console.log(typeof state.data);
      state.isLoading = false;
      // console.log(state.data);
      if (!state.data) return;
      state.data = state.data ?
        [...state.data, ...action.payload.data] :
        [...action.payload.data];
      // state.data = produce(state.data, draft => {
      //   draft = draft ?
      //     [...draft, ...action.payload.data] :
      //     [...action.payload.data];
      // });

      // [...state.data, ...action.payload.data] : action.payload.data;
      state.error = '';
      state.after = action.payload?.after || '';
      state.isLast = !state.after;
      state.countPage += 1;
      // console.log('fulfilled, action: ', action);
      // console.log(typeof state.data);
      // console.log('fulfilled, data------------------: ',
      //   state.data);
      // console.log('fulfilled, payload---------------:', action.payload.data);
    },
    [postsRequestAsync.rejected.type]: (state, action) => {
      // console.log('rejected: ', action);
      state.isLoading = false;
      state.error = action.payload.error;
      state.countPage = 0;
      // console.error('Rejected error:', action.error);
    },
  },
});

export const {postsClear, changePage, resetCountPage} = postsSlice.actions;

export default postsSlice.reducer;

