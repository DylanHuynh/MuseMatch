const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: '2dc1d1cc4a344030a74de9fa03c8f4a8',
    clientSecret: '86f81ff134f5491185034228dcf50c1e'
  });

const spotifyCredentials = {
    clientId: 'a2ecb5b0a2154d4f9fb99f632ecdd889',
    clientSecret: 'bc26c22208f142b1b5933db834fb686f',
    redirectUri: 'https://auth.expo.io/@anonymous/MuseMatch-bb351e1f-4527-4cf6-849e-46bafb82c4a0'
}
// Retrieve an access token using your credentials

async function credentialsRefresh(spotifyApi) {
  let error = 0;
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

async function searchByArtist(search) {
  await credentialsRefresh(spotifyApi)
  let data = await spotifyApi.searchArtists(search)
  return data.body;
}

async function searchBySong(search) {
    await credentialsRefresh(spotifyApi)
    let data = await spotifyApi.searchTracks(search)
    return data.body;
  }

module.exports = {searchByArtist, searchBySong}