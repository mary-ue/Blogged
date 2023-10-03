import {createSlice} from '@reduxjs/toolkit';
import {commentsRequestAsync} from './commentsAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
  status: null,
};

export const commentsSlice = createSlice({
  name: 'commentsReducer',
  initialState,
  reducers: {
    // commentsClear: (state) => {
    //   state.loading = false;
    //   state.data = [];
    //   state.error = '';
    //   state.status = null;
    // },
  },
  extraReducers: {
    [commentsRequestAsync.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
      state.status = 'loading';
    },
    [commentsRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
      state.status = 'loaded';
    },
    [commentsRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.status = 'error';
    },
  },
});

export default commentsSlice.reducer;
export const {commentsClear} = commentsSlice.actions;

