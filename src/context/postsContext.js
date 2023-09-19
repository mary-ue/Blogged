import React from 'react';
import PropTypes from 'prop-types';
import {usePosts} from '../hooks/usePosts';

export const postsContext = React.createContext({
  posts: [],
  delPosts: () => {},
});

export const PostsContextProvider = ({children}) => {
  const [posts, delPosts] = usePosts();

  return (
    <postsContext.Provider value={{posts, delPosts}}>
      {children}
    </postsContext.Provider>
  );
};

PostsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
