const mongoose = require('mongoose');
const express = require('express');
const Address = require("../models/address");
const router = express.Router();  // Handles all the routes.

// Code for posting address to database
router.post('/', function(req, res){
  var newAddress = new Address(req.body);

  // First, find if the address already exists.
  Address.find({streetAddress: req.body.streetAddress,
                city: req.body.city,
                zipCode: req.body.zipCode},
                function(err, docs)
                {
                  if(err){
                    console.log(err);
                  }
                  else {
                    if(docs.length === 0){
                      // Add it only if is not in the database.
                      newAddress.save(function(err, doc){
                        if(err){
                          console.log(err);
                          console.log("Failed to register the address");
                        }
                        else{
                          console.log("Address successfully registered");
                          res.json(doc);  // Return the posted result.
                        }
                      });
                    }
                    else{
                      res.json(docs[0]);
                    }
                  }
                });
});   // End of code for posting address

// Code for retrieving addresses from database
router.get('/', function(req, res){
  Address.find({}, function(err, docs){
    if(err){
      console.log(err);
    }
    else{
      res.json(docs);
    }
  });
});   // End of code for retrieving addresses

// Code for retrieving addresses from database
router.get('/[a-z,0-9]+', function(req, res){
  Address.find({_id: req.path.slice(1)}, function(err, docs){
    if(err){
      console.log(err);
    }
    else{
      res.json(docs);
    }
  });
});   // End of code for retrieving addresses

// Code for deleting addresses from database
router.delete('/[a-z,0-9]+', function(req, res){
  Address.remove({_id: req.path.slice(1)}, function(err, numAffected){
    if(err){
      console.log(err);
    }
    else{
      console.log("Deleted Address");
      res.json(numAffected);
    }
  });
});   // End of code for retrieving addresses

// Code for deleting accounts from database
router.delete('/', function(req, res){
  Address.remove({}, function(err, numAffected){
    if(err){
      console.log(err);
    }
    else{
      console.log("Deleted Address");
      res.json(numAffected);
    }
  });
});   // End of code for deleting accounts

module.exports = router;
