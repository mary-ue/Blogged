import Header from './components/Header';
import Main from './components/Main';
import {useDispatch} from 'react-redux';
import {updateToken} from './store/tokenReducer';
import {getToken} from './api/token';
import {useEffect} from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    dispatch(updateToken(token));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
