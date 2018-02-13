const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  if(req.query.message != undefined && req.query.message != null){
    res.render("error.ejs", {message: req.query.message});
  }
});

module.exports = router;
