const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: '2dc1d1cc4a344030a74de9fa03c8f4a8',
    clientSecret: '86f81ff134f5491185034228dcf50c1e'
  });
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

async function getUserProfileInfo(userAccessToken) {
    let apiConnection = new SpotifyWebApi();
    apiConnection.setAccessToken(userAccessToken);
    let tracksResponse = await apiConnection.getMyTopTracks();
    var tracksData = tracksResponse.body.items;
    // Get top 10 songs
    var top10songs = [];
    for (song of tracksData.slice(0, 10)) {
      top10songs.push({"name": song.name, "id": song.id});
    }
    // Get top 3 songs images
    var top3songimages = [];
    for (song of tracksData.slice(0, 3)) {
      top3songimages.push(song.album.images[0].url);
    }
    // Get favorite artist information
    let artistResponse = await apiConnection.getMyTopArtists();
    var favArtist = artistResponse.body.items[0];
    var favArtistData = {
      "name": favArtist.name,
      "id": favArtist.id,
      "image": favArtist.images[0].url
    };
    // Return accumulated profile data
    let profileInfo = {
      "Top 10 Songs": top10songs,
      "Top 3 Songs' Images": top3songimages,
      "Favorite Artist Data": favArtistData
    };
    return profileInfo;
}

module.exports = {searchByArtist, searchBySong, getUserProfileInfo};
