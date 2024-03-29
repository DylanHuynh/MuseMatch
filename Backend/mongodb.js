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
    rightSwiped: [List of the id of people swiped right by them]
    leftSwiped: [List of the id of people swiped left by them]
}
 */

// Replace the following with your Atlas connection string
const url = 'mongodb+srv://MuseMatch:musematch123@cluster0.6ip8o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);

async function write(userInfo) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("musematch");
    dbo.collection("account_info").insertOne(userInfo, function (err, res) {
      if (err) throw err;
      db.close();
      return;
    });
  });
}

async function readByID(id) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("musematch");
    dbo.collection("account_info").findOne({
      id: id
    }, function (err, result) {
      if (err) throw err;
      db.close();
      return result;
    });
  });
}

async function readByUID(uid) {
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });
  if (!client) {
    return;
  }

  try {

    const db = client.db("musematch");

    let collection = db.collection('account_info');

    let query = { uid: uid }

    let res = await collection.findOne(query);
    if (res == null) {
      return {
        uid: -1
      }
    }

    return res

  } catch (err) {

    console.log(err);
  } finally {

    client.close();
  }

}

async function deleteByID(id) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("musematch");
    dbo.collection("account_info").deleteOne({
      id: id
    }, function (err, result) {
      if (err) throw err;
      db.close();
      return;
    });
  });
}

async function updateOneByID(uid, updateValues) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("musematch");
    dbo.collection("account_info").updateOne({
        uid: uid
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
  const swiper = await readByUID(swiperID);
  swiper.rightProfileSwiped.push(swipeeID);
  updateOneByID(swiperID, {
    rightProfileSwiped: swiper.rightProfileSwiped
  });
}

async function swipeLeft(swiperID, swipeeID) {
  const swiper = await readByUID(swiperID);
  swiper.leftProfileSwiped.push(swipeeID);
  updateOneByID(swiperID, {
    leftProfileSwiped: swiper.leftProfileSwiped
  });
}

async function isMatch(userA_ID, userB_ID) {
  let userA = await readByUID(userA_ID);
  let userB = await readByUID(userB_ID);
  console.log(userA.rightProfileSwiped)
  console.log(userB.rightProfileSwiped)
  return (userA.rightProfileSwiped.indexOf(userB_ID) != -1) &&
         (userB.rightProfileSwiped.indexOf(userA_ID) != -1);
}

async function swipeSongRight(swiperID, songID) {
  const swiper = await readByUID(swiperID);
  swiper.rightSongSwiped.push(songID);
  updateOneByID(swiperID, {
    rightSongSwiped: swiper.rightSongSwiped
  });
}

async function swipeSongLeft(swiperID, songID) {
  const swiper = await readByUID(swiperID);
  swiper.leftSongSwiped.push(songID);
  updateOneByID(swiperID, {
    leftSongSwiped: swiper.leftSongSwiped
  });
}

async function getAllUsers() {
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });
  if (!client) {
    return;
  }
  try {
    const db = client.db("musematch");
    let collection = db.collection('account_info');
    let res = await collection.find({}).toArray();
    return res

  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

module.exports = { write, readByUID, swipeSongRight, swipeSongLeft, swipeRight, swipeLeft, isMatch , getAllUsers }

