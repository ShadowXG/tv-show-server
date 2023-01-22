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
    } else {
        res.sendStatus(401)
    }
})

// DELETE route
// only the author of the comment can delete the comment
router.delete('/delete/:tvId/:commId', (req, res) => {
    // isolate the id and save them to variables for easy access
    const { tvId, commId } = req.params
    // get the tv show
    TV.findById(tvId)
        .then(tv => {
            const theComment = tv.comments.id(commId)
            if (req.session.loggedIn) {
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    tv.save()
                    res.sendStatus(204)
                } else {
                    res.sendStatus(401) // unauthorized
                }
            } else {
                res.sendStatus(401) // unauthorized
            }
        })
        .catch(err => {
            // catch any errors
            console.log(err)
            res.status(400)
        })
})

//////////////////////////
//// Export Router    ////
//////////////////////////
module.exports = router