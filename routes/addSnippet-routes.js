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

router.post('/', (req, res) => {
  var snippet = req.body
  snippet.creator = req.session.username
  Snippet.create(snippet, (err, snippet) => {
    if (err) {
      throw err
    } else {
      res.redirect('profile')
      res.status(200)
    }
  })
})

router.post('/', (req, res) => {
  Snippet.find({}, (err, snippets) => {
    if (err) {
      res.status(500)
      res.redirect('/')
    } else {
      let info = {
        snippets,
        user: req.user.username
      }
      res.redirect('all_snippets', info)
      res.status(200)
    }
  })
})

router.get('/', requiresLogin, (req, res) => {
  res.render('add_snippet', { user: req.user })
})

module.exports = router
