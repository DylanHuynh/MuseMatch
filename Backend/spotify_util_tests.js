let spotify_utils = require("./spotify_utils");

async function getArtistByIDTest() {
    artist = spotify_utils.getArtistByID('43ZHCT0cAZBISjO8DG9PnE').then((body) => {
        if (body.name != 'Elvis Presley') {
            console.log("Data not match!" + body);
            console.log(body);
        }
    }).catch((err) => {
        console.err(err);
    });
}
getArtistByIDTest();
