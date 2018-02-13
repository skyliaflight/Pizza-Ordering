const mongoose = require('mongoose');
const express = require('express');
const OrderedItem = require('../models/orderedItem');
const router = express.Router();  // Handles all the routes.

router.post('/', function(req, res){
  var newOrder = new OrderedItem(req.body);

  newOrder.save(function(err, doc){
    if(err){
      console.log(err);
      console.log("Failed to place order");
    }
    else{
      console.log("Order placed!");
    }
  });
});

router.get('/', function(req, res){
  OrderedItem.find({}, function(err, docs){
    if(err){
      console.log(err);
    }
    else{
      res.json(docs);
    }
  });
});

router.get('/[a-z,0-9]+', function(req, res){
  OrderedItem.find({_id: req.path.slice(1)}, function(err, docs){
    if(err){
      console.log(err);
    }
    else{
      res.json(docs);
    }
  });
});

router.patch('/[a-z,0-9]+', function(req, res){
  OrderedItem.update({_id: req.path.slice(1)}, req.body, function(err, numAffected){
    if(err){
      console.log(err);
    }
    else{
      console.log("Updated order");
      res.json(numAffected);
    }
  });
});

router.delete('/', function(req, res){
  OrderedItem.remove({}, function(err, numAffected){
    if(err){
      console.log(err);
    }
    else{
      console.log("Deleted order(s)");
      res.json(numAffected);
    }
  });
});

router.delete('/[a-z,0-9]+', function(req, res){
  OrderedItem.remove({_id: req.path.slice(1)}, function(err, numAffected){
    if(err){
      console.log(err);
    }
    else{
      console.log("Deleted order");
      res.json(numAffected);
    }
  });
});

module.exports = router;
