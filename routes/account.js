var mongoose = require('mongoose');
var express = require('express');
var Account = require("../models/account");
var router = express.Router();  // Handles all the routes.

console.log("I directed it the right way.");

router.post('/', function(req, res){
  var newAccount = new Account(req.body);
  console.log("We ran the code for posting");

  newAccount.save(function(err, doc){
    if(err){
      console.log("Failed to create the account");
    }
    else{
      console.log("Account successfully created");
      res.json(doc);
    }
  });
});

router.get('/', function(req, res){
  console.log("We ran the code for getting");

  Account.find({}, function(err, docs){
    if(err){
      console.log(err);
    }
    else{
      res.json(docs);
    }
  });
});

module.exports = router;
