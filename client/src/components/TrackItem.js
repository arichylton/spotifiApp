import { formatDuration } from '../utils';
import '../styles/track.css'

const TrackItem = ({ track, handlePlay, size, url }) => {
  return (
    <div
      className='d-flex align-items-center justify-content-between track-item'
      style={{ cursor: 'pointer' }}
      onClick={() => handlePlay(track)}
    >
      <div className='d-flex mt-1 mb-1 align-items-center'>
        <img
          src={!url ? track.album.images[0]?.url : url}
          style={{ height: `${size}px`, width: `${size}px` }}
          alt='top-track-img'
        />
        <div className='m-3' style={{maxWidth: '45vw'}}>
          <div className='text-white d-block text-truncate'>{track?.name}</div>
          <div className='text-muted d-block text-truncate'>
            {track.artists[0].name} • {track.album ? track.album.name : track.track_number}
          </div>
        </div>
      </div>

      <div className='text-muted m-3'>{formatDuration(track?.duration_ms)}</div>
    </div>
  );
};
export default TrackItem;
