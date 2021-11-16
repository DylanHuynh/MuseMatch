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
    const apiConnection = new SpotifyWebApi();
    apiConnection.setAccessToken(userAccessToken);
    let tracksResponse = await apiConnection.getMyTopTracks();
    let tracksData = tracksResponse.body.items;
    // Get top 10 songs
    let top10Songs = [];
    for (song of tracksData.slice(0, 10)) {
      top10Songs.push({"name": song.name, "id": song.id, "image": song.album.images[0].url});
    }
    // Get favorite artist information
    let artistResponse = await apiConnection.getMyTopArtists();
    let topArtists = artistResponse.body.items;
    let favArtist = topArtists[0];
    let favArtistData = {
      "name": favArtist.name,
      "id": favArtist.id,
      "image": favArtist.images[0].url
    };
    // Calculate top 3 genres
    // TODO: Potentially revise/improve genre calculation algorithm
    let genreCounts = {};
    for (artist of topArtists.slice(0, 10)) {
      for (genre of artist.genres) {
        if (!(genre in genreCounts)) {
          genreCounts[genre] = 0;
        }
        genreCounts[genre] += 1;
      }
    }
    let genreCountsList = Object.keys(genreCounts).map(function(genre) {
      return [genre, genreCounts[genre]];
    })
    genreCountsList.sort(function(first, second) {
      return second[1] - first[1];
    })
    let top3Genres = genreCountsList.slice(0, 3).map(function(item) {return item[0];})
    // Return accumulated profile data
    let profileInfo = {
      "top_10_songs": top10Songs,
      "favorite_artist_data": favArtistData,
      "top_3_genres": top3Genres
    };
    return profileInfo;
}

module.exports = {searchByArtist, searchBySong, getUserProfileInfo};
