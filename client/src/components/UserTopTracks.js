import { useState, useEffect } from 'react';
import {
  getAllTrackData
} from '../spotify/index';
import '../styles/tracks.css';
import { catchErrors } from '../utils/index';
import { TailSpin } from 'react-loader-spinner';
import TrackItem from './TrackItem';

const UserTopTracks = ({ accessToken, chooseTrack }) => {
  const [topTracks, setTopTracks] = useState(null);
  const [tracksLength, setTracksLength] = useState('long');
  const [long, setLong] = useState(null);
  const [medium, setMedium] = useState(null);
  const [short, setShort] = useState(null);

  const handlePlay = (track) => {
    chooseTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      const { long, medium, short } = await getAllTrackData(accessToken);
      setLong(long);
      setMedium(medium);
      setShort(short);
    };
    catchErrors(fetchData());
  }, [accessToken]);

  useEffect(() => {
    if (tracksLength === 'long') {
      setTopTracks(long);
    } else if (tracksLength === 'medium') {
      setTopTracks(medium);
    } else {
      setTopTracks(short);
    }
  }, [long, tracksLength]);

  return (
    <div className='container' style={{marginBottom: '5rem'}}>

      <div className='text-white d-flex justify-content-between mb-4 mt-4'>
        <h1 className='mb-4 fw-bold'>Top Songs</h1>
        <ul
          className='d-flex text-decoration-none justify-content-around list-group-horizontal align-items-center fs-6'
        >
          <li className='list-item'>
            <button
              className={
                tracksLength === 'long' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setTracksLength('long')}
            >
              All Time
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                tracksLength === 'medium' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setTracksLength('medium')}
            >
              Last 6 months
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                tracksLength === 'short' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setTracksLength('short')}
            >
              Last month
            </button>
          </li>
        </ul>
      </div>

      {topTracks ? (
        topTracks.items.map((track, i) => {
          return (
            <TrackItem
              track={track}
              handlePlay={handlePlay}
              key={i}
              size={'64'}
              width={'100%'}
            />
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
  );
};
export default UserTopTracks;
