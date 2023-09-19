import Header from './components/Header';
import Main from './components/Main';
import {AuthContextProvider} from './context/authContext';
import {TokenContextProvider} from './context/tokenContext';
import {PostsContextProvider} from './context/postsContext';

function App() {
  return (
    <TokenContextProvider>
      <PostsContextProvider>
        <AuthContextProvider>
          <Header />
          <Main />
        </AuthContextProvider>
      </PostsContextProvider>
    </TokenContextProvider>
  );
}

export default App;
