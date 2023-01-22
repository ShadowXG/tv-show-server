/////////////////////////////////////////////
//// My schema and model for tv shows    ////
/////////////////////////////////////////////
const mongoose = require('mongoose')

const { Schema, model } = mongoose

// TV Show schema
const tvShowSchema = new Schema({
    name: String,
    genre: String,
    inProduction: Boolean
})

const TV = model('TV', tvShowSchema)

//////////////////////////
//// Export our Model ////
//////////////////////////
module.exports = TV