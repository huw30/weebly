var express  = require('express');
var path     = require('path');
var index    = require('./backend/routes/index');
var routes = require('./backend/routes/routes');
var settings = require('./settings');

var app = express();

app.configure(function() {
  // all environments
  app.set('port', process.env.PORT || 8080);

  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret: settings.cookieSecret,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, //30 days
    url: settings.url
  }));

  app.use(app.router);
  app.use(express.static(__dirname + '/public/' ));
  app.use('/', express.static(__dirname + '/frontend/build' ));
  app.use(index);
  routes(app);
});



app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
