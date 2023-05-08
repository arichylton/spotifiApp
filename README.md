## Playify
> A web app for visualizing personalized Spotify data

Built with:

[Spotify Web API](https://developer.spotify.com/documentation/web-api)  <br>
[Create React App](https://create-react-app.dev/)  <br>
[Express](https://devdocs.io/express/)  <br>
[React Router](https://reactrouter.com/en/main)  <br>
[Bootsrap](https://react-bootstrap.github.io/getting-started/introduction/)  <br>

### Setup <br>
Register a Spotify App and add http://localhost:3000 as a Redirect URI in the app settings   <br>
Create an .env file in the root of the project based on .env.example   <br>
npm install   <br>
npm run devStart  <br>
Open another terminal window <br>
cd client <br>
npm start <br>


### Deploying to Heroku   <br>

Create new heroku app   <br>

heroku create app-name   <br>

Set Heroku environment variables   <br>
heroku config:set CLIENT_ID=XXXXX   <br>
heroku config:set CLIENT_SECRET=XXXXX   <br>
heroku config:set REDIRECT_URI=https://app-name.herokuapp.com   <br>

### Push to Heroku   <br>
git status<br>
git add . <br>
git commit -am 'message' <br>
git push heroku main   <br>

Add http://app-name.herokuapp.com as a Redirect URI in the spotify application settings   <br>

Once the app is live on Heroku, hitting http://app-name.herokuapp.com/login should be the same as hitting http://localhost:3000/login   <br> 



  
