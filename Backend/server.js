const express = require('express')
const cors=require("cors");
var {searchByArtist, searchBySong} = require('./spotify_utils.js');

const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const app = express()
app.use(cors(corsOptions)) // Use this after the variable declaration

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
  searchByArtist(req.query.search).then((artists)=>{
    res.send(artists)

    }
  )
})

app.get('/api/search-by-song', async (req, res, next) => {
  /*
    if there is an error thrown in getUserFromDb, asyncMiddleware
    will pass it to next() and express will handle the error;
  */
  searchBySong(req.query.search).then((songs)=>{
    res.send(songs)

    }
  )
})

app.post('/api/create-account', async (req, res, next) => {
  /*
    if there is an error thrown in getUserFromDb, asyncMiddleware
    will pass it to next() and express will handle the error;
  */
  console.log(req.body)
  //TODO: we will pass the account info to make an account in the backend (primary key is user id)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })