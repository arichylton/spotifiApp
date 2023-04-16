import { useEffect, useState } from 'react';
import { isLocalhost } from './utils';
import axios from 'axios';

let redirectUri = process.env.REACT_APP_REDIRECT_URI;
redirectUri = isLocalhost
  ? 'http://localhost:3001'
  : process.env.REACT_APP_REDIRECT_URI;


const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post(`${redirectUri}/login`, { code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, '/');
      })
      .catch((error) => {
        window.location = '/';
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`${redirectUri}/refresh`, {
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
