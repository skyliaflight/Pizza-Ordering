var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();  // Handles all the routes
var MenuItem = require('../models/menu');  // '..' navigates up one route

// How it handles "post" requests directed to it.
router.post('/', function(req, res){
  var body =  req.body;
  console.log(body);
  var newMenuItem = new MenuItem(body); // Body itself is an object. Put it straight in.
  newMenuItem.save(function(err, doc) {
    if(err) {
      console.log(err); // The error
      res.send(err);  // Res is response
    }
    else {
      console.log("We saved the...\n" + doc); // The document itself
      res.json(doc);  // Send doc as json response
    }
  });
});

// How it handles "get" requests directed to it
router.get('/', function (req, res) {
  MenuItem.find({}, function(err, docs) {
    if(err) {
      console.log(err);
    }
    else {
      res.json(docs);
    }
  });
});

// How it handles "delete" requests
router.delete('/', function(req, res) {
  res.json('I forbid you from deleting anything.');
});

module.exports = router;
