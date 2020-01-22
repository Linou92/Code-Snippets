const router = require('express').Router(),
      User = require('../models/users');
      express = require('express');



// get to the homepge
router.get('/', (req, res) => {
    res.render('home');
});


router.post('/register', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.save(function(err, savedUser){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    })
})


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;