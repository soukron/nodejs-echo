// libraries
const express = require('express'),
      morgan  = require('morgan');

// application configuration/environment
const env    = process.env,
      prefix = (env.PREFIX || '');

// API module
const api = require('./api.js');

// server instance
var app = express();

// middlewares
app.use(morgan(':remote-addr (:req[Forwarded]) - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

// api module under /api prefix
app.use(prefix, api);

// start server
var port = env.PORT || 8080,
    ip   = env.IP   || '0.0.0.0';

app.listen(port, ip, function () {
  console.log('API running on http://%s:%s%s', ip, port, prefix);
});
