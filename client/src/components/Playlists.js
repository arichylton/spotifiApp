import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlaylists } from '../spotify';
import { catchErrors } from '../utils';
import { TailSpin } from 'react-loader-spinner';

import musicSVG from '../assets/music.svg';
import '../styles/playlist.css';

const Playlists = ({ accessToken }) => {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      const { data } = await getPlaylists(accessToken);
      setPlaylists(data);
    };
    catchErrors(fetchData());
  }, [accessToken]);

  return (
    <div className='text-white container mt-4 mb-5 text-center'>
      <h1 className='mb-5 mt-2 pb-1 fw-bold'>Playlists</h1>

      <div className='row'>
        {playlists ? (
          playlists.items.map((playlist, i) => {
            return (
              <div
                className='d-flex m-3 align-items-center flex-column col playlist__item'
                style={{ cursor: 'pointer' }}
                key={playlist.uri}
              >
                <Link to={`/playlist/${playlist.id}`}>
                  {playlist.images.length > 0 ? (
                    <img
                      src={
                        playlist.images.length > 0
                          ? playlist.images[0].url
                          : { musicSVG }
                      }
                      style={{
                        height: '240px',
                        width: '240px',
                        objectFit: 'cover',
                      }}
                      className='rounded playlist__img'
                      alt='top-track-img'
                    />
                  ) : (
                    <img
                      src={musicSVG}
                      alt='svg'
                      style={{
                        height: '240px',
                        width: '240px',
                        objectFit: 'cover',
                      }}
                      className='playlist__img rounded playlist__img-icon '
                    />
                  )}
                </Link>

                <div className='m-3 mb-4'>
                  <div className='text-white fs-6 playlist__item-stat'>
                    {playlist.name !== '  ' ? playlist.name : 'Untitled'}
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
export default Playlists;
