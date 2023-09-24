export const setToken = (token) => {
  localStorage.setItem('bearer', token);
};

export const getToken = () => {
  let token = '';

  if (location.pathname.includes('/auth')) {
    token = new URLSearchParams(location.hash.substring(1)).get('access_token');
    if (token) {
      setToken(token);
    }
  } else {
    token = localStorage.getItem('bearer');
  }

  return token;
};


// import {useState, useEffect} from 'react';

// export const useToken = (state) => {
//   const [token, setToken] = useState(state);

//   const delToken = () => {
//     console.log('Logout');
//     setToken(state);
//     localStorage.removeItem('bearer');
//     window.history.replaceState({}, document.title, window.location.origin);
//   };

//   useEffect(() => {
//   }, []);

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem('bearer', token);
//     }
//   }, [token]);

//   return [token, delToken];
// };
