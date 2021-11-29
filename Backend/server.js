const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser")
var { searchByArtist, searchBySong, getRecommendationsGeneral, getUserProfileInfo } = require('./spotify_utils.js');
const { write, readByUID, swipeSongRight, swipeSongLeft, swipeRight, swipeLeft, isMatch, getAllUsers } = require('./mongodb.js');

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

const app = express()
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.json())
const port = 3000

app.get('/api/spotify-credentials', (req, res, next) => {
  //THIS IS DYLAN'S spotify credentials for MuseMatch app --> we should migrate to the MuseMatch account one in the future
  const spotifyCredentials = {
    clientId: 'a2ecb5b0a2154d4f9fb99f632ecdd889',
    clientSecret: 'bc26c22208f142b1b5933db834fb686f',
    redirectUri: 'https://auth.expo.io/@anonymous/MuseMatch-bb351e1f-4527-4cf6-849e-46bafb82c4a0'
  }
  res.send(spotifyCredentials)
});


app.get('/api/search-by-artist', async (req, res, next) => {
  /*
    if there is an error thrown in getUserFromDb, asyncMiddleware
    will pass it to next() and express will handle the error;
  */
  console.log("here")
  searchByArtist(req.query.search).then((artists) => {
    res.send(artists)
  }
  )
})

app.get('/api/search-by-song', async (req, res, next) => {
  /*
    if there is an error thrown in getUserFromDb, asyncMiddleware
    will pass it to next() and express will handle the error;
  */
  searchBySong(req.query.search).then((songs) => {
    res.send(songs)

  }
  )
})

app.get('/api/get-user-profile', async (req, res, next) => {
  getUserProfileInfo(req.query.userAccessToken).then((profile) => {
    res.send(profile);
  }
  );
})

app.get('/api/get-user', async (req, res, next) => {
  /*
    if there is an error thrown in getUserFromDb, asyncMiddleware
    will pass it to next() and express will handle the error;
  */
  const temp = await readByUID(req.query.uid)
  res.send(temp)
})

app.post('/api/create-account', async (req, res, next) => {
  /*
    if there is an error thrown in getUserFromDb, asyncMiddleware
    will pass it to next() and express will handle the error;
  */

  const resp = req.body

  const dummy_req = {
    uid: resp.uid,
    username: resp.username,
    favorite_artist: resp.artist,
    artist_id: resp.artist_id,
    favorite_song: resp.song,
    song_id: resp.song_id,
    bio: resp.bio,
    spotify_profile: resp.spotify_profile,
    genres: [],
    songs: [],
    artists: [],
    rightProfileSwiped: [],
    leftProfileSwiped: [],
    rightSongSwiped:[],
    leftSongSwiped:[]

  }
  write(dummy_req)

  return "hi!"
  //TODO: we will pass the account info to make an account in the backend (primary key is user id)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


app.get('/api/get-daily-recs', async (req, res, next) => {
  console.log(req.query)
  const profile = await getUserProfileInfo(req.query.userAccessToken)
  const artistId = profile.favorite_artist_data.id
  const genres = profile.top_3_genres[0].toString()
  let trackList = profile.top_10_songs.map(song => song.id)
  if (trackList.length > 3) {
    trackList = trackList.slice(0,3)
  }
  const tracks = trackList.toString()
  getRecommendationsGeneral(seed_artists_ = artistId, seed_genres_ = genres, seed_tracks = tracks)
    .then(response => {
      console.log(response.body)
      res.send(response.body.tracks)
    })
})

app.get('/api/get-recommendations', async (req, res, next) => {
  const artists = req.query.artists
  const genres = req.query.genres
  const response = await getRecommendationsGeneral(artists, genres);
  res.send(response)
})

app.get('/api/get-all-users', async (req, res, next) => {
  const response = await getAllUsers();
  res.send(response)
})

app.post('/api/swipe-profile-left', async (req, res, next) => {
  const swiperID = req.body.swiperID
  const swipeeID = req.body.swipeeID
  await swipeLeft(swiperID, swipeeID);
  res.send(false);
})

app.post('/api/swipe-profile-right', async (req, res, next) => {
  const swiperID = req.body.swiperID
  const swipeeID = req.body.swipeeID
  await swipeRight(swiperID, swipeeID);
  const isMatch = await isMatch(swiperID, swipeeID);
  res.send(isMatch);
})


app.post('/api/swipe-song-right', async (req, res, next) => {
  const userID = req.body.userID
  const songID = req.body.songID
  console.log(req.body)
  await swipeSongRight(userID, songID);
})

app.post('/api/swipe-song-left', async (req, res, next) => {
  const userID = req.query.userID
  const songID = req.query.songID
  console.log(req.body)
  await swipeSongLeft(userID, songID);
})
