const router = require('express').Router();
const mongoose = require('mongoose');
let User = require('./user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const houseid = new mongoose.mongo.ObjectId()

    const newUser = new User({
        username,
        password,
        firstname,  
        lastname,
        houseid
      });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;