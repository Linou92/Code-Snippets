const router = require('express').Router(),
      User = require('../models/users');
      express = require('express');
      
if (req.body.username &&
    req.body.password) {  
        var userData = {
            username: req.body.username,
            password: req.body.password,
        }
      
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
        if (err) {
            return next(err)
        } else {
            return res.redirect('/profile');
          }
    });
}