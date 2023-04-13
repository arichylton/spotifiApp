import { useEffect, useState } from 'react';
import { getArtistData } from '../spotify';
import { useParams } from 'react-router-dom';
import { catchErrors } from '../utils/index';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import TrackItem from './TrackItem';
import '../styles/artist.css';

const Artist = ({ accessToken, chooseTrack }) => {
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [filteredAlbums, setFilteredAlbums] = useState(null);
  const { id } = useParams();

  const handlePlay = (track) => {
    chooseTrack(track);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { artist, tracks, albums } = await getArtistData(accessToken, id);
      setArtist(artist);
      setTracks(tracks.tracks);
      setAlbums(albums.items);
    };

    catchErrors(fetchData());
  }, []);

  useEffect(() => {
    if (!albums) return;

    let filtered = albums.filter(
      (album, index, self) =>
        index === self.findIndex((a) => a.name === album.name)
    );
    setFilteredAlbums(filtered);
  }, [albums]);

  return (
    <div className='text-white'>
      {artist ? (
        <div
          className='d-flex flex-column justify-content-around'
          style={{ marginBottom: '70px' }}
        >
          <div className='mt-5 gap-4 artist__responsive-container'>
            <div className='d-flex flex-column align-items-center mt-3 flex-fill'>
              <img
                src={artist.images[0].url}
                alt='Artist'
                className='rounded mb-3 artist__img'
                style={{ width: 300, height: 300, objectFit: 'cover' }}
              />
              <h1 className='mb-3 fw-bold'>{artist.name}</h1>
              <div className='d-flex flex-column fs-5 gap-2 artist__item-stat'>
                <div className='d-flex flex-column align-items-center text-danger fs-5 fw-bold'>
                  {artist.followers.total.toLocaleString('en-US')}
                  <span className='fs-6 text-secondary '>Followers</span>
                </div>
                <div className='d-flex align-items-center flex-column'>
                  <ul className='d-flex flex-column align-items-center mb-1 p-0 text-center'>
                    {artist.genres.map((genre, i) => {
                      return (
                        <li key={i} className='text-danger fw-bold'>
                          {genre}
                        </li>
                      );
                    })}
                  </ul>
                  <span className='fs-6 text-secondary fw-bold'>Genres</span>
                </div>
                <div className='flex-column d-flex align-items-center text-danger fw-bold'>
                  {artist.popularity}
                  <span className='fs-6 text-secondary'>Popularity</span>
                </div>
              </div>
            </div>

            <div className='flex-fill'>
              <h3 className='mb-3'>Top Tracks</h3>
              {tracks.map((track, i) => {
                return (
                  <TrackItem
                    track={track}
                    handlePlay={handlePlay}
                    key={i}
                    size={'64'}
                    width={'100%'}
                  />
                );
              })}
            </div>
          </div>

          <div className='mt-5 d-flex flex-column align-items-center mb-5 '>
            <h3 className='mb-4 mt-5'>Discography</h3>
            <div className='d-flex container row'>
              {filteredAlbums
                ? filteredAlbums.map((album, i) => {
                    return (
                      <Link
                        key={i}
                        className='d-flex flex-column align-items-center text-center p-3 artist-item cursor col'
                        to={`/album/${album.id}`}
                      >
                        <img
                          src={album.images[0].url}
                          alt='album'
                          className='rounded artist__img'
                          style={{ height: `${200}px`, width: `${200}px` }}
                        />
                        <span className='mt-2 artist__item-stat'>
                          {album.name}
                        </span>
                      </Link>
                    );
                  })
                : ''}
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
export default Artist;
