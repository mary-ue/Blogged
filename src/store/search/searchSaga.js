import {takeEvery} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import axios from 'axios';
import {SEARCH_REQUEST} from './searchAction';

const fetchSearch = async (action) => {
  const request = await axios(`${URL_API}/search?q=${action.search}`, {
    headers: {
      'Authorization': `bearer ${action.token}`,
    },
  });

  return request.data;
};

function* workerSearch(action) {
  const data = yield fetchSearch(action);
  console.log('data: ', data);
}

export function* watchSearch() {
  yield takeEvery(SEARCH_REQUEST, workerSearch);
}

