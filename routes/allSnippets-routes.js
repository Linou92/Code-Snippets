'use strict'

var router = require('express').Router()
const Snippet = require('../models/snippet-model')

router.get('/', (req, res) => {
  Snippet.find({}, (err, snippets) => {
    if (err) {
      res.redirect('/')
      res.status(500)
    } else {
      let data = {
        snippets,
        user: req.session.username
      }
      res.render('all_snippets', data)
      res.status(200)
    }
  })
})

module.exports = router
