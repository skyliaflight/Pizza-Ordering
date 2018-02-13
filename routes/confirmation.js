const mongoose = require('mongoose');
const express = require('express');
const queryString = require('query-string');
const router = express.Router();  // Handles all the routes.

router.get('/', function(req, res){
  if(req.query.message != undefined && req.query.message != null){
    res.render("Confirmation.ejs", {message: req.query.message});
  }
});

module.exports = router;
