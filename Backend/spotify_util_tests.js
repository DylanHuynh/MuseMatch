let spotify_utils = require("./spotify_utils");

async function getArtistByIDTest() {
    artist = spotify_utils.getArtistByID('43ZHCT0cAZBISjO8DG9PnE').then((body) => {
        if (body != 'Elvis Presley') {
            console.err("Data not match!");
        }
    }).catch((err) => {
        console.err(err);
    });
}
getArtistByIDTest();
