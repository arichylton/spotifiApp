require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000';
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'development') {
  REDIRECT_URI = 'http://localhost:3000';
}

const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');

const app = express();
app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(
    history({
      verbose: true,
      rewrites: [
        { from: /\/login/, to: '/login' },
        { from: /\/callback/, to: '/callback' },
        { from: /\/refresh_token/, to: '/refresh_token' },
      ],
    })
  );

let credentials = {
  redirectUri: REDIRECT_URI,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};

app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('/', function (req, res) {
  res.render(path.resolve(__dirname, './client/build/index.html'));
});

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new spotifyWebApi({
    redirectUri: credentials.redirectUri,
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    refreshToken: refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new spotifyWebApi(credentials);

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      console.log(data);
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.get('*', function (req, res) {
  res.sendFile(path.resolve('client', 'build'));
});

app.listen(PORT, () => {
  console.log('Port running on: ', PORT);
});
