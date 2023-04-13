import axios from 'axios';

export const getUser = (token) =>
  axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

//api.spotify.com/v1/me/tracks
export const getSavedTracks = (token) =>
  axios.get('https://api.spotify.com/v1/me/tracks', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const getRecentlyPlayed = (token) =>
  axios.get('https://api.spotify.com/v1/me/player/recently-played', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

// TOP TRACKS //////////////////////////////////////////////////////////////////
export const getTopTracksLong = (token) =>
  axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

export const getTopTracksMedium = (token) =>
  axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

export const getTopTracksShort = (token) =>
  axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

// TOP ARTISTS /////////////////////////////////////////////////////////////////
export const getTopArtistsLong = (token) =>
  axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

export const getTopArtistsMedium = (token) =>
  axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

export const getTopArtistsShort = (token) =>
  axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

// SINGLE ARTIST ////////////////////////////////////////////////////////////////
export const getArtist = (token, id) =>
  axios.get(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const getArtistTopTracks = (token, id) =>
  axios.get(
    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

export const getArtistAlbums = (token, id) =>
  axios.get(`https://api.spotify.com/v1/artists/${id}/albums?market=US&include_groups=album&limit=30`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const getAlbum = (token, id) =>
    axios.get(
      `https://api.spotify.com/v1/albums/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
  );

/////////////////////////////////////////////////////////////////

export const getFollowing = (token) =>
  axios.get('https://api.spotify.com/v1/me/following?type=artist', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const getPlaylists = (token) =>
  axios.get('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const getPlaylist = (token, id) =>
  axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const getUserInfo = (token) =>
  axios
    .all([
      getUser(token),
      getFollowing(token),
      getPlaylists(token),
      getSavedTracks(token),
      getRecentlyPlayed(token),
    ])
    .then(
      axios.spread(
        (user, followedArtists, playlists, savedTracks, recentlyPlayed) => ({
          user: user.data,
          followedArtists: followedArtists.data,
          playlists: playlists.data,
          savedTracks: savedTracks.data,
          recentlyPlayed: recentlyPlayed.data,
        })
      )
    );

export const getAllTrackData = (token) =>
  axios
    .all([
      getTopTracksLong(token),
      getTopTracksMedium(token),
      getTopTracksShort(token),
    ])
    .then(
      axios.spread((long, medium, short) => ({
        long: long.data,
        medium: medium.data,
        short: short.data,
      }))
    );

export const getArtistData = (token, id) =>
  axios
    .all([
      getArtist(token, id),
      getArtistTopTracks(token, id),
      getArtistAlbums(token, id),
    ])
    .then(
      axios.spread((artist, tracks, albums) => ({
        artist: artist.data,
        tracks: tracks.data,
        albums: albums.data,
      }))
    );

export const getAllArtistData = (token) =>
  axios
    .all([
      getTopArtistsLong(token),
      getTopArtistsMedium(token),
      getTopArtistsShort(token),
    ])
    .then(
      axios.spread((long, medium, short) => ({
        long: long.data,
        medium: medium.data,
        short: short.data,
      }))
    );
