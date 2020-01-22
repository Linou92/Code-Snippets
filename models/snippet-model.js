'use strict'

var mongoose = require('mongoose')

let snippetSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  language: String,
  tags: []
})

let Snippet = mongoose.model('Snippet', snippetSchema)

module.exports = Snippet
