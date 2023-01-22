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
        // send json if successful
        .then(tvs => { res.json({ tvs: tvs })})
        // catch errors if they occur
        .catch(err => console.log('The following error occurred: \n', err))
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
        .catch(err => console.log('The following error occurred: \n', err))
})

// PUT route
// Update -> updates a specific tv show
router.put('/:id', (req, res) => {
    // save the id for easy reference later
    const id = req.params.id
    // save the req.body for easy reference later
    const updatedTvShow = req.body
    // find the tv show by id and update it
    TV.findByIdAndUpdate(id, updatedTvShow, { new: true })
        .then(tv => {
            console.log('The updated tv show: ', tv)
            res.sendStatus(204)
        })
        .catch(err => console.log('The following error occurred: \n', err))
})

// DELETE route
// Delete -> destroys a single tv show
router.delete('/:id', (req, res) => {
    // get the id
    const id = req.params.id
    // find and delete the tv show
    TV.findByIdAndRemove(id)
        .then(() => {
            res.sendStatus(204)
        })
        .catch(err => console.log('The following error occurred: \n', err))
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
        .catch(err => console.log('The following error occurred: \n', err))
})

//////////////////////////
//// Export Router    ////
//////////////////////////
module.exports = router