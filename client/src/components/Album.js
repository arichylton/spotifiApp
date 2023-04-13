import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbum } from '../spotify';
import { TailSpin } from 'react-loader-spinner';
import { catchErrors } from '../utils';
import TrackItem from './TrackItem';
import '../styles/album.css';
import musicSvg from '../assets/music.svg';

const Album = ({ accessToken, chooseTrack }) => {
  const [album, setAlbum] = useState(null);
  const { id } = useParams();

  const handlePlay = (track) => {
    chooseTrack(track);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAlbum(accessToken, id).then((album) => {
        setAlbum(album.data);
      });
    };
    catchErrors(fetchData());
  }, []);
  
  console.log(album);
  return (
    <div className='text-white container mt-2'>
      {album ? (
        <div className='d-flex flex-column mt-5'>
          <div className='d-flex flex-column align-items-center mb-5 fs-5'>
            <div>
              {album.images.length > 0 ? (
                <img
                  src={album.images[0]?.url}
                  style={{
                    height: '300px',
                    width: '300px',
                    objectFit: 'cover',
                  }}
                  className='rounded album__img'
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
                  className='album__img rounded album__img-icon'
                />
              )}
            </div>

            <span className='mt-3 mb-2 fs-2'>
              {album.name}
            </span>
            <span
              className='d-flex gap-5
              justify-content-between text-muted album__item-stat fw-bold'
            >
              Total Tracks:
              <span style={{ color: '#1DB954' }}>
                {album.total_tracks}
              </span>
            </span>
          </div>

          <div className='mt-2' style={{ marginBottom: '80px' }}>
            <span className='fw-bold' style={{ fontSize: 30 }}>
              {album.name !== '  ' ? album.name : 'Untitled'}
            </span>
            <div className='mt-4'>
              {album.tracks.items.map((track, i) => {
                console.log(track);
                return (
                  <TrackItem
                    track={track}
                    handlePlay={handlePlay}
                    key={i}
                    size={'64'}
                    width={'50rem'}
                    url={album.images[0].url}
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
export default Album;
