/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

///////////////////////////////
//// Create Router         ////
///////////////////////////////
const router = express.Router()

///////////////////////////////
//// Routes                ////
///////////////////////////////
// GET -> User signup
// Renders a page with the sign up form
router.get('/signup', (req, res) => {
    res.render('users/signup')
})
// Post -> /users/signup
// This route creates new users in our db
router.post('/signup', async (req, res) => {
    const newUser = req.body
    // password encryption
    newUser.password = await bcrypt.hash(
        newUser.password,
        await bcrypt.genSalt(10)
    )
    // then create the new User
    User.create(newUser)
        // if successful
        .then(user => {
            // res.status(201).json({ username: user.username })
            res.redirect('/users/login')
        })
        // if there's an error
        .catch(err => {
            console.log(err)
            // res.json(err)
            res.redirect(`/error?error=username%20taken`)
        })
})

// Get -> User login
// Renders a page with a login form
router.get('/login', (req, res) => {
    res.render('users/login')
})

// POST -> /users/login
// This creates a new session in our db(and in the browser)
router.post('/login', async (req, res) => {
    // first decontruct the username and password
    const { username, password } = req.body

    // search the db for the user with that specific username
    User.findOne({ username })
        .then(async (user) => {
            // check if that user exists
            if (user) {
                // if they exist we'll compare passwords
                // we'll save that result to a variavle for easy reference later
                const result = await bcrypt.compare(password, user.password)

                if (result) {
                    // if the passwords match place that user's info in the session
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id

                    // res.status(201).json({ username: user.username })
                    res.redirect('/')
                } else {
                    // res.json({ error: 'username or password is incorrect' })
                    res.redirect(`/error?error=username%20or%20password%20is%20incorrect`)
                }
            } else {
                // res.json({ error: 'user does not exist' })
                res.redirect(`/error?error=user%20does%20not%20exist`)
            }
        })
        .catch(err => {
            console.log(err)
            // res.json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET -> /users/logout
// This route renders a page that allows the user to log out
router.get('/logout', (req, res) => {
    res.render('users/logout')
})

// DELETE -> /users/logout
// this route destroys a session in our db(and in the browser)
router.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

///////////////////////////////
//// Export Router         ////
///////////////////////////////
module.exports = router