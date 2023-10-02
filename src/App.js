import Header from './components/Header';
import Main from './components/Main';
import {useDispatch} from 'react-redux';
import {updateToken} from './store/tokenReducer';
import {getToken} from './api/token';
import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    dispatch(updateToken(token));
  }, [dispatch]);

  return (
    <Routes>
      <Route path='*' element={
        <>
          <Header />
          <Main />
        </>
      } />
    </Routes>
  );
}

export default App;
