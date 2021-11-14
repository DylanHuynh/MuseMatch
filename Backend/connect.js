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
    rightSwipped: [List of the id of people swiped right by them],
    leftSwipped: [List of the id of people swiped left by them],
    rightSongSwipped: [List of the id of song swiped right by them],
    leftSongSwipped: [List of the id of song swiped left by them]
}
 */

// Replace the following with your Atlas connection string
const url = 'mongodb+srv://MuseMatch:musematch123@cluster0.6ip8o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);

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
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });
  if (!client) {
    return;
  }
  try {
    const db = client.db("beta");
    let collection = db.collection('user');
    let query = { id: id }
    let res = await collection.findOne(query);
    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
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

async function updateOneByID(id, updateValues) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("beta");
    dbo.collection("user").updateOne({
        id: id
    }, {
      $set: updateValues
    }, function(err, result) {
      if (err) throw err;
      db.close();
      return;
    });
  });
}

async function swipeRight(swiperID, swipeeID) {
  const swiper = await readByID(swiperID);
  swiper.rightSwipped.push(swipeeID);
  updateOneByID(swiperID, {
    rightSwipped: swiper.rightSwipped
  });
}

async function swipeLeft(swiperID, swipeeID) {
  const swiper = await readByID(swiperID);
  swiper.leftSwipped.push(swipeeID);
  updateOneByID(swiperID, {
    leftSwipped: swiper.leftSwipped
  });
}

async function isMatch(userA_ID, userB_ID) {
  let userA = await readByID(userA_ID);
  let userB = await readByID(userB_ID);
  return (userA.rightSwipped.indexOf(userB_ID) != -1) && 
         (userB.rightSwipped.indexOf(userA_ID) != -1);
}

async function swipeSongRight(swiperID, songID) {
  const swiper = await readByID(swiperID);
  console.log(swiper);
  swiper.rightSongSwipped.push(songID);
  updateOneByID(swiperID, {
    rightSongSwipped: swiper.rightSongSwipped
  });
}

async function swipeSongLeft(swiperID, songID) {
  const swiper = await readByID(swiperID);
  console.log(swiper);
  swiper.leftSongSwipped.push(songID);
  updateOneByID(swiperID, {
    leftSongSwipped: swiper.leftSongSwipped
  });
}

exports.readByID = readByID;