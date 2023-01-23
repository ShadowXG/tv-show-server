///////////////////////////////
//// Import Dependencies   ////
///////////////////////////////
const express = require('express')
const Show = require('../models/tv-shows')

//////////////////////////
//// Create Router    ////
//////////////////////////
const router = express.Router()

//////////////////////
//// Routes       ////
//////////////////////

// POST route
// only logged in users can post comments
router.post('/:showId', (req,res) => {
    const showId = req.params.showId
    if (req.session.loggedIn) {
        req.body.author = req.session.userId
        const theComment = req.body
        // find a specific show show
        Show.findById(showId)
            .then(show => {
                show.comments.push(theComment)
                // save the show
                return show.save()
            })
            .then(show => {
                // respond with a 201 and the show itself
                // res.status(201).json({ show: show })
                res.redirect(`/shows/${show.id}`)
            })
            .catch(err => {
                // catch any errors
                console.log(err)
                // res.status(400).json(err)
                res.redirect(`/error?error=${err}`)
            })
    } else {
        // res.sendStatus(401)
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20comment%20on%20this%20show`)
    }
})

// DELETE route
// only the author of the comment can delete the comment
router.delete('/delete/:showId/:commId', (req, res) => {
    // isolate the id and save them to variables for easy access
    const { showId, commId } = req.params
    // get the show show
    Show.findById(showId)
        .then(show => {
            const theComment = show.comments.id(commId)
            if (req.session.loggedIn) {
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    show.save()
                    // res.sendStatus(204)
                    res.redirect(`/shows/${show.id}`)
                } else {
                    // res.sendStatus(401) // unauthorized
                    res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
                }
            } else {
                // res.sendStatus(401) // unauthorized
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
            }
        })
        .catch(err => {
            // catch any errors
            console.log(err)
            // res.status(400)
            res.redirect(`/error?error=${err}`)
        })
})

//////////////////////////
//// Export Router    ////
//////////////////////////
module.exports = router