import {useState, useEffect} from 'react';

export const useToken = (state) => {
  const [token, setToken] = useState(state);

  const delToken = () => {
    if (location.pathname.includes('/auth')) {
      console.log('Logout');
      setToken(state);
      localStorage.removeItem('bearer');
      window.history.replaceState({}, document.title, window.location.origin);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('/auth')) {
      const token = new URLSearchParams(location.hash.substring(1))
        .get('access_token');
      setToken(token);
    }

    if (localStorage.getItem('bearer')) {
      setToken(localStorage.getItem('bearer'));
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('bearer', token);
    }
  }, [token]);

  return [token, delToken];
};
