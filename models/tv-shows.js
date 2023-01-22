/////////////////////////////////////////////
//// My schema and model for tv shows    ////
/////////////////////////////////////////////
const { trusted } = require('mongoose')
const mongoose = require('../utils/connection')

const { Schema, model } = mongoose

// TV Show schema
const tvShowSchema = new Schema({
    name: {
        String,
    },
    genre: {
        String,
    },
    inProduction: {
        Boolean
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const TV = model('TV', tvShowSchema)

//////////////////////////
//// Export our Model ////
//////////////////////////
module.exports = TV