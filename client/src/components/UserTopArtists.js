import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllArtistData,
} from '../spotify';
import { catchErrors } from '../utils/index';
import { TailSpin } from 'react-loader-spinner';

const UserTopArtists = ({ accessToken, chooseArtist }) => {
  const [TopArtists, setTopArtists] = useState(null);
  const [ArtistLength, setArtistLength] = useState('long');
    const [long, setLong] = useState(null);
    const [medium, setMedium] = useState(null);
    const [short, setShort] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      const { long, medium, short } = await getAllArtistData(accessToken);
      setLong(long);
      setMedium(medium);
      setShort(short);
    };
    catchErrors(fetchData());
  }, [accessToken]);

  useEffect(() => {
    if (ArtistLength === 'long') {
      setTopArtists(long);
    } else if (ArtistLength === 'medium') {
      setTopArtists(medium);
    } else {
      setTopArtists(short);
    }
  }, [long, ArtistLength]);

  return (
    <div className='container'>
      <div className='text-white d-flex justify-content-between mb-4 mt-4'>
        <h1 className='mb-4 fw-bold'>Top Artists</h1>
        <ul
          className='d-flex text-decoration-none justify-content-around list-group-horizontal align-items-center fs-6'
        >
          <li className='list-item'>
            <button
              className={
                ArtistLength === 'long' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setArtistLength('long')}
            >
              All Time
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                ArtistLength === 'medium' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setArtistLength('medium')}
            >
              Last 6 months
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                ArtistLength === 'short' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setArtistLength('short')}
            >
              Last month
            </button>
          </li>
        </ul>
      </div>

      <div className='row justify-content-md-center'>
        {TopArtists ? (
          TopArtists.items.map((artist, i) => {
            return (
              <div
                className='d-flex m-3 align-items-center flex-column col artist-item'
                style={{ cursor: 'pointer' }}
                key={artist.uri}
              >
                <Link to={`/artist/${artist.id}`}>
                  <img
                    src={artist.images[0].url}
                    style={{
                      height: '220px',
                      width: '220px',
                      objectFit: 'cover',
                    }}
                    className='rounded-circle  artist__img'
                    alt='top-track-img'
                  />
                </Link>

                <div className='m-3 mb-4'>
                  <div className='text-white playlist__item-stat'>
                    {artist.name}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div
            className='container d-flex justify-content-center align-items-center'
            style={{ height: '50vh' }}
          >
            <TailSpin
              height='60'
              width='60'
              color='#1DB954'
              ariaLabel='tail-spin-loading'
              radius='1'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default UserTopArtists;
