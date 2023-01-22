///////////////////////////////
//// Import Dependencies   ////
///////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const path = require("path") // import path module
const TvRouter = require('./controllers/tv-showsControllers')
const middleware = require('./utils/middleware')

///////////////////////////////////////
//// Create our Express App Object ////
///////////////////////////////////////
const app = express()

//////////////////////
//// Middleware   ////
//////////////////////
middleware(app)

////////////////////
//// Routes     ////
////////////////////
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests')
})

// register the routes
app.use('/tv', TvRouter)

///////////////////////////
//// Server Listener   ////
///////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))