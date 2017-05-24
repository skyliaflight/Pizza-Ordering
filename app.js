var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// This ensures mongoose will connect only once
// rather than in each route.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pizza-ordering'); // At port 27017

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// The directories to which we will route certain requests
var index = require('./routes/index');
var menu = require('./routes/menu');
var cart = require('./routes/cart');
var account = require('./routes/account');

app.use('/', index);
app.use('/menu', menu);
app.use('/menu/[a-z,0-9]+', menu);
app.use('/cart', cart);
app.use('/cart/[a-z,0-9]+', cart);
app.use('/account', account);

// This will happen if none of the above routes
// are what the user requests.
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
