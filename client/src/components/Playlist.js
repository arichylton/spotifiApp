import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylist } from '../spotify';
import { TailSpin } from 'react-loader-spinner';
import { catchErrors } from '../utils';
import TrackItem from './TrackItem';
import '../styles/playlist.css';

import musicSvg from '../assets/music.svg';

const Playlist = ({ accessToken, chooseTrack }) => {
  const [playlist, setPlaylist] = useState(null);
  const { id } = useParams();

  const handlePlay = (track) => {
    chooseTrack(track);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPlaylist(accessToken, id).then((playlist) => {
        setPlaylist(playlist.data);
      });
    };
    catchErrors(fetchData());
  }, []);
  
  return (
    <div className='text-white container mt-2'>
      {playlist ? (
        <div className='d-flex flex-column mt-5'>
          <div className='d-flex flex-column align-items-center mb-5 fs-5'>
            <div>
              {playlist.images.length > 0 ? (
                <img
                  src={playlist.images[0].url}
                  style={{
                    height: '300px',
                    width: '300px',
                    objectFit: 'cover',
                  }}
                  className='rounded playlist__img'
                  alt='top-track-img'
                />
              ) : (
                <img
                  src={musicSvg}
                  alt='svg'
                  style={{
                    height: '300px',
                    width: '300px',
                    objectFit: 'cover',
                  }}
                  className='playlist__img rounded playlist__img-icon'
                />
              )}
            </div>

            <span className='mt-3 mb-2 fs-2'>
              {playlist.owner.display_name}
            </span>
            <span
              className='d-flex gap-5
              justify-content-between text-muted playlist__item-stat fw-bold'
            >
              Followers:
              <span style={{ color: '#1DB954' }}>
                {playlist.followers.total}
              </span>
            </span>
          </div>

          <div className='mt-2' style={{ marginBottom: '80px' }}>
            <span className='fw-bold' style={{ fontSize: 30 }}>
              {playlist.name !== '  ' ? playlist.name : 'Untitled'}
            </span>
            <div className='mt-4'>
              {playlist.tracks.items.map((track, i) => {
                return (
                  <TrackItem
                    track={track.track}
                    handlePlay={handlePlay}
                    key={i}
                    size={'64'}
                    width={'50rem'}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div
          className='container d-flex justify-content-center align-items-center'
          style={{ height: '65vh' }}
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
  );
};
export default Playlist;
