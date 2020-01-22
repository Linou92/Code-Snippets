'use strict'

var router = require('express').Router()
const Snippet = require('../models/snippet-model')

function requiresLogin (req, res, next) {
  if (req.session && req.session.username) {
    return next()
  } else {
    res.status(403).send('403 Forbidden ! You must be logged in to access this page !')
  }
}

router.get('/', requiresLogin, (req, res) => {
  Snippet.find({ creator: req.session.username }, (err, snippets) => {
    if (err) {
      console.log(err)
      res.redirect('/')
    } else {
      let data = {
        snippets,
        user: req.session.username
      }
      res.status(200)
      res.render('profile', data)
    }
  })
})

router.get('/', requiresLogin, (req, res) => {
  res.render('profile', { username: req.user })
})

module.exports = router
