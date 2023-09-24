import Header from './components/Header';
import Main from './components/Main';
import {Provider} from 'react-redux';
import {AuthContextProvider} from './context/authContext';
import {PostsContextProvider} from './context/postsContext';
import {store, updateToken} from './store';
import {useEffect} from 'react';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('bearer');

    if (token) {
      store.dispatch(updateToken(token));
    }
  }, []);

  return (
    <Provider store={store}>
      <PostsContextProvider>
        <AuthContextProvider>
          <Header />
          <Main />
        </AuthContextProvider>
      </PostsContextProvider>
    </Provider>
  );
}

export default App;
