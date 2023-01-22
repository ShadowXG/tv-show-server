///////////////////////////////
//// Import Dependencies   ////
///////////////////////////////
const express = require('express')
const TV = require('../models/tv-shows')

//////////////////////////
//// Create Router    ////
//////////////////////////
const router = express.Router()

//////////////////////
//// Routes       ////
//////////////////////

// POST route
// only logged in users can post comments
router.post('/:tvId', (req,res) => {
    const tvId = req.params.tvId
    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    const theComment = req.body
    // find a specific tv show
    TV.findById(tvId)
        .then(tv => {
            tv.comments.push(theComment)
            // save the tv
            return tv.save()
        })
        .then(tv => {
            // respond with a 201 and the tv itself
            res.status(201).json({ tv: tv })
        })
        .catch(err => {
            // catch any errors
            console.log(err)
            res.status(400).json(err)
        })
})

//////////////////////////
//// Export Router    ////
//////////////////////////
module.exports = router