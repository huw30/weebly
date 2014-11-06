var express  = require('express');
var path     = require('path');
var routes   = require('./backend/routes');
var index    = require('./backend/routes/index');
var elements = require('./backend/routes/elements');


var app = express();

app.configure(function() {
  // all environments
  app.set('port', process.env.PORT || 8080);

  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: "secret key"}));

  app.use(app.router);
  app.use(express.static(__dirname + '/public/' ));
  app.use('/', express.static(__dirname + '/frontend/build' ));
  app.use(index);
  elements(app);
});



app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
