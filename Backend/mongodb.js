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
  console.log("uid",uid)
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
    console.log({res})
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
  const swiper = await readByUID(swiperID);
  swiper.rightSongSwiped.push(songID);
  console.log("rightSwipe",swiper.rightSongSwiped)
  updateOneByID(swiperID, {
    rightSongSwiped: swiper.rightSongSwiped
  });
}

async function swipeSongLeft(swiperID, songID) {
  const swiper = await readByUID(swiperID);
  swiper.leftSongSwiped.push(songID);
  console.log("leftSwipe",swiper.rightSongSwiped)

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

