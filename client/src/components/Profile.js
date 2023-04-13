import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';

import Navbar from './Navbar';
import User from './User';
import Player from './Player';
import Dashboard from './Dashboard';
import UserTopArtists from './UserTopArtists';
import UserTopTracks from './UserTopTracks';
import Playlists from './Playlists';
import useAuth from '../useAuth';
import Artist from './Artist';
import Playlist from './Playlist';
import Album from './Album';

const CLIENT_ID = '90a462053588436b95c0d6ad460a9878';
const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
});

const Profile = ({ code }) => {
  const [playingTrack, setPlayingTrack] = useState('');
  const accessToken = useAuth(code);
  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <Dashboard
              accessToken={accessToken}
              spotifyApi={spotifyApi}
              chooseTrack={chooseTrack}
            />
          }
        >
          <Route
            path='/'
            element={
              <User accessToken={accessToken} chooseTrack={chooseTrack} />
            }
          />
          <Route
            path='artists'
            element={<UserTopArtists accessToken={accessToken} />}
          />
          <Route
            path='playlists'
            element={<Playlists accessToken={accessToken} />}
          />
          <Route
            path='tracks'
            element={
              <UserTopTracks
                chooseTrack={chooseTrack}
                accessToken={accessToken}
              />
            }
          />
          <Route
            path={`artist/:id`}
            element={
              <Artist accessToken={accessToken} chooseTrack={chooseTrack} />
            }
          />
          <Route
            path={`playlist/:id`}
            element={
              <Playlist accessToken={accessToken} chooseTrack={chooseTrack} />
            }
          />
          <Route
            path={`album/:id`}
            element={
              <Album accessToken={accessToken} chooseTrack={chooseTrack} />
            }
          />
        </Route>
      </Routes>
      <div className='fixed-bottom player'>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
};

export default Profile;
