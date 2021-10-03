const { MongoClient } = require('mongodb');

// Replace the following with your Atlas connection string
const url = 'mongodb+srv://MuseMatch:musematch123@cluster0.6ip8o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//const client = new MongoClient(url);


// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//         await listDatabases(client);
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// };

// run().catch(console.dir);

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("beta");
//     var firstUser = { name: "John Smith", genres: "Rock, Pop, Country"};
//     dbo.collection("user").insertOne(firstUser, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("beta");
    dbo.collection("user").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.name, result.genres);
      db.close();
    });
  });