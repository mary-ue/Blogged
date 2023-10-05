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
    [postsRequestAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [postsRequestAsync.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.after = action.payload?.after || '';
      state.data = state.after ?
        [...state.data, ...action.payload.data] : state.data;
      state.error = '';
      state.isLast = !state.after;
      state.countPage += 1;
      console.log('fulfilled, action: ', action);
    },
    [postsRequestAsync.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.countPage = 0;
      console.error('Rejected error:', action.error);
    },
  },
});

export const {postsClear, changePage, resetCountPage} = postsSlice.actions;

export default postsSlice.reducer;

