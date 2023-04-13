import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import TrackSearchResult from './TrackSearchResult';

import { Outlet } from 'react-router-dom';

const Dashboard = ({ accessToken, spotifyApi, chooseTrack }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  const [lyrics, setLyrics] = useState('');
  const clear = () => {
    setSearch('');
  };

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;
    spotifyApi.searchTracks(search, { limit: 12 }).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
            
          );
          setPlayingTrack(track);
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            duration: track.duration_ms,
            albumName: track.album.name
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container className='d-flex flex-column py-2'>
      <Form.Control
        type='search'
        placeholder='Search Songs'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        className='flex-grow-1 my-2 overflow-hidden'
        style={{ overflowY: 'auto' }}
      >

        {searchResults.map((track) => (
          <TrackSearchResult
            key={track.uri}
            track={track}
            chooseTrack={chooseTrack}
            clear={clear}
          />
        ))}
      </div>
      <Outlet />
    </Container>
  );
};

export default Dashboard;
