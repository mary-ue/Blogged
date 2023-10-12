import {takeLatest, put, select} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import axios from 'axios';
import {
  SEARCH_REQUEST,
  searchRequestError,
  searchRequestSuccess
} from './searchAction';

function* fetchSearch(search) {
  const token = yield select(state => state.tokenReducer.token);

  try {
    const request = yield axios(`${URL_API}/search?q=${search}`, {
      headers: {
        'Authorization': `bearer ${token}`,
      },
    });

    yield put(searchRequestSuccess(request.data.data));
  } catch (evt) {
    yield put(searchRequestError(evt));
  }
}

// function* workerSearch(action) {
//   const token = yield select(state => state.tokenReducer.token);
//   const data = yield call(fetchSearch, action.search, token);
//   yield put(searchRequestSuccess(data.data));
// }

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, fetchSearch);
}

