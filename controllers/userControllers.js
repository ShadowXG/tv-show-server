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
            res.status(201).json({ username: user.username })
        })
        // if there's an error
        .catch(err => {
            console.log(err)
            res.json(err)
        })
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

                    res.status(201).json({ username: user.username })
                } else {
                    res.json({ error: 'username or password is incorrect' })
                }
            } else {
                res.json({ error: 'user does not exist' })
            }
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// DELETE -> /users/logout
// this route destroys a session in our db(and in the browser)
router.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        res.sendStatus(204)
    })
})

///////////////////////////////
//// Export Router         ////
///////////////////////////////
module.exports = router