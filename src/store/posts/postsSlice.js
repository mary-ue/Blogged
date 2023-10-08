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
  extraReducers: (builder) => {
    builder
      .addCase(postsRequestAsync.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(postsRequestAsync.fulfilled, (state, action) => {
        // console.log(state.data);
        state.isLoading = false;
        state.after = action.payload?.after || '';
        state.isLast = !state.after;
        state.data = state.data.length ? // Uncaught (in promise) TypeError:
        // Cannot read properties of undefined (reading 'data')
          state.data.concat(action.payload.data) : action.payload.data;
        state.error = '';
        state.countPage += 1;
      })
      .addCase(postsRequestAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        state.countPage = 0;
      });
  },
});

export const {postsClear, changePage, resetCountPage} = postsSlice.actions;

export default postsSlice.reducer;

