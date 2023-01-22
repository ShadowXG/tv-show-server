/////////////////////////////////////////////
//// My schema and model for tv shows    ////
/////////////////////////////////////////////
const mongoose = require('../utils/connection')
const commentSchema = require('./comment')

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
    },
    comments: [commentSchema]
}, { timestamps: true })

const TV = model('TV', tvShowSchema)

//////////////////////////
//// Export our Model ////
//////////////////////////
module.exports = TV