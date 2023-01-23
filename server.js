///////////////////////////////
//// Import Dependencies   ////
///////////////////////////////
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const path = require("path") // import path module
require("dotenv").config() // Load ENV Variables
const TvRouter = require('./controllers/tv-showsControllers')
const CommentRouter = require('./controllers/commentControllers')
const UserRouter = require('./controllers/userControllers')
const middleware = require('./utils/middleware')

///////////////////////////////////////
//// Create our Express App Object ////
///////////////////////////////////////
// the old way it was fine for building an API that sends and recieves JSON
// const app = express()
// now it a full stack app
const app = require('liquid-express-views')(express())

//////////////////////
//// Middleware   ////
//////////////////////
middleware(app)

////////////////////
//// Routes     ////
////////////////////
app.get('/', (req, res) => {
    res.render('home.liquid', {...req.session})
})

// register the routes
app.use('/shows', TvRouter)
app.use('/comments', CommentRouter)
app.use('/users', UserRouter)

// Error page
app.get('/error', (req, res) => {
    const error = req.query.error || 'This page does not exist'

    // const { username, loggedIn, userId } = req.session
    res.render('error.liquid', { error, ...req.session })
})

// catch all to redirect to the error page
app.all('*', (req, res) => {
    res.redirect('/error')
})

///////////////////////////
//// Server Listener   ////
///////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))