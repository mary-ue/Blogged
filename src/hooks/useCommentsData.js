import {useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {useSelector} from 'react-redux';

export const useCommentsData = (id) => {
  const [commentsData, setCommentsData] = useState([]);
  const token = useSelector(state => state.tokenReducer.token);

  const clearCommentsData = () => {
    setCommentsData([]);
  };

  useEffect(() => {
    if (!token || !id) return;

    fetch(`${URL_API}/comments/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(
        ([
          {
            data: {
              children: [{data: post}],
            },
          },
          {
            data: {
              children,
            },
          },
        ]) => {
          const comments = children.map(item => item.data);
          setCommentsData([post, comments]);
          console.log([post, comments]);
        },
      )
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return [commentsData, clearCommentsData];
};
