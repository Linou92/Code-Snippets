'use strict'

var router = require('express').Router()
var Snippet = require('../models/snippet-model')

function requiresLogin (req, res, next) {
  if (req.session && req.session.username) {
    return next()
  } else {
    res.status(403).send('403 Forbidden ! You must be logged in to access this page !')
  }
}

router.get('/:snippetId', requiresLogin, (req, res) => {
  Snippet.findOne({ _id: req.params.snippetId }, (err, snippet) => {
    if (err) {
      return res.status(500).send('Internal server error !')
    } else {
      res.render('edit_snippet', { snippet })
    }
  })
})

router.post('/:snippetId', requiresLogin, (req, res) => {
  Snippet.findOneAndUpdate({ _id: req.params.snippetId }, req.body, { new: true }, (err, snippet) => {
    if (err) {
      return res.status(500).send('Internal server error !')
    } else {
      console.log('updated result = ', snippet)
      res.status(200)
      res.redirect('/profile')
    }
  })
})

module.exports = router
