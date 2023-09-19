import {useContext, useEffect, useState} from 'react';
import {URL_API, USER_AGENT} from '../api/const';
import {tokenContext} from '../context/tokenContext';

export const usePosts = () => {
  const {token} = useContext(tokenContext);
  const [posts, setPosts] = useState([]);

  const delPosts = () => {
    setPosts([]);
  };

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/best`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': USER_AGENT,
      },
    }).then(response => response.json())
      .then(posts => {
        setPosts(posts.data.children);
      })
      .catch(err => {
        setPosts({});
        console.error(err.message);
      });
  }, [token]);

  return [posts, delPosts];
};
