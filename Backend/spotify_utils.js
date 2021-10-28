const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: '2dc1d1cc4a344030a74de9fa03c8f4a8',
    clientSecret: '86f81ff134f5491185034228dcf50c1e'
  });
  
// Retrieve an access token using your credentials

async function credentialsRefresh(spotifyApi) {
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

async function getArtistByID(spotifyApi, artistID) {
    await credentialsRefresh(spotifyApi);
    spotifyApi.getArtist(artistID)
        .then(function(data) {
            return data.body;
        }, function(err) {
            console.error(err);
        }
    );
}

async function getSongByID(spotifyApi, songID) {
    await credentialsRefresh(spotifyApi);
    spotifyApi.getAlbum(songID)
        .then(function(data) {
            console.log('Album information', data.body);
        }, function(err) {
            console.error(err);
        }
    );
}