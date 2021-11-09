const { MongoClient } = require('mongodb');
const SpotifyWebApi = require('spotify-web-api-node');

/*** User Info
 *
 *{
    id: "Unique ID of the user",
    name: "Name of the user",
    genres: [],
    songs: [],
    artists: [],
    rightSwipped: [List of the id of people swiped right by them]
    leftSwipped: [List of the id of people swiped left by them]
}
 */

// Replace the following with your Atlas connection string
const url = 'mongodb+srv://MuseMatch:musematch123@cluster0.6ip8o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);

async function write(userInfo) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("musematch");
        dbo.collection("account_info").insertOne(userInfo, function(err, res) {
          if (err) throw err;
          db.close();
          return;
        });
      });
}

async function readByID(id) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("musematch");
        dbo.collection("account_info").findOne({
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
    var dbo = db.db("musematch");
    dbo.collection("account_info").deleteOne({
        id: id
    }, function(err, result) {
      if (err) throw err;
      db.close();
      return;
    });
  });
}

async function swipeRight(swiperID, swipeeID) {
  let swiper = readByID(swiperID);
  swiper.rightSwipped.push(swipeeID);
  deleteByID(swiperID);
  write(swiper);
}

async function swipeLeft(swiperID, swipeeID) {
  let swiper = readByID(swiperID);
  swiper.leftSwipped.push(swipeeID);
  deleteByID(swiperID);
  write(swiper);
}

module.exports = {write}
