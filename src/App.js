import Header from './components/Header';
import Main from './components/Main';
import {Provider} from 'react-redux';
import {AuthContextProvider} from './context/authContext';
import {TokenContextProvider} from './context/tokenContext';
import {PostsContextProvider} from './context/postsContext';
import {store} from './store';

function App() {
  return (
    <Provider store={store}>
      <TokenContextProvider>
        <PostsContextProvider>
          <AuthContextProvider>
            <Header />
            <Main />
          </AuthContextProvider>
        </PostsContextProvider>
      </TokenContextProvider>
    </Provider>
  );
}

export default App;
