/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const mongoose = require('../utils/connection')
const Show = require('./tv-shows')

/////////////////////////////////////
//// Seed Script code            ////
/////////////////////////////////////

// first we'll save the db to a variable
const db = mongoose.connection

// The seed route
db.on('open', () => {
    // array of starter(tv shows)
    const startTvShows = [
        { name: 'Psych', genre: 'Comedy, Crime, and Mystery', inProduction: false },
        { name: 'Suits', genre: 'Comedy and Drama', inProduction: false },
        { name: 'Doctor Who', genre: 'Adventure, Drama, Family, Sci-Fi', inProduction: true },
        { name: 'Brooklyn Nine-Nine', genre: 'Comedy and Crime', inProduction: false },
    ]
    // delete all the tv shows in the db
    Show.deleteMany({ owner: null })
        .then(() => {
            // create the start tv shows
            Show.create(startTvShows)
                // tell our db what to do with success and failures
                .then(data => {
                    console.log('Here are the created shows: \n', data)
                    // close the connection once it's done
                    db.close()
                })
                .catch(err => {
                    console.log('The following error occurred: \n', err)
                    // close the connection
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            // always close the connection
            db.close()
        })
})