import Header from './components/Header';
import Main from './components/Main';
import {useDispatch} from 'react-redux';
import {PostsContextProvider} from './context/postsContext';
import {updateToken} from './store/tokenReducer';
import {getToken} from './api/token';
import {useEffect} from 'react';
// import {updateToken} from './store/tokenReducer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    dispatch(updateToken(token));
  }, [dispatch]);

  return (
    <PostsContextProvider>
      <Header />
      <Main />
    </PostsContextProvider>
  );
}

export default App;
