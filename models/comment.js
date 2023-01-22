////////////////////////////////////////////////////
//// Schema for the comment subdocument         ////
////////////////////////////////////////////////////
const mongoose = require('../utils/connection')

const { Schema } = mongoose

const commentSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

// There is no model function, because subdocs ARE NOT mongoose models.

////////////////////////////////////
//// Export our Schema          ////
////////////////////////////////////
module.exports = commentSchema