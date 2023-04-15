import { Container } from 'react-bootstrap';
import { isLocalhost } from '../utils';
import '../styles/login.css';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const RESPONSE_TYPE = 'code';
let LOGIN_URL = process.env.REACT_APP_REDIRECT_URI;
const SCOPE =
  'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

LOGIN_URL = isLocalhost
  ? 'http://localhost:3000'
  : process.env.REACT_APP_REDIRECT_URI;

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${LOGIN_URL}&scope=${SCOPE}`;


const Login = () => {
  return (
    <Container
      className='d-flex justify-content-center align-items-center '
      style={{ minHeight: '100vh' }}
    >
      <a
        className='btn btn-success btn-lg login__button fw-bold'
        href={AUTH_URL}
      >
        Login With Spotify
      </a>
    </Container>
  );
};
export default Login;
