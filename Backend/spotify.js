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

async function getRecommendations(
  spotifyApi, 
  seed_artists_, 
  seed_genres_, 
  min_energy_ = 0.4, 
  min_popularity_ = 75,
  limit_ = 3) {
    const didRefresh = await credentialsRefresh(spotifyApi);
    if (didRefresh == 0) {
      spotifyApi.getRecommendations({
        min_energy: min_energy_,
        seed_artists: seed_artists_,
        seed_genres: seed_genres_,
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

getRecommendations(spotifyApi, ['1Xyo4u8uXC1ZmMpatF05PJ', '246dkjvS1zLTtiykXe5h60'], ['pop', 'hip_hop'])
