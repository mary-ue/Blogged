import {usePosts} from '../../../hooks/usePosts';
import style from './List.module.css';
import Post from './Post';

export const List = () => {
  // const postsData = [
  //   {
  //     thumbnail: '',
  //     title: 'Title1',
  //     author: 'Nickname1',
  //     ups: 24,
  //     date: '2022-02-24T09:45:00.00Z',
  //     id: '123',
  //   },
  //   {
  //     thumbnail: '',
  //     title: 'Title2',
  //     author: 'Nickname2',
  //     ups: 74,
  //     date: '2022-04-21T09:45:00.00Z',
  //     id: '456',
  //   },
  //   {
  //     thumbnail: '',
  //     title: 'Title3',
  //     author: 'Nickname3',
  //     ups: 26,
  //     date: '2022-02-24T08:45:00.00Z',
  //     id: '789',
  //   },
  //   {
  //     thumbnail: '',
  //     title: 'Title4',
  //     author: 'Nickname4',
  //     ups: 2,
  //     date: '2022-03-24T09:45:00.00Z',
  //     id: '101',
  //   }
  // ];

  const [posts] = usePosts();
  console.log(posts);

  return (
    <ul className={style.list}>
      {posts?.map((postData) => {
        console.log(postData.data);

        return (
          <Post key={postData.data.id} {...postData.data} />
        );
      }
      )}
    </ul>
  );
};
