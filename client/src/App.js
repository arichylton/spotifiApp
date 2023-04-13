import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css'

const code = new URLSearchParams(window.location.search).get('code');
const App = () => {
  
  return (
    <div className='bg-dark app'>{code ? <Profile code={code} /> : <Login />}</div>
  );
}

export default App;
