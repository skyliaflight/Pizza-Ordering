var mongoose = require('mongoose');
var express = require('express');
var Cart = require('../models/cart');
//var CartItem = require('../models/cartItem');
var router = express.Router();  // Handles all the routes.

// How the cart database handles
// post requests directed to it.
router.post('/', function(req, res){
  // req.body will be the object which is trying
  // to be posted. We must assign the body to the model
  // of a cart.
  var newCart = new Cart(req.body);

  // Save the cart to the database.
  newCart.save(function(err, doc) {
    if(err) {
      console.log("Failed to create the cart");
    }
    else {
      console.log("Cart successfully created");
    }
  });

});

// How it handles get requests from the Cart database
router.get('/', function(req, res){
  Cart.find({}, function(err, docs){
    if(err){
      console.log(err);
    }
    else {
      res.json(docs);
    }
  });

});

router.get('/[a-z,0-9]+', function(req, res){
  Cart.find({_id: req.path.slice(1)}, function(err, docs){
    if(err){
      console.log(err);
    }
    else {
      res.json(docs);
    }
  });

});

// How it handles patch requests
router.patch('/[a-z,0-9]+', function(req, res){
  Cart.update({_id: req.path.slice(1)}, req.body, function(err, numAffected){
    if(err){
      console.log(err);
    }
    else{
      console.log("Updated documents");
      res.json(numAffected);
    }
  });

});

module.exports = router;
