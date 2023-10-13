import Header from './components/Header';
import Main from './components/Main';
import {useDispatch} from 'react-redux';
import {updateToken} from './store/tokenReducer';
import {getToken} from './api/token';
import {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    dispatch(updateToken(token));
  }, [dispatch]);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');

    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path='/auth' element={
        <>
          <Header />
          <Main />
        </>
      } />
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
