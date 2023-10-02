import Layout from '../Layout';
import style from './Main.module.css';
import Tabs from './Tabs';
import List from './List';
import {Route, Routes} from 'react-router-dom';
import Modal from '../Modal';

export const Main = () => {
  return (
    <main className={style.main}>
      <Layout>
        <Tabs />
        <Routes>
          <Route path='/category/:page' element={<List />}>
            <Route path='post/:id' element={<Modal />} />
          </Route>
        </Routes>
      </Layout>
    </main>
  );
};
