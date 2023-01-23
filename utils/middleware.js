///////////////////////////////
//// Import Dependencies   ////
///////////////////////////////
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const session = require("express-session") // import path module
const MongoStore = require('connect-mongo')
require("dotenv").config() // Load ENV Variables
const methodOverride = require('method-override')

//////////////////////////////////
//// Middleware function      ////
//////////////////////////////////
const middleware = (app) => {
    app.use(methodOverride('_method'))
    app.use(morgan("tiny"))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static("public"))
    app.use(express.json())
    app.use(
        session({
            secret: process.env.SECRET,
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL
            }),
            saveUninitialized: true,
            resave: false
        })
    )
}

//////////////////////////////////
//// Export Middleware        ////
//////////////////////////////////
module.exports = middleware