'use strict';
//application setup
var express = require('express');
var path = require('path');
var app = express();
var port = 3000;

//view directory setup
app.set('views', path.join(__dirname, 'views'));
//view engine setup
app.set('view engine', 'jade');

//index get requests
app.get('*', function(req, res){
  res.render('index');
});
app.get('/', function(req, res){
  res.render('layout');
});
app.get('/users', function(req, res){
  res.render('users');
});
//REST handlers:
// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('CUBS WIN!!!');
});

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// accept PUT request at /user
app.put('/users', function (req, res) {
  res.send('Got a PUT request at /users');
});

// accept DELETE request at /user
app.delete('/users', function (req, res) {
  res.send('Got a DELETE request at /users');
});

//static services
app.use(express.static(path.join(__dirname, 'public')));

//app listener
app.listen(port, function(){
  console.log('Server Running on ' + port);
});
