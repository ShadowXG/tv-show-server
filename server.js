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

///////////////////////////
//// Server Listener   ////
///////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))