import Header from './components/Header';
import Main from './components/Main';
import {useToken} from './hooks/useToken';

function App() {
  const [token] = useToken('');
  console.log(token);

  return (
    <>
      <Header token={token} />
      <Main />
    </>
  );
}

export default App;
