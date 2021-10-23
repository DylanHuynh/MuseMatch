const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: '2dc1d1cc4a344030a74de9fa03c8f4a8',
    clientSecret: '86f81ff134f5491185034228dcf50c1e'
  });
  
// Retrieve an access token using your credentials
spotifyApi.clientCredentialsGrant().
    then(function(result) {
        console.log('It worked! Your access token is: ' + result.body.access_token); 
        spotifyApi.setAccessToken(result.body.access_token);
        console.log(result.body);

        // All requests w/ authorized API
        spotifyApi.getRecommendations({
            min_energy: 0.4,
            seed_artists: ['1Xyo4u8uXC1ZmMpatF05PJ', '246dkjvS1zLTtiykXe5h60'],
            seed_genres: ['pop', 'hip_hop'],
            min_popularity: 75,
            limit: 3
          })
        .then(function(data) {
          let recommendations = data.body;
          console.log(recommendations);
        }, function(err) {
          console.log("Something went wrong!", err);
        });
      
    }).catch(function(err) {
        console.log('If this is printed, it probably means that you used invalid ' +
        'clientId and clientSecret values. Please check!');
        console.log('Hint: ');
        console.log(err);
    }
);