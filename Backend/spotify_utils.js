const SpotifyWebApi = require('spotify-web-api-node');
let mongoDB_utils = require("./mongodb");

const spotifyApi = new SpotifyWebApi({
    clientId: '2dc1d1cc4a344030a74de9fa03c8f4a8',
    clientSecret: '86f81ff134f5491185034228dcf50c1e'
  });

// Retrieve an access token using your credentials

async function credentialsRefresh() {
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

async function getRecommendationsGeneral(
  seed_artists_,
  seed_genres_,
  seed_tracks_,
  min_energy_ = 0.4,
  min_popularity_ = 75,
  limit_ = 10) {
    const didRefresh = await credentialsRefresh(spotifyApi);
    if (didRefresh == 0) {
      console.log(seed_artists_,seed_genres_,seed_tracks_,limit_)
      return await spotifyApi.getRecommendations({
        min_energy: min_energy_,
        seed_artists: seed_artists_,
        seed_genres: seed_genres_,
        min_popularity: min_popularity_,
        seed_tracks: seed_tracks_,
        limit: limit_
      });
    }
}

async function getRecommendationsUser(
  userID,
  min_energy_ = 0.4,
  min_popularity_ = 75,
  limit_ = 3) {
    const didRefresh = await credentialsRefresh(spotifyApi);
    if (didRefresh == 0) {
      const user = await mongoDB_utils.readByID(userID);
      spotifyApi.getRecommendations({
        min_energy: min_energy_,
        seed_artists: user.artists,
        seed_genres: user.genres,
        min_popularity: min_popularity_,
        limit: limit_
      }).then(function(data) {
        let recommendations = data.body;
        console.log(recommendations);
      }, function(err) {
          console.log("Something went wrong!", err);
        }
      );
    }
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
      top10Songs.push({
        "name": song.name,
        "id": song.id,
        "image": song.album.images[0].url,
        "artist": song.artists[0].name,
        "artist_id": song.artists[0].id
      });
    }
    // Get favorite artist information
    let artistResponse = await apiConnection.getMyTopArtists();
    let topArtists = artistResponse.body.items;
    let favArtistData = [];
    for (let i = 0; i < 10; i++) {
      let artist = topArtists[i];
      favArtistData.push({
        "name": artist.name,
        "id": artist.id,
        "image": artist.images[0].url
      });
    }
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
    let top3Genres = genreCountsList.slice(0, 3).filter(item => item[1] > 1).map(function(item) {return item[0];})
    // Return accumulated profile data
    let profileInfo = {
      "top_10_songs": top10Songs,
      "top_10_artists": favArtistData,
      "top_3_genres": top3Genres
    };
    return profileInfo;
}

module.exports = {searchByArtist, searchBySong, getArtistByID, getSongByID, getRecommendationsGeneral, getUserProfileInfo};
