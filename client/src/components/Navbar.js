import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import spotifyLogo from '../assets/Spotify_Logo_RGB_Green.png';
import '../styles/navbar.css';
import { useState } from 'react';

const Navbar = () => {
  const [expanded, setExpanded] = useState('false');
  return (
    <nav className='navbar navbar-expand-sm container pt-4 pb-4'>
      <div className='container-fluid'>
        <Link to='/'>
          <div className='logo-container navbar-brand'>
            <img src={spotifyLogo} alt='userIMG' style={{ width: 140 }} />
          </div>
        </Link>
        <button
          className='navbar-toggler '
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarToggler'
          aria-controls='navbarToggler'
          aria-expanded={expanded}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse fs-5' id='navbarToggler'>
          <ul className='navbar-nav mb-lg-0 ms-auto'>
            <Link
              className='text-white ps-4 nav-link nav-item text-end pe-2'
              to='/tracks'
            >
              Songs
            </Link>
            <Link
              className='text-white ps-4 nav-link nav-item text-end pe-2'
              to='/artists'
            >
              Artists
            </Link>
            <Link
              className='text-white ps-4 nav-link nav-item text-end pe-2'
              to='/playlists'
            >
              {' '}
              Playlists
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
