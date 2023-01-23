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

// INDEX route
// Read -> finds and displays all tv shows
router.get('/', (req, res) => {
    const { username, loggedIn, userId } = req.session
    // find all the tv shows
    Show.find({})
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        // send json if successful
        .then(shows => { 
            // res.json({ tvs: tvs })
            // now that liquid is installed we'll have to render instead
            res.render('tv-shows/index', { shows, username, loggedIn, userId })
        })
        // catch errors if they occur
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`error?error=${err}`)
        })
})

router.get('/new', (req, res) => {
    res.render('tv-shows/new', { ...req.session })
})

// CREATE route
// Create -> receives a request, and creates a new document
router.post('/', (req, res) => {
    req.body.owner = req.session.userId
    req.body.inProduction = req.body.inProduction === 'on' ? true : false
    const newTvShow = req.body
    Show.create(newTvShow)
        .then(show => {
            // sending a 201 status, along with the new tv show
            // res.status(201).json({ show: show.toObject() })
            // now we'll redirect instead
            res.redirect(`/shows/${show.id}`)
        })
        // send an err if one occurs
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET route
// Index -> this will only show the logged in user's tv shows
router.get('/mine', (req, res) => {
    // find tv shows by ownership
    Show.find({ owner: req.session.userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(shows => {
            // if found display the tv shows
            // res.status(200).json({ shows: shows })
            res.render('tv-shows/index', {shows, ...req.session})
        })
        .catch(err => {
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET route for user specific shows
// this will only show the logged in users tv shows
router.get('/json', (req, res) => {
    // find show by ownership
    Show.find({ owner: req.session.userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(shows => {
            res.render('tv-shows/index', { shows, ...req.session})
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
    Show.findById(id)
        .then(show => {
            // check if the owner matches the person logged in
            if (show.owner == req.session.userId) {
                // if true send a success message
                res.sendStatus(204)
                // update and save the fruit
                return show.updateOne(req.body)
            } else {
                // otherwise send an unathorized status
                // res.sendStatus(401)
                res.redirect(`/error?error=You%20are%20not%20allowed%20to%20edit%20this%20show`)
            }
        })
        .catch(err => {
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// DELETE route
// Delete -> destroys a single tv show
router.delete('/:id', (req, res) => {
    // get the id
    const id = req.params.id
    // find and delete the tv show
    Show.findById(id)
        .then(show => {
            // check if the owner matches the person logged in
            if (show.owner == req.session.userId) {
                // if true send a success message
                // res.sendStatus(204)
                // update and save the fruit
                return show.deleteOne()
            } else {
                // otherwise send an unathorized status
                // res.sendStatus(401)
                res.redirect(`/error?error=You%20are%20not%20allowed%20to%20delete%20this%20show`)
            }
        })
        .then(() => {
            res.redirect('/shows/mine')
        })
        .catch(err => {
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// SHOW route
// read -> finds and displays a single resource
router.get('/:id', (req, res) => {
    // get the id
    const id = req.params.id
    Show.findById(id)
        .populate('comments.author', 'username')
        .then(show => {
            // send the tv show as json upon success
            // res.json({ show: show })
            // now we'll render it
            res.render('tv-shows/show.liquid', { show, ...req.session})
        })
        .catch(err => {
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

//////////////////////////
//// Export Router    ////
//////////////////////////
module.exports = router