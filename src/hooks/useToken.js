import {useState, useEffect} from 'react';

export const useToken = (state) => {
  const [token, setToken] = useState(state);

  useEffect(() => {
    if (location.pathname.includes('/auth')) {
      const token = new URLSearchParams(location.hash.substring(1))
        .get('access_token');
      setToken(token);
    }
  }, []);

  return [token];
};
