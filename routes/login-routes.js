'use strict'

var router = require('express').Router()
var User = require('../models/user-model')
var bcrypt = require('bcrypt')

router.post('/', (req, res) => {
  var username = req.body.username
  var password = req.body.password

  // if all fields entered
  if (username && password) {
    User.findOne({ username: username }, (err, user) => {
      if (!user) {
        req.flash('error', 'User not found !')
        res.status(404).send('User not found !')
        return err
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result === true) {
            req.flash('info', 'Successfully authenticated !')
            req.session.isLoggedIn = true
            req.session.username = username
            res.status(200)
            res.redirect('profile')
          } else {
            req.flash('error', 'Wrong password !')
            res.status(404).send('Wrong password !')
            return err
          }
        })
      }
    })
  } else { // missing fields
    req.flash('error', 'All fields are required !')
    res.status(404).send('All fields are required !')
  }
})

router.get('/', (req, res) => {
  res.render('profile', { messages: req.flash('info') })
})

module.exports = router
