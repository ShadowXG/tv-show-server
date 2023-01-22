/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const mongoose = require('../utils/connection')
const TV = require('./tv-shows')

/////////////////////////////////////
//// Seed Script code            ////
/////////////////////////////////////

// first we'll save the db to a variable
const db = mongoose.connection

// The seed route
db.on('open', () => {
    // array of starter(tv shows)
    const startTvShows = [
        {name: 'Psych', genre: 'crime, comedy', inProduction: false},
        {name: 'Suits', genre: 'drama', inProduction: false},
        {name: 'Doctor Who', genre: 'adventure', inProduction: true},
        {name: 'Brooklyn Nine-Nine', genre: 'crime, comedy', inProduction: false},
    ]
    // delete all the tv shows in the db
    TV.deleteMany({})
        .then(() => {
            // create the start tv shows
            TV.create(startTvShows)
                // tell our db what to do with success and failures
                .then(data => {
                    rconsole.log('Here are the created fruits: \n', data)
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