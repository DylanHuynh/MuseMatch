const express = require('express')
const cors=require("cors");
const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const app = express()
app.use(cors(corsOptions)) // Use this after the variable declaration

const port = 3000

app.get('/api/spotify-credentials', (req, res, next) => {
    const spotifyCredentials = {
        clientId: 'a2ecb5b0a2154d4f9fb99f632ecdd889',
        clientSecret: 'bc26c22208f142b1b5933db834fb686f',
        redirectUri: 'https://auth.expo.io/@anonymous/MuseMatch-bb351e1f-4527-4cf6-849e-46bafb82c4a0'
    }
  res.send(spotifyCredentials)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })