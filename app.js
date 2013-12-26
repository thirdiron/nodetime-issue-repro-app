
/**
 * Module dependencies.
 */

if (process.env.NODETIME_ACCOUNT_KEY) {
    require('nodetime').profile({
        accountKey: process.env.NODETIME_ACCOUNT_KEY,
        namedTransactions: {
            'TOC Request': /data\/BZAI\d+\.json\?libBZID/,
            'Back Issues List' : /data\/BZAJ\d+\.json\?excludeArticles=true&libBZID=BZAL/,
            'Library Metadata Request' : /data\/BZAL0138\.json/,
            'Library List Request' : /data\/BZAL\.json/
        }
    });
}

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(process.env.PORT, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
