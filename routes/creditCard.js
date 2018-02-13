const mongoose = require('mongoose');
const express = require('express');
const CreditCard = require("../models/creditCard");
const router = express.Router();  // Handles all the routes.

// Action for posting a credit card
router.post('/', function(req, res){
  var newCreditCard = new CreditCard(req.body);

  CreditCard.find({type: req.body.type,
                   name: req.body.name,
                   cardNumber: req.body.cardNumber,
                   expirationDate: req.body.expirationDate,
                   securityCode: req.body.securityCode},
                   function(err, docs){
                     if(err){
                       console.log(err);
                     }
                     else{
                       // Save the credit card only if it isn't already stored.
                       if(docs.length === 0){
                         newCreditCard.save(function(err, doc){
                           if(err){
                             console.log(err);
                             console.log("Failed to create the credit card");
                           }
                           else{
                             console.log("Credit card saved");
                             res.json(doc);
                           }
                         });
                       }
                       else{
                         res.json(docs[0]);
                       }
                     }
                   });

});  // End of action for posting credit card

router.get('/', function(req, res){
  CreditCard.find({}, function(err, docs){
    if(err){
      console.log(err);
    }
    else{
      res.json(docs);
    }
  });
});

router.get('/[a-z,0-9]+', function(req, res){
  CreditCard.find({_id: req.path.slice(1)}, function(err, docs){
    if(err){
      console.log(err);
    }
    else{
      res.json(docs);
    }
  });
});

router.patch('/[a-z,0-9]+', function(req, res){
  CreditCard.update({_id: req.path.slice(1)}, req.body, function(err, numAffected){
    if(err){
      console.log(err);
    }
    else{
      console.log("Updated credit card");
      res.json(numAffected);
    }
  });
});

// Code for deleting credit cards from database
router.delete('/[a-z,0-9]+', function(req, res){
  CreditCard.remove({_id: req.path.slice(1)}, function(err, numAffected){
    if(err){
      console.log(err);
    }
    else{
      console.log("Deleted credit card");
      res.json(numAffected);
    }
  });
});   // End of code for deleting credit card

// Code for deleting all credit cards from database
router.delete('/', function(req, res){
  CreditCard.remove({}, function(err, numAffected){
    if(err){
      console.log(err);
    }
    else{
      console.log("Deleted all credit cards");
      res.json(numAffected);
    }
  });
});   // End of code for deleting all credit cards

module.exports = router;
