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

// INDEX route
// Read -> finds and displays all tv shows
router.get('/', (req, res) => {
    // find all the tv shows
    TV.find({})
        .populate('owner', '-password')
        // send json if successful
        .then(tvs => { res.json({ tvs: tvs })})
        // catch errors if they occur
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})

// CREATE route
// Create -> receives a request, and creates a new document
router.post('/', (req, res) => {
    const newTvShow = req.body
    TV.create(newTvShow)
        .then(tv => {
            // sending a 201 status, along with the new tv show
            res.status(201).json({ tv: tv.toObject() })
        })
        // send an err if one occurs
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})

// GET route
// Index -> this will only show the logged in user's tv shows
router.get('/mine', (req, res) => {
    // find tv shows by ownership
    TV.find({ owner: req.session.userId })
        .populate('owner', '-password')
        .then(tvs => {
            // if found display the tv shows
            res.status(200).json({ tvs: tvs })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

// PUT route
// Update -> updates a specific tv show
router.put('/:id', (req, res) => {
    // save the id for easy reference later
    const id = req.params.id
    // find the tv show by id and update it
    TV.findById(id)
        .then(tv => {
            // check if the owner matches the person logged in
            if (tv.owner == req.session.userId) {
                // if true send a success message
                res.sendStatus(204)
                // update and save the fruit
                return tv.updateOne(req.body)
            } else {
                // otherwise send an unathorized status
                res.sendStatus(401)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

// DELETE route
// Delete -> destroys a single tv show
router.delete('/:id', (req, res) => {
    // get the id
    const id = req.params.id
    // find and delete the tv show
    TV.findById(id)
        .then(tv => {
            // check if the owner matches the person logged in
            if (tv.owner == req.session.userId) {
                // if true send a success message
                res.sendStatus(204)
                // update and save the fruit
                return tv.deleteOne()
            } else {
                // otherwise send an unathorized status
                res.sendStatus(401)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

// SHOW route
// read -> finds and displays a single resource
router.get('/:id', (req, res) => {
    // get the id
    const id = req.params.id
    TV.findById(id)
        .then(tv => {
            // send the tv show as json upon success
            res.json({ tv: tv })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

//////////////////////////
//// Export Router    ////
//////////////////////////
module.exports = router