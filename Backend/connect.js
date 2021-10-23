const { MongoClient } = require('mongodb');
const SpotifyWebApi = require('spotify-web-api-node');

// Replace the following with your Atlas connection string
const url = 'mongodb+srv://MuseMatch:musematch123@cluster0.6ip8o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);
// const spotifyApi = new SpotifyWebApi();

// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//     function(data) {
//       console.log('Artist albums', data.body);
//     },
//     function(err) {
//       console.error(err);
//     }
//   );

async function write(userInfo) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("beta");
        dbo.collection("user").insertOne(userInfo, function(err, res) {
          if (err) throw err;
          db.close();
          return;
        });
      });
}

async function readByID(id) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("beta");
        dbo.collection("user").findOne({
            id: id
        }, function(err, result) {
          if (err) throw err;
          db.close();
          return result;
        });
      });
}

async function deleteByID(id) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("beta");
    dbo.collection("user").deleteOne({
        id: id
    }, function(err, result) {
      if (err) throw err;
      db.close();
      return;
    });
  });
}

async function swipeRight(swiperID, swipeeID) {
  // let swiper = readByID(swiperID);
  // swiper.rightSwipped.push(swipeeID);
  // deleteByID(swiperID);
  // write(swiper);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("beta");
    dbo.collection("user").updateOne({
        id: swiperID
    }, {
      $set: {"id": 4}
    });
    return;
  });
}

swipeRight("3", "4");