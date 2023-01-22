///////////////////////////////////
//// Import Our Dependencies   ////
///////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const mongoose = require("mongoose") // import mongoose
const path = require("path") // import path module

///////////////////////////////
//// Import Our Models     ////
///////////////////////////////
const TV = require('./models/tv-shows')

////////////////////////////////
//// Database Connection    ////
////////////////////////////////
// Setup input for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when the connection opens/disconnects/errors
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('open', (error) => console.log(error))

///////////////////////////////////////
//// Create our Express App Object ////
///////////////////////////////////////
const app = express()

//////////////////////
//// Middleware   ////
//////////////////////
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(express.json())

////////////////////
//// Routes     ////
////////////////////
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests')
})

// The seed route
app.get('/tv/seed', (req, res) => {
    // array of starter(tv shows)
    const startTvShows = [
        {name: 'Psych', genre: 'crime, comedy', inProduction: false},
        {name: 'Suits', genre: 'drama', inProduction: false},
        {name: 'Doctor Who', theme: 'adventure', inProduction: true},
        {name: 'Brooklyn Nine-Nine', theme: 'crime, comedy', inProduction: false},
    ]
    // delet all the tv shows in the db
    TV.deleteMany({})
        .then(() => {
            // create the start tv shows
            TV.create(startTvShows)
                // tell our db what to do with success and failures
                .then(data => {
                    res.json(data)
                })
                .catch(err => console.log('The following error occurred: \n', err))
        })
})

// INDEX route
// Read -> finds and displays all tv shows
app.get('/tv', (req, res) => {
    // find all the tv shows
    TV.find({})
        // send json if successful
        .then(tvs => { res.json({ tvs: tvs })})
        // catch errors if they occur
        .catch(err => console.log('The following error occurred: \n', err))
})

///////////////////////////
//// Server Listener   ////
///////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))