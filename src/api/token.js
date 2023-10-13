// import {useNavigate, useParams} from 'react-router-dom';

export const setToken = (token) => {
  if (!token) return;
  localStorage.setItem('bearer', token);
};

// // auth#access_token='token'

// export const getToken = () => {
//   const navigate = useNavigate();
//   // eslint-disable-next-line
//   const {access_token} = useParams();
//   console.log(access_token);
//   let token = '';

//   if (location.pathname.includes('/auth')) {
//  token = new URLSearchParams(location.hash.substring(1)).get('access_token');
//     if (token) {
//       setToken(token);
//       navigate('/');
//     }
//   } else {
//     token = localStorage.getItem('bearer');
//   }

//   return token;
// };
