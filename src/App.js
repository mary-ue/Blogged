import Header from './components/Header';
import Main from './components/Main';
import {AuthContextProvider} from './context/authContext';
import {TokenContextProvider} from './context/tokenContext';
import {PostsContextProvider} from './context/postsContext';
import {CommentContextProvider} from './context/commentContext';

function App() {
  return (
    <TokenContextProvider>
      <PostsContextProvider>
        <AuthContextProvider>
          <CommentContextProvider>
            <Header />
            <Main />
          </CommentContextProvider>
        </AuthContextProvider>
      </PostsContextProvider>
    </TokenContextProvider>
  );
}

export default App;
