var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var api = require('./routes/api');

var server = express();

//Necessary for Heroku
var port = process.env.PORT || 1337;

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));
}

// Define API routes before the *
server.use('/api', api);

server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.server.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (server.get('env') === 'development') {
    server.listen(port, function () {
        console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
    });
    
} else {
    server.listen(port, function () {
        console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
    });
}

module.exports = server;
