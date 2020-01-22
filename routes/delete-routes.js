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

router.get('/:snippetId', requiresLogin, (req, res) => {
  res.render('delete_snippet', { _id: req.params.snippetId })
})

router.post('/:snippetId', requiresLogin, (req, res) => {
  var snippetId = req.params.snippetId

  Snippet.findOneAndDelete({ _id: snippetId }, (err) => {
    if (err) {
      throw err
    } else {
      res.status(200)
      res.redirect('/profile')
    }
  })
})

module.exports = router
