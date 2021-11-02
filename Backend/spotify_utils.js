const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: '2dc1d1cc4a344030a74de9fa03c8f4a8',
    clientSecret: '86f81ff134f5491185034228dcf50c1e'
  });

// Retrieve an access token using your credentials

async function credentialsRefresh() {
  const error = 0;
  await spotifyApi.clientCredentialsGrant().
    then(function(result) {
        spotifyApi.setAccessToken(result.body.access_token);
      }).catch(function(err) {
        console.log(err);
        error = 1;
    }
  );
  return error;
}

async function getArtistByID(artistID) {
    const didRefresh = await credentialsRefresh(spotifyApi);
    if (didRefresh == 0) {
        const artistData = await spotifyApi.getArtist(artistID);
        return artistData.body;
    }   
}

async function getSongByID(songID) {
    const didRefresh = await credentialsRefresh(spotifyApi);
    if (didRefresh == 0) {
        const songData = await spotifyApi.getAlbum(songID);
        return songData.body;
    }
}

exports.getArtistByID = getArtistByID;
exports.getSongByID = getSongByID;