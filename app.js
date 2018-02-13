const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// This ensures mongoose will connect only once
// rather than in each route.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pizza-ordering'); // At port 27017

const app = express();

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
var account = require('./routes/account');
var address = require('./routes/address');
var creditCard = require('./routes/creditCard');
var order = require('./routes/order');
var confirmation = require('./routes/confirmation');
var error = require('./routes/error');

app.use('/', index);
app.use('/menu', menu);
app.use('/account', account);
app.use('/address', address);
app.use('/creditCard', creditCard);
app.use('/order', order);
app.use('/confirmation', confirmation);
app.use('/error', error);

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
