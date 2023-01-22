///////////////////////////////
//// Import Dependencies   ////
///////////////////////////////
const mongoose = require('mongoose')
require('dotenv').config()

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

//////////////////////////////////
//// Export our Connection    ////
//////////////////////////////////
module.exports = mongoose