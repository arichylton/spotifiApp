import { useEffect, useState } from 'react';
import axios from 'axios';

let redirectUri = '';

// if (process.env.NODE_ENV !== 'production') {
//   redirectUri = 'http://localhost:3001';
// }


const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    console.log(redirectUri);
    axios
      .post(`https://stark-lowlands-55596.herokuapp.com/login`, { code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, '/');
      })
      .catch((error) => {
        // window.location = '/';
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`https://stark-lowlands-55596.herokuapp.com/refresh`, {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = '/';
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
