var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html'); // This sends the contents from the HTML file.
});

module.exports = router;
