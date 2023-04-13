import { Container } from 'react-bootstrap';
import '../styles/login.css'

const CLIENT_ID = '90a462053588436b95c0d6ad460a9878';
const RESPONSE_TYPE = 'code';
const REDIRECT_URI = 'http://localhost:3000';
const SCOPE =
  'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

const Login = () => {
  return (
    <Container
      className='d-flex justify-content-center align-items-center '
      style={{ minHeight: '100vh' }}
    >
      <a className='btn btn-success btn-lg login__button fw-bold' href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  );
};
export default Login;
