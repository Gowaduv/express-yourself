'use strict';

var bodyParser = require('body-parser');
var User = require('../models/usersSchema.js');

module.exports = function(router) {
  router.use(bodyParser.json());
  router.get('/users', function(req, res) {
    console.log('Index router');
    User.find({}, function(err, data) {
      if (err) {
        console.log(err);
      }
      return res.json(data);
    });
  });

  router.post('/users', function(req, res) {
    console.log('You hit the post')
    var newUser = new User(req.body);
    console.log(req.body);
    newUser.save({}, function(err, data) {
      if (err){
        console.log(err);
      }
      res.json(data);
    });
  });

  router.put('/users/:id', function (req, res) {
    console.log('Hit update route');
    var updatedUser = req.body;
    delete updatedUser._id;

    User.update({'_id': req.params.id}, updatedUser, function (err, data) {
      console.log(req.body);
      if (err) {
        errorResponse(err, res);
        return;
      }
      res.json({msg: 'updated successfully'});
    });
  });

  router.delete('/users/:id', function(req, res) {
    console.log('You hit delete');
    User.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        errorResponse(err, res);
        return;
      }
      res.json({msg: "Don't let the door hit you on the way out."})
    });
  });
};
