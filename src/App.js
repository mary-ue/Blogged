import Header from './components/Header';
import Main from './components/Main';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Loader from './UI/Loader';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {updateToken} from './store/tokenReducer';
import {setToken} from './api/token';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.hash.substring(1))
    .get('access_token');

  console.log(token);
  useEffect(() => {
    if (token) {
      setToken(token);
      dispatch(updateToken(token));
      navigate('/');
    } else if (localStorage.getItem('bearer')) {
      dispatch(updateToken(localStorage.getItem('bearer')));
    }
  }, [dispatch, token, navigate]);

  return (
    <Routes>
      <Route path='/auth/:access_token' element={
        <>
          <Header />
          <Loader size={100} />
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
