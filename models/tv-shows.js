/////////////////////////////////////////////
//// My schema and model for tv shows    ////
/////////////////////////////////////////////
const mongoose = require('../utils/connection')
const commentSchema = require('./comment')

const { Schema, model } = mongoose

// TV Show schema
const tvShowSchema = new Schema({
    name: {
        type: String
    },
    genre: {
        type: String
    },
    inProduction: {
        type: Boolean
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
}, { timestamps: true })

const Show = model('Show', tvShowSchema)

//////////////////////////
//// Export our Model ////
//////////////////////////
module.exports = Show